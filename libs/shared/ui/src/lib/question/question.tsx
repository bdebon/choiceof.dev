import { CardChoice, CardChoiceProps } from '../card-choice/card-choice'

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
      <div
        className={`opacity-100 absolute z-10 w-10 h-10 flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black uppercase font-medium rounded-full ${
          props.showResult ? '!opacity-0 transition-opacity duration-300' : ''
        }`}
      >
        or
      </div>
      <CardChoice {...props.leftChoiceProps} showResult={props.showResult} onClick={props.onLeft} position="left" />
      <CardChoice {...props.rightChoiceProps} showResult={props.showResult} onClick={props.onRight} position="right" />
    </div>
  )
}

export default Question
