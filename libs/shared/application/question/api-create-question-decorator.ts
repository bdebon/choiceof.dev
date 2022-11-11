import {ApiCreateQuestion, apiUpdateQuestionFactory} from "./question";

export default class ApiCreateQuestionDecorator {
  constructor(
    public item: ApiCreateQuestion = apiUpdateQuestionFactory(),
  ) {
  }
}
