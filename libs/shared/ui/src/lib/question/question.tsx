import { CardChoice, CardChoiceProps } from '../card-choice/card-choice'
import Or from '../or/or'
import Button from '../button/button'
import { TwitterIcon, TwitterShareButton } from 'next-share'

export interface QuestionProps {
  leftChoiceProps: CardChoiceProps
  rightChoiceProps: CardChoiceProps
  showResult: boolean
  onNext: () => void
  onSkip: () => void
  onLeft: () => void
  onRight: () => void
  className?: string
}

export function Question(props: QuestionProps) {
  const showResultButton = props.showResult
    ? `transition-opacity duration-300 delay-700 !opacity-100`
    : `opacity-0 pointer-events-none`

  return (
    <div className={`relative w-full h-full lg:h-screen ${props.className || ''}`}>
      <CardChoice {...props.leftChoiceProps} showResult={props.showResult} onClick={props.onLeft} position="left" />
      <CardChoice {...props.rightChoiceProps} showResult={props.showResult} onClick={props.onRight} position="right" />
      <Button
        onClick={props.onNext}
        className={`absolute bottom-10 lg:bottom-8 left-1/2 transform -translate-x-1/2 ${showResultButton || ''}`}
      >
        Next question
      </Button>
    </div>
  )
}

export default Question
