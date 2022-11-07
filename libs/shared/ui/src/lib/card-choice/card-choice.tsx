import { CSSProperties, useCallback, useEffect, useState } from 'react'
import CountUp from 'react-countup'
import Or from '../or/or'
import Image from 'next/future/image'
import {ChoiceItem} from "../../../../question/Choice";
import {QuestionItem} from "../../../../question/QuestionCollection";

export interface CardChoiceProps {
  questionItem: QuestionItem
  choiceItem: ChoiceItem
  addVote: (choiceItem: ChoiceItem) => void
  position?: 'left' | 'right'
}

export function CardChoice(props: CardChoiceProps) {
  const {position = 'left' } = props
  const showResult = props.questionItem.hasVoted

  const positionClass = position === 'left' ? 'top-0 lg:top-0 lg:bottom-0 lg:left-0' : 'bottom-0 lg:top-0 lg:right-0'

  const computeStyle = useCallback(() => {
    let _style: CSSProperties = {}

    if (typeof window !== 'undefined') {
      // detect window screen width function
      _style = showResult
        ? window?.innerWidth > 1024
          ? { width: `${props.choiceItem.getVotePercent()}%`, height: '100%' }
          : { height: `${props.choiceItem.getVotePercent()}%`, width: '100%' }
        : window?.innerWidth > 1024
        ? { width: `50%`, height: '100%' }
        : { height: `50%`, width: '100%' }
    }

    //_style = { ..._style, backgroundImage: `url(${imgUrl})` }

    return _style
  }, [showResult])

  const [style, setStyle] = useState<CSSProperties>()

  useEffect(() => {
    const onResize = () => {
      setStyle(computeStyle())
    }

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [computeStyle])

  useEffect(() => {
    setStyle(computeStyle())
  }, [setStyle, showResult, computeStyle])

  return (
    <div
      onClick={() => props.addVote(props.choiceItem)}
      data-testid="card"
      className={`cursor-pointer absolute lg-top-0 lg-bottom-0 flex items-center flex-col justify-center transition-size ease duration-1000  ${positionClass} lg:w-1/2 lg:h-full w-full h-1/2`}
      style={style}
    >
      <Image
        data-testid="card-image"
        src={props.choiceItem.getImgUrl()}
        priority
        alt={`illustration for ${position} choice`}
        fill
        placeholder="empty"
        className="relative z-0 pointer-events-none object-cover object-center"
        sizes="(max-width: 768px) 100vw,
              50vw"
      />

      <h1 className="px-4 text-3xl bg-black text-white uppercase font-bold w-56 text-center relative">
        {props.choiceItem.item.content}
      </h1>

      <div
        className={`relative mt-2 px-4 py-2 bg-white border-t-2 border-t-black font-bold text-black w-56 text-center opacity-0 ${
          showResult ? '!opacity-100 transition-opacity duration-500' : ''
        }`}
      >
        {showResult ? (
          <>
            <CountUp end={props.choiceItem.getVotePercent()} duration={1} />%
          </>
        ) : (
          'a'
        )}
      </div>
      <div
        className={`px-4 bg-white border-t-2 border-t-black font-bold text-black text-sm -rotate-3  opacity-0 ${
          showResult ? '!opacity-100 delay-1000 transition-opacity duration-300' : ''
        }`}
      >
        {showResult ? <>{props.choiceItem.item.totalVote} votes</> : 'a'}
      </div>
      {props.position === 'left' && <Or showResult={props.questionItem.hasVoted} />}
    </div>
  )
}

export default CardChoice
