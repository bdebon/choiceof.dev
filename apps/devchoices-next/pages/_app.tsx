import { AppProps } from 'next/app'
import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import { DefaultSeo } from 'next-seo'
import { AnimatePresence } from 'framer-motion'

import { createContext, useEffect, useState } from 'react'
import { QuestionInterface } from '@benjamincode/shared/interfaces'
import { questions } from '../public/assets/data/questions'
import Script from 'next/script'
import init from '@socialgouv/matomo-next'

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID
const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL

export const QuestionContext = createContext<{
  questions: QuestionInterface[]
  setQuestions: (questions: QuestionInterface[]) => void
}>({
  questions: [],
  setQuestions: (b: QuestionInterface[]) => {},
})

function CustomApp({ Component, pageProps, router }: AppProps) {
  const [contextQuestions, setContextQuestions] = useState<QuestionInterface[]>([])
  const url = `${WEBSITE_URL}${router.query.slug ? '/question/' + router.query.slug : ''}`

  const fillingForm = () => {
    console.log(contextQuestions)
    if (contextQuestions.length === 0) {
      // if we land on the website on a specific url, we fill the questions with first the question of the url
      // then the rest of the questions in a random order
      if (router.query.slug) {
        const question: QuestionInterface | undefined = questions.find((q) => q.slug === router.query.slug)
        const partnerSlug = 'hostinger-or-hostinger'
        const questionPartner: QuestionInterface = questions.find((q) => q.slug === partnerSlug) as QuestionInterface

        let otherQuestions = questions.filter((q) => q.slug !== router.query.slug && q.slug !== partnerSlug)

        // randomize otherQuestions
        otherQuestions = otherQuestions.sort(() => 0.5 - Math.random())
        // insert the question partner at the fifth position in otherQuestions
        const partnerPositionIndex = 9
        otherQuestions.splice(partnerPositionIndex - 2, 0, questionPartner)

        if (question) setContextQuestions([question, ...otherQuestions])
        else setContextQuestions(otherQuestions)
      } else {
        // if we land on the website without any URL we fill the question in a absolute random order
        setContextQuestions(questions.sort(() => 0.5 - Math.random()))
      }
    }
  }

  fillingForm()

  useEffect(() => {
    if (MATOMO_URL && MATOMO_SITE_ID) {
      init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID })
    }
  }, [])

  return (
    <QuestionContext.Provider value={{ questions: contextQuestions, setQuestions: setContextQuestions }}>
      <Head>
        <title>Welcome to devchoices-next!</title>
      </Head>
      <DefaultSeo
        titleTemplate="%s - Choice of developers"
        title="Choice of developers"
        description="Choice of developers: Tab or Space?"
        twitter={{
          handle: '@benjamincode',
          site: WEBSITE_URL,
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
      <a
        href="https://bit.ly/hostinger-benjamin-code"
        target="_blank"
        className="fixed z-10 lg:bottom-6 lg:right-6 bottom-4 right-2"
      >
        <img
          src="/assets/logo/hostinger.jpg"
          className="filter grayscale rounded-full w-10 lg:w-14 hover:grayscale-0 transition-all"
        />
      </a>
      <AnimatePresence initial={false} presenceAffectsLayout={false} onExitComplete={() => window.scrollTo(0, 0)}>
        <Component {...pageProps} key={url} />
      </AnimatePresence>

      <Script id="matomo" strategy="lazyOnload">
        {`
          var _paq = window._paq = window._paq || [];
          /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
          var u="//choiceof.dev/matomo/";
          _paq.push(['setTrackerUrl', u+'matomo.php']);
          _paq.push(['setSiteId', '1']);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        })();
        `}
      </Script>
    </QuestionContext.Provider>
  )
}

export default CustomApp
