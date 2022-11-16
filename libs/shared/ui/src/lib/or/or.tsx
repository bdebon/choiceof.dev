export interface OrProps {
  showResult: boolean
  className?: string
}

export function Or(props: OrProps) {
  const { showResult } = props

  return (
    <div
      className={`opacity-100 absolute text-2xl lg:right-0  z-10 w-20 h-20 flex items-center justify-center lg:top-1/2 top-full transform lg:translate-x-1/2 -translate-y-1/2 lg:translate-y-1/2 bg-white text-black uppercase font-medium rounded-full ${
        props.className || ''
      } ${showResult ? '!opacity-0 transition-opacity duration-700' : ''}`}
    >
      or
    </div>
  )
}

export default Or
