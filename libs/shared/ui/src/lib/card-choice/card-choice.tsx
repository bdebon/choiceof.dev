import { CSSProperties, useEffect, useState } from 'react'
import CountUp from 'react-countup'

export interface CardChoiceProps {
  title: string
  imgUrl: string
  voteCount: number
  totalCount: number
  onClick: () => void
  showResult?: boolean
  position?: 'left' | 'right'
}

export function CardChoice(props: CardChoiceProps) {
  const { title, imgUrl, voteCount, totalCount = 1, onClick, showResult = false, position = 'left' } = props

  const positionClass = position === 'left' ? 'top-0 lg:top-0 lg:bottom-0 lg:left-0' : 'bottom-0 lg:top-0 lg:right-0'
  const [percent, setPercent] = useState<number>(0)
  let style: CSSProperties = showResult
    ? window.innerWidth > 1024
      ? { width: `${percent}%`, height: '100%' }
      : { height: `${percent}%`, width: '100%' }
    : window.innerWidth > 1024
    ? { width: `50%`, height: '100%' }
    : { height: `50%`, width: '100%' }
  style = { ...style, backgroundImage: `url(${imgUrl})` }

  const formatValue = (value: number) => value.toFixed(0)

  useEffect(() => {
    if (showResult) {
      setPercent((voteCount / totalCount) * 100)
    } else setPercent(0)
  }, [setPercent, showResult, voteCount, totalCount])

  return (
    <div
      data-testid="card"
      className={`absolute lg-top-0 lg-bottom-0 flex items-center flex-col justify-center transition-size ease duration-1000 bg-cover bg-center ${positionClass}`}
      style={style}
    >
      <h1 className="px-4 bg-black text-white uppercase font-bold w-56 text-center">{props.title}</h1>

      <div
        className={`mt-2 px-4 py-2 bg-white border-t-2 border-t-black font-bold text-black w-56 text-center opacity-0 ${
          showResult ? '!opacity-100 transition-opacity duration-500' : ''
        }`}
      >
        {showResult ? (
          <>
            <CountUp end={percent} duration={1} />%
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
        {showResult ? <>{props.voteCount} votes</> : 'a'}
      </div>
    </div>
  )
}

export default CardChoice
