import {ApiReadQuestion} from "libs/shared/application/question/question";
import {ApiReadChoiceDecorator} from "libs/shared/application/choice/api-read-choice-decorator";

export class ApiReadQuestionDecorator {
  constructor(
    public item: ApiReadQuestion,
    public choiceItems: ApiReadChoiceDecorator[] = [],
    public hasVoted: boolean = false
  ) {
    this.choiceItems = item.choices?.map(itemChoice => new ApiReadChoiceDecorator(itemChoice, this)) ?? []
  }

  public addVote(itemChoiceId: number): void {
    if (this.hasVoted) return;

    this.getChoiceById(itemChoiceId)?.addVote()
    this.item.totalVote++

    this.hasVoted = true
  }

  public getChoiceById(itemChoiceId: number): ApiReadChoiceDecorator | undefined {
    return this.choiceItems.find(choiceItem => choiceItem.item.id === itemChoiceId)
  }
}
