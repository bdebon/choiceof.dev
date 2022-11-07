import {QuestionState, questionStateList} from "../../../../api/question";
import ChoiceItem from "./choice-item";
import Button from "../button/button";
import {QuestionItem} from "../../../../question/QuestionCollection";

export interface questionItemProps {
  questionItem: QuestionItem,
  removeQuestion: (id: number) => void,
  changeState: (id: number, state: QuestionState) => void
}

export default function QuestionItemComponent(props: questionItemProps): JSX.Element {
  const headers: {label: string, value: string|number}[] = [
    { label: 'Id', value: props.questionItem.item.id },
    { label: 'Titre', value: props.questionItem.item.content },
    { label: 'Vote total', value: props.questionItem.item.totalVote },
  ]

  return (<div  className={'border-2 p-2 my-2'}>
    {headers.map(header => (
      <div>
        <span className={'font-bold mr-2'}>{header.label} :</span>
        <span>{header.value}</span>
      </div>
    ))}
    <div>
      <span className={'font-bold mr-2'}>Statut :</span>
      <select onChange={(e) => props.changeState(props.questionItem.item.id, e.target.value as QuestionState)}>
        {questionStateList.map(state => (
          <option key={state} value={state} selected={state === props.questionItem.item.state}>{state}</option>
        ))}
      </select>
    </div>
    <div>
      <Button className={'bg-red-600'} onClick={() => props.removeQuestion(props.questionItem.item.id)}>Supprimer cette question</Button>
    </div>
    <hr className={'border my-1'}/>
    <div className={'flex'}>
      {props.questionItem.item.choices &&
        props.questionItem.item.choices.map(choice => (
          <div className={'w-50'}>
            <ChoiceItem key={choice.content} choice={choice}/>
          </div>
        ))
      }
    </div>
  </div>)
}
