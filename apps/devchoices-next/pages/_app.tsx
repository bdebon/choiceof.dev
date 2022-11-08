import { AppProps } from 'next/app'
import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import { DefaultSeo } from 'next-seo'
import { AnimatePresence } from 'framer-motion'
import {createContext, Dispatch, SetStateAction, useState} from 'react'
import Script from 'next/script'
import {getQuestions} from "../../../libs/shared/api/question";
import QuestionCollection from "../../../libs/shared/question/QuestionCollection";

export interface DefaultQuestionContext {
  questionCollection: QuestionCollection|null,
  setQuestionCollection: Dispatch<SetStateAction<QuestionCollection>>|null
}

export const QuestionContext = createContext<DefaultQuestionContext>({
  questionCollection: null,
  setQuestionCollection: null
})

function CustomApp({ Component, pageProps, router }: AppProps) {
  const [questions, setQuestions] = useState<QuestionCollection|null>(null)
  const url = `https://choiceof.dev${router.query.slug ? '/question/' + router.query.slug : ''}`

  const context: DefaultQuestionContext = {
    questionCollection: questions,
    setQuestionCollection: setQuestions
  }

  if (!questions) {
    console.log('ça get de la question')
    getQuestions().then(response => setQuestions(response.data))
  }

  return (
    <QuestionContext.Provider value={context}>
      <Head>
        <title>Welcome to devchoices-next!</title>
      </Head>
      <DefaultSeo
        titleTemplate="%s - Choice of developers"
        title="Choice of developers"
        description="Choice of developers: Tab or Space?"
        twitter={{
          handle: '@benjamincode',
          site: 'https://choiceof.dev',
          cardType: 'summary_large_image',
        }}
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
        <Component {...pageProps} key={url}/>
      </AnimatePresence>

      <Script id="gtag" strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-5XL7L6Z7XL`} />

      <Script id="init-gtag" strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-5XL7L6Z7XL', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
    </QuestionContext.Provider>
  )
}

export default CustomApp
