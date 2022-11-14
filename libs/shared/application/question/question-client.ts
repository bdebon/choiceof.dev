import {useClient} from "libs/shared/application/api/client";
import ApiCollectionQuestionDecorator, {questionCollectionFactory} from "libs/shared/application/question/api-collection-question-decorator";
import {AxiosResponse} from "axios";
import {
  ApiReadQuestion,
  ApiUpdateQuestion,
} from "./question";

export interface getQuestionsFilter {
  slug?: string,
  id?: string,
  page?: number
}

export function getQuestions(searchFilter: getQuestionsFilter = {}): Promise<AxiosResponse<ApiCollectionQuestionDecorator>> {
  return useClient().get('/api/questions', { params: searchFilter }
  ).then(response => ({
    ...response,
    data: questionCollectionFactory(response.data)
  }))
}

export const updateQuestionManager = (questionUpdate: ApiUpdateQuestion, id: null|number): Promise<AxiosResponse<ApiReadQuestion>> =>
  id ? updateQuestion(id, questionUpdate) : createQuestion(questionUpdate);

export const createQuestion = (questionCreate: ApiUpdateQuestion) =>
  useClient().post<ApiReadQuestion>('/api/questions', questionCreate);

export function updateQuestion(id: number, question: ApiUpdateQuestion) {
  return useClient().patch<ApiReadQuestion>(
    `/api/questions/${id}`,
    question,
    {
      headers: {
        'Content-Type': 'application/merge-patch+json'
      }
    }
  )
}

export const removeQuestion = (id: number) =>
  useClient().delete<boolean>(`/api/questions/${id}`);


