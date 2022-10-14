export interface OrProps {
  showResult: boolean
}

export function Or(props: OrProps) {
  const { showResult } = props

  return (
    <div
      className={`opacity-100 absolute z-10 w-10 h-10 flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black uppercase font-medium rounded-full ${
        showResult ? '!opacity-0 transition-opacity duration-300' : ''
      }`}
    >
      or
    </div>
  )
}

export default Or
