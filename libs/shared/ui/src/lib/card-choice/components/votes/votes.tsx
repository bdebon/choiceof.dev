import React from 'react'

export interface VotesProps {
  isVisible: boolean
  count: number
}

const Votes: React.FC<VotesProps> = ({ isVisible, count }) => {
  return (
    <div
      className={`px-4 bg-white border-t-2 border-t-black font-bold text-black text-sm -rotate-3 opacity-0 ${
        isVisible ? '!opacity-100 delay-1000 transition-opacity duration-300' : ''
      }`}
    >
      {isVisible && <>{count} votes</>}
    </div>
  )
}

export default Votes
