import {mediaUrl} from "libs/shared/application/media/media-client";
import {ApiReadChoice} from "libs/shared/application/choice/choice";
import {ApiReadQuestionDecorator} from "libs/shared/application/question/api-read-question-decorator";

export class ApiReadChoiceDecorator {
  constructor(
    public item: ApiReadChoice,
    public questionItem: ApiReadQuestionDecorator
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
