import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

const OUT = path.join(process.cwd(), 'public', 'og.png')

const width = 1200
const height = 630

const clamp8 = (n) => (n < 0 ? 0 : n > 255 ? 255 : n | 0)
const lerp = (a, b, t) => a + (b - a) * t

const crcTable = (() => {
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    }
    table[n] = c >>> 0
  }
  return table
})()

function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  }
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type)
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0)
  return Buffer.concat([len, typeBuf, data, crc])
}

const pixels = Buffer.alloc(width * height * 4)
const setPixel = (x, y, r, g, b, a = 255) => {
  if (x < 0 || y < 0 || x >= width || y >= height) return
  const i = (y * width + x) * 4
  pixels[i + 0] = r
  pixels[i + 1] = g
  pixels[i + 2] = b
  pixels[i + 3] = a
}

const addPixel = (x, y, r, g, b, a) => {
  if (x < 0 || y < 0 || x >= width || y >= height) return
  const i = (y * width + x) * 4
  const br = pixels[i + 0]
  const bg = pixels[i + 1]
  const bb = pixels[i + 2]
  const t = a
  pixels[i + 0] = clamp8(br + (r - br) * t)
  pixels[i + 1] = clamp8(bg + (g - bg) * t)
  pixels[i + 2] = clamp8(bb + (b - bb) * t)
}

const top = [8, 12, 18]
const bot = [11, 15, 20]

const glows = [
  { cx: 0.86 * width, cy: 0.22 * height, radius: 520, col: [34, 211, 238], a: 0.26 },
  { cx: 0.18 * width, cy: 0.74 * height, radius: 640, col: [163, 230, 53], a: 0.16 },
]

for (let y = 0; y < height; y++) {
  const t = y / (height - 1)
  const br = lerp(top[0], bot[0], t)
  const bg = lerp(top[1], bot[1], t)
  const bb = lerp(top[2], bot[2], t)

  for (let x = 0; x < width; x++) {
    let r = br
    let g = bg
    let b = bb

    for (const glow of glows) {
      const dx = (x - glow.cx) / glow.radius
      const dy = (y - glow.cy) / glow.radius
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d < 1) {
        const w = (1 - d) ** 2 * glow.a
        r += (glow.col[0] - r) * w
        g += (glow.col[1] - g) * w
        b += (glow.col[2] - b) * w
      }
    }

    const nx = (x - width / 2) / (width / 2)
    const ny = (y - height / 2) / (height / 2)
    const vignette = 1 - Math.min(0.18, (nx * nx + ny * ny) * 0.14)
    r *= vignette
    g *= vignette
    b *= vignette

    if (x % 90 === 0 || y % 90 === 0) {
      r = lerp(r, 34, 0.03)
      g = lerp(g, 211, 0.03)
      b = lerp(b, 238, 0.03)
    }

    setPixel(x, y, clamp8(r), clamp8(g), clamp8(b), 255)
  }
}

const border = [34, 211, 238]
for (let x = 0; x < width; x++) {
  addPixel(x, 0, border[0], border[1], border[2], 0.5)
  addPixel(x, 1, border[0], border[1], border[2], 0.25)
  addPixel(x, height - 1, border[0], border[1], border[2], 0.4)
  addPixel(x, height - 2, border[0], border[1], border[2], 0.2)
}
for (let y = 0; y < height; y++) {
  addPixel(0, y, border[0], border[1], border[2], 0.45)
  addPixel(1, y, border[0], border[1], border[2], 0.2)
  addPixel(width - 1, y, border[0], border[1], border[2], 0.35)
  addPixel(width - 2, y, border[0], border[1], border[2], 0.18)
}

const font5x7 = {
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  C: ['01111', '10000', '10000', '10000', '10000', '10000', '01111'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  F: ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  M: ['10001', '11011', '10101', '10001', '10001', '10001', '10001'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  W: ['10001', '10001', '10001', '10001', '10101', '11011', '10001'],
  X: ['10001', '10001', '01010', '00100', '01010', '10001', '10001'],
  3: ['11110', '00001', '00001', '01110', '00001', '00001', '11110'],
  '-': ['00000', '00000', '00000', '11111', '00000', '00000', '00000'],
  ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000'],
}

function drawText({ x, y, text, scale, color, alpha = 1, gap = 1 }) {
  const up = text.toUpperCase()
  const h = 7 * scale
  let dx = 0

  for (const ch of up) {
    const glyph = font5x7[ch] ?? font5x7[' ']
    for (let gy = 0; gy < glyph.length; gy++) {
      const row = glyph[gy]
      for (let gx = 0; gx < row.length; gx++) {
        if (row[gx] !== '1') continue
        const px0 = x + dx + gx * scale
        const py0 = y + gy * scale
        for (let sy = 0; sy < scale; sy++) {
          for (let sx = 0; sx < scale; sx++) {
            const px = px0 + sx
            const py = py0 + sy
            addPixel(px, py, color[0], color[1], color[2], alpha)
          }
        }
      }
    }
    dx += (5 + gap) * scale
  }

  return { w: dx, h }
}

function fillRoundedRect(x, y, w, h, r, color, alpha) {
  const r2 = r * r
  for (let py = y; py < y + h; py++) {
    for (let px = x; px < x + w; px++) {
      const cx = px < x + r ? x + r : px >= x + w - r ? x + w - r - 1 : px
      const cy = py < y + r ? y + r : py >= y + h - r ? y + h - r - 1 : py
      const dx = px - cx
      const dy = py - cy
      if (dx * dx + dy * dy > r2) continue
      addPixel(px, py, color[0], color[1], color[2], alpha)
    }
  }
}

const title1 = 'AL3XTREMO'
const title2 = 'PORTFOLIO'
const x0 = 96

const t1 = { scale: 18, y: 234, col: [226, 232, 240] }
const t2 = { scale: 18, y: 340, col: [226, 232, 240] }

const measure2 = (title2.length * (5 + 1)) * t2.scale
fillRoundedRect(x0 - 18, t2.y - 18, measure2 + 36, 7 * t2.scale + 36, 26, [163, 230, 53], 0.12)

drawText({ x: x0, y: t1.y, text: title1, scale: t1.scale, color: t1.col, alpha: 1 })
drawText({ x: x0, y: t2.y, text: title2, scale: t2.scale, color: t2.col, alpha: 1 })

const label = 'REACT  TS  TAILWIND'
drawText({ x: x0, y: 468, text: label, scale: 8, color: [148, 163, 184], alpha: 0.95, gap: 1 })

const raw = Buffer.alloc((width * 4 + 1) * height)
for (let y = 0; y < height; y++) {
  const rowStart = y * (width * 4 + 1)
  raw[rowStart] = 0
  pixels.copy(raw, rowStart + 1, y * width * 4, (y + 1) * width * 4)
}

const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
const ihdr = Buffer.alloc(13)
ihdr.writeUInt32BE(width, 0)
ihdr.writeUInt32BE(height, 4)
ihdr[8] = 8
ihdr[9] = 6
ihdr[10] = 0
ihdr[11] = 0
ihdr[12] = 0

const idat = zlib.deflateSync(raw, { level: 9 })
const png = Buffer.concat([
  signature,
  chunk('IHDR', ihdr),
  chunk('IDAT', idat),
  chunk('IEND', Buffer.alloc(0)),
])

fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, png)

console.log(`Wrote ${OUT} (${png.length} bytes)`) 
