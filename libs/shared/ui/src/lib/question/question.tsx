import { CardChoice, CardChoiceProps } from '../card-choice/card-choice'
import Or from '../or/or'

export interface QuestionProps {
  leftChoiceProps: CardChoiceProps
  rightChoiceProps: CardChoiceProps
  showResult: boolean
  onNext: () => void
  onSkip: () => void
  onLeft: () => void
  onRight: () => void
}

export function Question(props: QuestionProps) {
  return (
    <div className="relative w-full h-screen">
      <Or showResult={props.showResult} />
      <CardChoice {...props.leftChoiceProps} showResult={props.showResult} onClick={props.onLeft} position="left" />
      <CardChoice {...props.rightChoiceProps} showResult={props.showResult} onClick={props.onRight} position="right" />
    </div>
  )
}

export default Question
