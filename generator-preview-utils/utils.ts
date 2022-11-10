import { wrapText } from './wrap-text-canvas'

export function drawImageProp(
  ctx: any,
  img: any,
  x: number,
  y: number,
  w: number,
  h: number,
  offsetX: number,
  offsetY: number
) {
  if (arguments.length === 2) {
    x = y = 0
    w = ctx.canvas.width
    h = ctx.canvas.height
  }

  // default offset is center
  offsetX = typeof offsetX === 'number' ? offsetX : 0.5
  offsetY = typeof offsetY === 'number' ? offsetY : 0.5

  // keep bounds [0.0, 1.0]
  if (offsetX < 0) offsetX = 0
  if (offsetY < 0) offsetY = 0
  if (offsetX > 1) offsetX = 1
  if (offsetY > 1) offsetY = 1

  var iw = img.width,
    ih = img.height,
    r = Math.min(w / iw, h / ih),
    nw = iw * r, // new prop. width
    nh = ih * r, // new prop. height
    cx,
    cy,
    cw,
    ch,
    ar = 1

  // decide which gap to fill
  if (nw < w) ar = w / nw
  if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh // updated
  nw *= ar
  nh *= ar

  // calc source rectangle
  cw = iw / (nw / w)
  ch = ih / (nh / h)

  cx = (iw - cw) * offsetX
  cy = (ih - ch) * offsetY

  // make sure source rectangle is valid
  if (cx < 0) cx = 0
  if (cy < 0) cy = 0
  if (cw > iw) cw = iw
  if (ch > ih) ch = ih

  // fill image in dest. rectangle
  ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h)
}

export const createTextWithBackground = (text: string, x: number, ctx: any, width: number, height: number) => {
  // wrap a long text inside a canvas
  const fontSize = width / 20
  const paddingX = width / 20
  const maxWidth = width / 2 - paddingX * 2
  ctx.font = `700 ${fontSize}px Arial`
  ctx.fillStyle = 'white'
  let wrappedText = wrapText(ctx, text, x + paddingX, maxWidth, height, fontSize * 0.8)

  ctx.fillStyle = 'black'
  const paddingBox = fontSize / 4
  ctx.fillRect(
    x + paddingX - paddingBox,
    height / 2 - wrappedText.heightText / 2 - paddingBox,
    maxWidth + 2 * paddingBox,
    wrappedText.heightText + 2 * paddingBox
  )

  wrappedText.lineArray.forEach(function (item) {
    ctx.font = `700 ${fontSize}px Arial`
    ctx.fillStyle = 'white'
    const measures = ctx.measureText(item[0])
    console.log(measures)
    ctx.fillText(item[0], x + width / 4 - measures.width / 2, item[2])
  })
}
