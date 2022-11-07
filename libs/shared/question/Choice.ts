import {ApiChoiceItemRead} from "../api/question";
import {mediaUrl} from "../api/client";
import {QuestionItem} from "./QuestionCollection";

export class ChoiceItem {
  constructor(
    public item: ApiChoiceItemRead,
    public questionItem: QuestionItem
  ) {}

  public getImgUrl(): string {
    return mediaUrl(this.item.image.contentUrl)
  }

  public addVote(): void {
    this.item.totalVote++;
  }

  public getVotePercent(): number {
    return (this.item.totalVote / this.questionItem.item.totalVote) * 100
  }
}

export class ChoiceCollection {
  constructor(public collection: ChoiceItem[] = []) {
  }

  public get totalVote(): number {
    let total = 0;
    this.collection.forEach(choiceItem => total += choiceItem.item.totalVote)
    return total
  }
}
