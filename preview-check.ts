import * as fs from 'fs'
import { questions } from './apps/devchoices-next/public/assets/data/questions'
import * as core from '@actions/core'
const assetPath = 'apps/devchoices-next/public'

//renderPreviewBySlug('camelCase-or-snake_case', true).then(() => {})

questions.forEach(async (question) => {
  try {
    if (!fs.existsSync(`${assetPath}/assets/img/preview-${question.slug}.jpg`)) {
      console.log(`Preview for ${question.slug} already exists`)
      core.setFailed(`Preview for ${question.slug} not found, please generate it running: `)
      console.log('pnpm ts-node --project tsconfig-generator.json preview-generator.ts')
      console.log('Then, do not forget to commit the generated preview')
      return
    }
  } catch (e) {
    console.log(e)
  }
})
