import { CardChoice, CardChoiceProps } from '../card-choice/card-choice'
import Or from '../or/or'
import Button from '../button/button'
import { QuestionItem } from 'libs/shared/question/QuestionCollection';
import {ChoiceItem} from "../../../../question/Choice";

export interface QuestionProps {
  questionItem: QuestionItem
  addVote: (choiceItem: ChoiceItem) => void
  onNext: () => void
  // onSkip: () => void
  // onLeft: () => void
  // onRight: () => void
  className?: string
}

export function QuestionComponent(props: QuestionProps) {
  const showResultButton = props.questionItem.hasVoted
    ? `transition-opacity duration-300 delay-700 !opacity-100`
    : `opacity-0 pointer-events-none`

  return (
    <div className={`relative w-full h-full lg:h-screen ${props.className || ''}`}>
      {props.questionItem.choiceItems.map((choiceItem, index) => (
        <CardChoice
          addVote={props.addVote}
          key={choiceItem.item.id}
          choiceItem={choiceItem}
          questionItem={props.questionItem}
          position={index === 0 ? 'left' : 'right'}/>
      ))}
      <Button
        onClick={props.onNext}
        className={`absolute bottom-10 lg:bottom-8 left-1/2 transform -translate-x-1/2 ${showResultButton || ''}`}
      >
        Next question
      </Button>
    </div>
  )
}

export default QuestionComponent
