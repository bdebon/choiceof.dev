import {ApiRessource, ApiRessourceCollection, ApiRessourceItem, useClient} from "./client";
import {Image} from "./media";
import QuestionCollection, {questionCollectionFactory} from "../question/QuestionCollection";
import {AxiosResponse} from "axios";

export const questionStateValidated = 'validated'
export const questionStateUnValidated = 'un_validated'
export const questionStateList = [questionStateValidated, questionStateUnValidated]
export type QuestionState = typeof questionStateValidated | typeof questionStateUnValidated

export type ApiQuestionCollectionRead = ApiRessourceCollection<ApiQuestionItem>
export type ApiChoiceItemRead = Choice & ApiRessourceItem
export type ApiQuestionItem = Question & ApiRessourceItem

export interface ApiQuestionCreate {
  content: string;
  choices: ChoiceCreate[];
}

export interface Question {
  content:   string;
  choices?:  ApiChoiceItemRead[];
  totalVote: number;
  image?:    Image;
  state: QuestionState;
  slug: string;
}

export interface Choice {
  content: string;
  image:   Image;
  totalVote: number;
}

export interface ChoiceCreate {
  content: string;
  image:   string;
  totalVote: number;
}

export interface ApiQuestionUpdate {
  content?:   string;
  choices?:   string[];
  state?:     string;
  totalVote?: number;
}

export function addQuestion(questionCreate: ApiQuestionCreate) {
  return useClient().post<ApiQuestionCollectionRead>(
    '/api/questions',
    questionCreate
  )
}

export interface searchQuestionsFilter {
  slug?: string,
  id?: string,
  page?: number
}

export function getQuestions(searchFilter: searchQuestionsFilter = {}): Promise<AxiosResponse<QuestionCollection>> {
  return useClient().get(
    '/api/questions',
    {
      params: searchFilter
    }
  ).then(response => {
    response.data = questionCollectionFactory(response.data)

    return response;
  })
}

export function removeQuestion(id: number) {
  return useClient().delete<boolean>(
    `/api/questions/${id}`
  )
}

export function updateQuestion(id: number, question: ApiQuestionUpdate) {
  return useClient().patch<Question>(
    `/api/questions/${id}`,
    question,
    {
      headers: {
        'Content-Type': 'application/merge-patch+json'
      }
    }
  )
}
