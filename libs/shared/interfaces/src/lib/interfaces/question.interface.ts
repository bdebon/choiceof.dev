import { Choice } from "./choice.interface";

export interface Question {
  slug: string
  choiceLeft: Choice
  choiceRight: Choice
}
