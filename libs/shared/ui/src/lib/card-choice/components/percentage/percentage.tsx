import React from 'react'
import CountUp from 'react-countup'

export interface PercentageProps {
  isVisible: boolean
  percentage: number
}

const Percentage: React.FC<PercentageProps> = ({ isVisible, percentage }) => {
  return (
    <div
      className={`relative mt-2 px-4 py-2 bg-white border-t-2 border-t-black font-bold text-black w-56 text-center opacity-0 ${
        isVisible ? '!opacity-100 transition-opacity duration-500' : ''
      }`}
    >
      {isVisible && (
        <>
          <CountUp end={percentage} duration={1} />%
        </>
      )}
    </div>
  )
}

export default Percentage
