import * as fs from 'fs'
import { questions } from '../apps/devchoices-next/public/assets/data/questions'
import * as core from '@actions/core'
import { getValidator } from './validation'

const assetPath = 'apps/devchoices-next/public'

//renderPreviewBySlug('camel-case-or-snake-case', true).then(() => {})

const { isQuestionValid, showReport } = getValidator()

Promise.all(
  questions.map(async (question) => {
    if (isQuestionValid(question)) {
      return
    }

    try {
      if (!fs.existsSync(`${assetPath}/assets/img-previews/preview-${question.slug}.jpg`)) {
        core.setFailed(`Preview for ${question.slug} not found, please generate it running: `)
        console.log('pnpm ts-node --project scripts/tsconfig.json scripts/preview-generator.ts')
        console.log('Then, do not forget to commit the generated preview')
        return
      }
    } catch (e) {
      console.log(e)
    }
  })
).then(() => {
  showReport()
})
