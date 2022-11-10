import { Canvas, Image, loadImage } from 'canvas'
import { createTextWithBackground, drawImageProp } from './generator-preview-utils/utils'
import * as fs from 'fs'
import { questions } from './apps/devchoices-next/public/assets/data/questions'
const canvas = new Canvas(100, 100)

const width = 1920
const height = 1080
const assetPath = 'apps/devchoices-next/public'

const drawSide = async (side: 'left' | 'right', ctx: any, image: Image, question: any) => {
  if (!question) return

  const ratio = image.width / image.height
  const newWidth = width / 2
  const newHeight = newWidth / ratio
  const x = side === 'left' ? 0 : width / 2
  const y = (height - newHeight) / 2
  ctx.drawImage(image, x, y, newWidth, newHeight)
  drawImageProp(ctx, image, x, 0, width / 2, height, 0.5, 0.5)
  createTextWithBackground(
    side === 'left' ? question.choiceLeft.title.toUpperCase() : question.choiceRight.title.toUpperCase(),
    x,
    ctx,
    width,
    height
  )
}

const renderPreviewBySlug = async (slug: string, override = false) => {
  const question = questions.find((q) => q.slug === slug)
  if (!question) return

  if (fs.existsSync(`${assetPath}/assets/img/preview-${question.slug}.jpg`) && !override) {
    console.log(`Preview for ${question.slug} already exists`)
    return
  }

  if (question.choiceLeft.img_path.indexOf('webp') > -1 || question.choiceRight.img_path.indexOf('webp') > -1) {
    console.log('Webp not supported')
    return
  }

  const promiseImg1 = loadImage(assetPath + question.choiceLeft.img_path)
  const promiseImg2 = loadImage(assetPath + question.choiceRight.img_path)
  Promise.all([promiseImg1, promiseImg2]).then(async (images) => {
    const canvas = new Canvas(1920, 1080)
    const ctx = canvas.getContext('2d')

    await drawSide('left', ctx, images[0], question)
    await drawSide('right', ctx, images[1], question)

    const out = fs.createWriteStream(__dirname + `/${assetPath}/assets/img/preview-${slug}.jpg`)
    const stream = canvas.createJPEGStream({
      quality: 0.8,
    })
    stream.pipe(out)
    out.on('finish', () => console.log('The JPG preview-' + slug + '.jpg file was created.'))
  })
}

//renderPreviewBySlug('camelCase-or-snake_case', true).then(() => {})

questions.forEach(async (question) => {
  try {
    await renderPreviewBySlug(question.slug, true)
  } catch (e) {
    console.log(e)
  }
})
