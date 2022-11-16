import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { QuestionContext } from './_app'
import { NextSeo } from 'next-seo'
import { questions } from '../public/assets/data/questions'

const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL
const question = questions.find((q) => q.slug === process.env.NEXT_PUBLIC_SLUG_FOR_OFFICIAL_PREVIEW)

export function Home() {
  const router = useRouter()
  const { slug } = router.query
  const questionContext = useContext(QuestionContext)

  useEffect(() => {
    if (!slug) router.push('question/' + questionContext.questions[0].slug)
  }, [slug])

  return (
    <NextSeo
      title={`${question?.choiceLeft.title} or ${question?.choiceRight.title}`}
      description={`You won't believe how many people voted the left choice!`}
      twitter={{
        handle: '@benjamincode',
        site: WEBSITE_URL,
        cardType: 'summary_large_image',
      }}
      openGraph={{
        title: `${question?.choiceLeft.title} or ${question?.choiceRight.title}`,
        description: `You won't believe how many people voted the left choice!`,
        images: [
          {
            url: `${WEBSITE_URL}/assets/img-previews/preview-${question?.slug}.jpg`,
            height: 628,
            width: 1200,
            alt: `${question?.choiceLeft.title} or ${question?.choiceRight.title}`,
          },
        ],
      }}
    />
  )
}

export default Home
