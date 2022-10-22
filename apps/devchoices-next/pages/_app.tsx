import { AppProps } from 'next/app'
import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import { DefaultSeo } from 'next-seo'
import { AnimatePresence } from 'framer-motion'

import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { QuestionInterface } from '@benjamincode/shared/interfaces'
import { questions } from '../public/assets/data/questions'

export const QuestionContext = createContext<{
  questions: QuestionInterface[]
  setQuestions: (questions: QuestionInterface[]) => void
}>({
  questions: [],
  setQuestions: (b: QuestionInterface[]) => {},
})

function CustomApp({ Component, pageProps, router }: AppProps) {
  const [contextQuestions, setContextQuestions] = useState([])
  const url = `https://choiceof.dev${router.query.slug ? '/question/' + router.query.slug : ''}`

  const fillingForm = () => {
    if (contextQuestions.length === 0) {
      // if we land on the website on a specific url, we fill the questions with first the question of the url
      // then the rest of the questions in a random order
      if (router.query.slug) {
        const question = questions.find((q) => q.slug === router.query.slug)
        const otherQuestions = questions.filter((q) => q.slug !== router.query.slug)
        setContextQuestions([question, ...otherQuestions.sort(() => 0.5 - Math.random())])
      } else {
        // if we land on the website without any URL we fill the question in a absolute random order
        setContextQuestions(questions.sort(() => 0.5 - Math.random()))
      }
    }
  }

  fillingForm()

  return (
    <QuestionContext.Provider value={{ questions: contextQuestions, setQuestions: setContextQuestions }}>
      <Head>
        <title>Welcome to devchoices-next!</title>
      </Head>
      <DefaultSeo
        titleTemplate="%s - Choice of developers"
        openGraph={{
          type: 'website',
          locale: 'en_EN',
          url,
          description: 'Choice of developers: Tab or Space?',
          site_name: 'Choice of developers',
          images: [],
        }}
        canonical={url}
      />
      <AnimatePresence initial={false} presenceAffectsLayout={false} onExitComplete={() => window.scrollTo(0, 0)}>
        <Component {...pageProps} key={url} />
      </AnimatePresence>
    </QuestionContext.Provider>
  )
}

export default CustomApp
