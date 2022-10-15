import { MouseEventHandler } from 'react'

export interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
  className?: string
}

export function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`py-3 px-6 uppercase font-bold text-white bg-black ${props.className || ''}`}
    >
      {props.children}
    </button>
  )
}

export default Button
