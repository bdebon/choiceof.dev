import { ReactNode } from 'react'
import { NextSeo } from 'next-seo'
import { motion } from 'framer-motion'

export interface PageTransitionWrapperProps {
  children: ReactNode
  title: string
  description: string
  className?: string
}

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
}

export function PageTransitionWrapper({ title, description, children, className = '' }: PageTransitionWrapperProps) {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        twitter={{
          handle: '@benjamincode',
          site: 'https://choiceof.dev',
          cardType: 'summary_large_image',
        }}
        openGraph={{ title, description }}
      />
      <motion.main
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: 'easeOut', duration: 0.7 }}
        className={`w-full h-full ${className}`}
      >
        {children}
      </motion.main>
    </>
  )
}

export default PageTransitionWrapper
