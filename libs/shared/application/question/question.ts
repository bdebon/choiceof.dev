import {Image} from "libs/shared/application/media/media";
import {ApiReadChoice, ApiUpdateChoice, apiUpdateChoiceFactory} from "libs/shared/application/choice/choice";
import {ApiRessourceCollection, ApiRessourceItem} from "libs/shared/application/api/api";

export const questionStateValidated = 'validated'
export const questionStateUnValidated = 'un_validated'
export const questionStateList = [questionStateValidated, questionStateUnValidated]
export type QuestionState = typeof questionStateValidated | typeof questionStateUnValidated

export type ApiCollectionQuestion = ApiRessourceCollection<Question>
export type ApiReadQuestion = ApiRessourceItem<Question>

export interface Question {
  content: string;
  choices?: ApiReadChoice[];
  totalVote: number;
  image?: Image;
  state: QuestionState;
  slug: string;
}

export interface ApiUpdateQuestion {
  content: string;
  choices: ApiUpdateChoice[];
}


export function apiUpdateQuestionFactory(apiReadQuestion: ApiReadQuestion|null = null): ApiUpdateQuestion
  {
    let apiUpdateQuestion = {
      choices: [
        apiUpdateChoiceFactory(),
        apiUpdateChoiceFactory()
      ],
      content: ""
    }

    if (!apiReadQuestion) return apiUpdateQuestion

    // TODO : refacto this
    const {choices} = apiReadQuestion;
    let choice1 = choices && choices[0] ? choices[0] : apiUpdateChoiceFactory()
    let choice2 = choices && choices[1] ? choices[1] : apiUpdateChoiceFactory()

    return {
      content: apiReadQuestion.content,
      choices: [
        {
          content: choice1.content,
          image: {
            contentUrl: choice1.image.contentUrl
          }
        },
        {
          content: choice2.content,
          image: {
            contentUrl: choice2.image.contentUrl
          }
        }
      ]
    }
  }
