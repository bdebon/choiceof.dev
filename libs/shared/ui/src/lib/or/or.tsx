export interface OrProps {
  showResult: boolean
  className?: string
}

export function Or(props: OrProps) {
  const { showResult } = props

  return (
    <div
      className={`opacity-100 absolute right-[47.4%] lg:right-1/2 z-10 w-10 h-10 flex items-center justify-center top-1/2 transform lg:translate-x-1/2 -translate-y-1/2 bg-white text-black uppercase font-medium rounded-full  ${
        props.className || ''
      } ${showResult ? '!opacity-0 transition-opacity duration-700' : ''}`}
    >
      or
    </div>
  )
}

export default Or
