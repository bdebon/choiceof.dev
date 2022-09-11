import { CSSProperties } from 'react'

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
  const percent = (voteCount / totalCount) * 100
  let style: CSSProperties = showResult
    ? window.innerWidth > 1024
      ? { width: `${percent}%`, height: '100%' }
      : { height: `${percent}%`, width: '100%' }
    : window.innerWidth > 1024
    ? { width: `50%`, height: '100%' }
    : { height: `50%`, width: '100%' }
  style = { ...style, backgroundImage: `url(${imgUrl})` }

  return (
    <div
      data-testid="card"
      className={`absolute lg-top-0 lg-bottom-0 transition-all ease-in-out bg-cover bg-center ${positionClass}`}
      style={style}
    >
      <h1>{props.title}</h1>
      {showResult && <div>{props.voteCount} votes</div>}
      {showResult && <div>{Math.trunc((voteCount / totalCount) * 100)}%</div>}
    </div>
  )
}

export default CardChoice
