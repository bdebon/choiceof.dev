import { Choice } from './choice.interface'

export interface QuestionInterface {
  slug: string
  choiceLeft: Choice
  choiceRight: Choice
}
