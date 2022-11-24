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
          ? { width: `${percent}%`, height: '100%'  }
          : { height: `${percent}%`, width: '100%' }
        : window?.innerWidth > 1024
        ? { width: `50%`, height: '100%' }
        : { height: `50%`, width: '100%' }
    }

    return _style
  }, [imgUrl, percent, showResult])

  const [style, setStyle] = useState<CSSProperties>()

  const computeFontStyle = useCallback(() => {
    let _fontStyle: CSSProperties = {}
    if (typeof window !== 'undefined') {
      _fontStyle = showResult ? {fontSize: `${percent}px`, transition: 'all 0.8s ease'} : {fontSize: 'text-3xl lg:text-5xl'}
    }

    return _fontStyle
  }, [imgUrl, percent, showResult])

  const [fontStyle, setFontStyle] = useState<CSSProperties>()


  useEffect(() => {
    const onResize = () => {
      setStyle(computeStyle())
      setFontStyle(computeFontStyle())
    }

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [computeStyle, computeFontStyle])

  useEffect(() => {
    if (showResult) {
      setPercent((voteCount / totalCount) * 100)
    }
  }, [setPercent, showResult, voteCount, totalCount])

  useEffect(() => {
    setStyle(computeStyle())
    setFontStyle(computeFontStyle())
  }, [percent, setStyle, showResult, computeStyle, computeFontStyle])

  const onVote = (): void => {
    if (!showResult) return onClick()
  }

  return (
    <div
      onClick={() => {
        onVote()
      }}
      data-testid="card"
      className={`absolute lg-top-0 lg-bottom-0 flex items-center flex-col justify-center transition-size ease duration-1000 ${positionClass} lg:w-1/2 lg:h-full w-full h-1/2`}
      style={style}
    >
      <Image
        data-testid="card-image"
        src={imgUrl}
        priority
        alt={`illustration for ${position} choice`}
        fill
        placeholder="empty"
        className="relative z-0 pointer-events-none object-cover object-center"
        sizes="(max-width: 768px) 100vw,
              50vw"
      />
      <div className='flex justify-center mx-8 items-center w-fit bg-black/70 z-10'>
        <h1 style={fontStyle} className={`px-4 py-2 text-3xl lg:text-5xl leading-normal text-white uppercase font-bold text-center relative`}>
          {title}
        </h1>
      </div>

      <div
        className={`relative mt-2 px-4 py-2 bg-white border-t-2 border-t-black font-bold text-black max-w-56 text-center opacity-0 ${
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
      {props.position === 'left' && <Or showResult={props.showResult} />}
    </div>
  )
}

export default CardChoice
