import { QuestionInterface } from '@benjamincode/shared/interfaces'

export const invalidExamples = [
  'slug',
  ' slug',
  'slug ',
  'slûg',
  'sluG',
  '-slug',
  'slug-',
  'my--slug',
  'my-slug',
]

export const validExamples = [
  'bootstrap-or-poop',
  'no-specs-or-deadline-too-shorts',
  '1-screen-or-9-screens'
]

const makeItemList = (items: string[]) => items.map(item => ` - '${item}'`).join('\n')

export const isSlugValid = (() => {
  const matchPattern = (slug: string): boolean => {
    return !!slug.match(/^([a-z0-9]+-)+or(-[a-z0-9]+)+$/)
  }

  const issuesOnInvalidExamples = invalidExamples.filter(example => matchPattern(example))
  const issuesOnValidExamples = validExamples.filter(example => !matchPattern(example))

  if (issuesOnInvalidExamples.length > 0) {
    console.log(`Slug validation didn't correctly reject those invalid examples:\n${makeItemList(issuesOnInvalidExamples)}`)
    process.exit(1)
  }

  if (issuesOnValidExamples.length > 0) {
    console.log(`Slug validation didn't correctly accept those valid examples:\n${makeItemList(issuesOnValidExamples)}`)
    process.exit(1)
  }

  return matchPattern
})()

export const isTitleValid = (title: string): boolean => {
  // Do not allow leading or trailing spaces.
  return title.trim() === title
}

export const showInvalidSlugs = (invalidSlugs: string[]) => {
  console.log(`\nHere are invalid examples of slugs ❌\n${makeItemList(invalidExamples)}`)
  console.log(`\nAnd some valid examples of slugs ✅\n${makeItemList(validExamples)}`)

  console.log(`\nYou have ${invalidSlugs.length} invalid slug(s):\n${makeItemList(invalidSlugs)}`)
}

export const showInvalidTitles = (invalidTitles: string[]) => {
  console.log(`\nYou have ${invalidTitles.length} invalid title(s):\n${makeItemList(invalidTitles)}`)
}

export const getValidator = () => {
  const invalidSlugs: string[] = []
  const invalidTitles: string[] = []

  const isQuestionValid = (question: QuestionInterface): boolean => {
    let nothingFound = true

    if (!isSlugValid(question.slug)) {
      console.log(`The slug ${question.slug} is invalid.`)
      invalidSlugs.push(question.slug)
      nothingFound = false
    }

    const titleIssues = [question.choiceLeft.title, question.choiceRight.title]
      .map(title => isTitleValid(title) ? false : title)
      .filter((title): title is string => !!title)

    if (titleIssues.length > 0) {
      invalidTitles.push(...titleIssues)
      nothingFound = false
    }

    return nothingFound
  }

  const showReport = () => {
    let nothingFound = true

    if (invalidSlugs.length > 0) {
      showInvalidSlugs(invalidSlugs)
      nothingFound = false
    }

    if (invalidTitles.length > 0) {
      showInvalidTitles(invalidTitles)
      nothingFound = false
    }

    if (nothingFound) {
      console.log('\nYou are good! 🎉')
    }
  }

  return {
    isQuestionValid,
    showReport,
  }
}
