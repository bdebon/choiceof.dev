import { AppProps } from 'next/app'
import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import { DefaultSeo } from 'next-seo'
import { AnimatePresence } from 'framer-motion'

function CustomApp({ Component, pageProps, router }: AppProps) {
  const url = `https://wallis.dev${router.route}`

  return (
    <>
      <Head>
        <title>Welcome to devchoices-next!</title>
      </Head>
      <DefaultSeo
        titleTemplate="%s - James Wallis"
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
      <AnimatePresence initial={false} mode="popLayout" onExitComplete={() => window.scrollTo(0, 0)}>
        <Component {...pageProps} canonical={url} key={url} />
      </AnimatePresence>
    </>
  )
}

export default CustomApp
