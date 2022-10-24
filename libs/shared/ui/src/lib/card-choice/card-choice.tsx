import { CSSProperties, useCallback, useEffect, useState } from 'react'
import CountUp from 'react-countup'
import Or from '../or/or'
import Image from 'next/future/image'

export interface CardChoiceProps {
  title: string
  imgUrl: string
  voteCount: number
  totalCount: number
  onClick: () => void
  showResult: boolean
  position?: 'left' | 'right'
}

export function CardChoice(props: CardChoiceProps) {
  const { title, imgUrl, voteCount, totalCount = 1, onClick, showResult = false, position = 'left' } = props

  const positionClass = position === 'left' ? 'top-0 lg:top-0 lg:bottom-0 lg:left-0' : 'bottom-0 lg:top-0 lg:right-0'
  const [percent, setPercent] = useState<number>(0)

  const computeStyle = useCallback(() => {
    let _style: CSSProperties = {}

    if (typeof window !== 'undefined') {
      // detect window screen width function
      _style = showResult
        ? window?.innerWidth > 1024
          ? { width: `${percent}%`, height: '100%' }
          : { height: `${percent}%`, width: '100%' }
        : window?.innerWidth > 1024
        ? { width: `50%`, height: '100%' }
        : { height: `50%`, width: '100%' }
    }

    //_style = { ..._style, backgroundImage: `url(${imgUrl})` }

    return _style
  }, [imgUrl, percent, showResult])

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
    if (showResult) {
      setPercent((voteCount / totalCount) * 100)
    }
  }, [setPercent, showResult, voteCount, totalCount])

  useEffect(() => {
    setStyle(computeStyle())
  }, [percent, setStyle, showResult, computeStyle])

  return (
    <>
      <div
        onClick={onClick}
        data-testid="card"
        className={`absolute lg-top-0 lg-bottom-0 flex items-center flex-col justify-center transition-size ease duration-1000 ${positionClass} lg:w-1/2 lg:h-full w-full h-1/2 group overflow-hidden hover:`}
        style={style}
      >
        <Image
          data-testid="card-image"
          src={imgUrl}
          priority
          alt={`illustration for ${position} choice`}
          fill
          placeholder="empty"
          className={`relative z-0 object-cover object-center group-hover:cursor-pointer ${
            !showResult ? 'scale-100 group-hover:scale-105 transition-transform duration-300 ease-in-out ' : ''
          } `}
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        <h1 className="px-4 text-3xl bg-black text-white uppercase font-bold w-56 text-center relative">{title}</h1>

        <div
          className={`relative mt-2 px-4 py-2 bg-white border-t-2 border-t-black font-bold text-black w-56 text-center opacity-0 ${
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
      {props.position === 'left' && <Or showResult={props.showResult} />}
    </>
  )
}

export default CardChoice
