import { Canvas, Image, loadImage } from 'canvas'
import { createTextWithBackground, drawImageProp } from './generator-preview-utils/utils'
import { questions } from './apps/devchoices-next/public/assets/data/questions'
import { Choice, QuestionInterface } from './libs/shared/interfaces/src'
import { createWriteStream, existsSync } from 'fs'

const width = 1200
const height = 628
const assetPath = `${__dirname}/apps/devchoices-next/public`

// Checks for --override and if it has a value
const override = Boolean(process.argv.indexOf('--override') > -1)

const drawSide = async (side: 'left' | 'right', ctx: any, image: Image, choice: Choice) => {
  if (!choice) return

  const ratio = image.width / image.height
  const newWidth = width / 2
  const newHeight = newWidth / ratio
  const x = side === 'left' ? 0 : width / 2
  const y = (height - newHeight) / 2
  ctx.drawImage(image, x, y, newWidth, newHeight)
  drawImageProp(ctx, image, x, 0, width / 2, height, 0.5, 0.5)
  createTextWithBackground(
    choice.title.toUpperCase(),
    x,
    ctx,
    width,
    height
  )
}

const renderPreview = async (question: QuestionInterface, override = false) => {

  if (!override && existsSync(`${assetPath}/assets/img-previews/preview-${question.slug}.jpg`)) {
    console.log(`Preview for ${question.slug} already exists`)
    return
  }

  if (question.choiceLeft.img_path.endsWith('.webp') || question.choiceRight.img_path.endsWith('webp')) {
    console.log('Webp not supported')
    return
  }

  const leftImagePromise = loadImage(assetPath + question.choiceLeft.img_path)
  const rightImagePromise = loadImage(assetPath + question.choiceRight.img_path)
  Promise.all([leftImagePromise, rightImagePromise]).then(async ([ leftImage, rightImage ]) => {
    const canvas = new Canvas(width, height)
    const ctx = canvas.getContext('2d')

    await drawSide('left', ctx, leftImage, question.choiceLeft)
    await drawSide('right', ctx, rightImage, question.choiceRight)

    const out = createWriteStream(`${assetPath}/assets/img-previews/preview-${question.slug}.jpg`)
    const stream = canvas.createJPEGStream({
      quality: 0.8,
    })
    stream.pipe(out)
    out.on('finish', () => console.log(`The JPG preview-${question.slug}.jpg file was created.`))
  })
}

questions.forEach((question) => {
  renderPreview(question, override)
})
