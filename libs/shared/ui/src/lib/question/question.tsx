import { CardChoice, CardChoiceProps } from '../card-choice/card-choice'
import Button from '../button/button'
import ShareTwitter from '../share-twitter/share-twitter'
import Info from '../info/info'
import { useCallback, useEffect } from 'react'

export interface QuestionProps {
  leftChoiceProps: CardChoiceProps
  rightChoiceProps: CardChoiceProps
  questionSlug: string
  showResult: boolean
  onNext: () => void
  onSkip: () => void
  onLeft: () => void
  onRight: () => void
  className?: string
  websiteUrl?: string
}

export function Question(props: QuestionProps) {
  const showResultButton = props.showResult
    ? `transition-opacity duration-300 delay-700 !opacity-100`
    : `opacity-0 pointer-events-none`


  const keyPress = useCallback((e: KeyboardEvent) => {
    if(e.code === 'KeyL' || e.code === 'KeyT'){
      props.onLeft()
    }else if(e.code === 'KeyR' || e.code === 'KeyB'){
      props.onRight()
    }else if(e.code === 'Space' && props.showResult){
      props.onNext()
    }
  }, [])
  useEffect(() => {
    document.addEventListener('keypress', keyPress)
    return () => {
      document.removeEventListener('keypress', keyPress)
    }
  }, [])

  return (
    <div className={`relative w-full h-full lg:h-screen ${props.className || ''}`}>
      <CardChoice {...props.leftChoiceProps} showResult={props.showResult} onClick={props.onLeft} position="left" />
      <CardChoice {...props.rightChoiceProps} showResult={props.showResult} onClick={props.onRight} position="right" />

      <ShareTwitter
        websiteUrl={props.websiteUrl || 'https://choiceof.dev'}
        questionSlug={props.questionSlug}
        showResult={props.showResult}
      />

      <Button
        onClick={props.onNext}
        className={`absolute bottom-10 lg:bottom-8 left-1/2 transform -translate-x-1/2 ${showResultButton || ''}`}
      >
        Next question
      </Button>
      <Info />
    </div>
  )
}

export default Question
