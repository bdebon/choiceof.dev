import React from 'react'

const Title: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <h1 className={`px-4 text-3xl bg-black text-white uppercase font-bold w-56 text-center relative group-hover:animate-wiggle group-hover:cursor-pointer`}>{children}</h1>
  )
}

export default Title