import {ChoiceRead} from "libs/shared/application/question/question-client";
import {mediaUrl} from "libs/shared/application/media/media-client";

export interface ChoiceItemProps {
  choice: ChoiceRead
}

export default function ChoiceItem(props: ChoiceItemProps) {
  const url = props.choice?.image?.contentUrl ? mediaUrl(props.choice.image.contentUrl): '';

  return (
    <>
      <div>
        <span className={'font-semibold'}>Choix : </span>
        <span>{props.choice.content}</span>
      </div>
      <div>
        <span className={'font-semibold'}>Vote : </span>
        <span>{props.choice.totalVote}</span>
      </div>
      <div>
        <img src={url} alt="img-choice"/>
      </div>
    </>
  )
}
