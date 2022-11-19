import { useRouter } from 'next/router'
import { questions } from '../../public/assets/data/questions'
import { useCallback, useContext, useEffect, useState } from 'react'
import { QuestionInterface, VoteInterface } from '@benjamincode/shared/interfaces'
import { PageTransitionWrapper, Question } from '@benjamincode/shared/ui'
import { QuestionContext } from '../_app'
import Image from 'next/future/image'
import { NextSeo } from 'next-seo'

export const getStaticProps = async (context: { params: { slug: string } }): Promise<{ props: QuestionPageProps }> => {
  const slug = context.params.slug
  // Get external data from the file system, API, DB, etc.
  const question = questions.find((q) => q.slug === slug)

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: {
      question,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: questions.map((q) => ({ params: { slug: q.slug } })),
    fallback: false,
  }
}

export interface QuestionPageProps {
  question?: QuestionInterface
}

const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL

export function QuestionPage(props: QuestionPageProps) {
  const router = useRouter()
  const { slug } = router.query
  const [showResult, setShowResult] = useState(false)
  const questionContext = useContext(QuestionContext)
  const [nextQuestion, setNextQuestion] = useState<QuestionInterface>()
  const [voteValues, setVoteValues] = useState<number[]>([0, 0])
  const { question } = props

  const computeNextQuestion = useCallback(() => {
    if (slug) {
      const currentQuestion = questionContext.questions.find((q) => q.slug === slug)

      let nextQuestion: QuestionInterface
      if (currentQuestion && questionContext.questions[questionContext.questions.indexOf(currentQuestion) + 1]) {
        nextQuestion = questionContext.questions[questionContext.questions.indexOf(currentQuestion) + 1]
      } else {
        nextQuestion = questionContext.questions[0]
      }

      return nextQuestion
    }
    return undefined
  }, [slug, questionContext.questions])

  useEffect(() => {
    // todo replace with values fetched from database
    fetch(`${process.env.NEXT_PUBLIC_API_URL}?slug=${slug}`)
      .then((res) => res.json())
      .then((data: VoteInterface[]) => {
        const left = data.find((v: VoteInterface) => v.position === '0') || { count: 0 }
        const right = data.find((v: VoteInterface) => v.position === '1') || { count: 0 }
        setVoteValues([+left.count, +right.count])
      })
      .catch(() => {
        setVoteValues([Math.trunc(Math.random() * 1000), Math.trunc(Math.random() * 1000)])
      })
  }, [setVoteValues, slug])

  useEffect(() => {
    const nextQuestion = computeNextQuestion()
    if (!nextQuestion) return
    router.prefetch(`/question/${nextQuestion.slug}`).then()
  }, [slug, router, computeNextQuestion])

  useEffect(() => {
    setNextQuestion(computeNextQuestion())
  }, [slug, computeNextQuestion])

  const onNext = async () => {
    await router.push(`/question/${computeNextQuestion()?.slug}`)
  }

  const onSkip = async () => {
    if (question)
      await router.push('/question/' + questionContext.questions[questionContext.questions.indexOf(question) + 1].slug)
  }

  const onLeft = () => {
    // todo store the +1 in the database
    const form = new FormData()
    form.append('position', '0')
    fetch(`${process.env.NEXT_PUBLIC_API_URL}?slug=${slug}`, {
      method: 'POST',
      body: form,
    }).catch(() => {
      setVoteValues([voteValues[0], voteValues[1] + 1])
    })
    setVoteValues([voteValues[0] + 1, voteValues[1]])
    setShowResult(true)
  }

  const onRight = () => {
    // todo store the +1 in the database
    const form = new FormData()
    form.append('position', '1')
    fetch(`${process.env.NEXT_PUBLIC_API_URL}?slug=${slug}`, {
      method: 'POST',
      body: form,
    }).catch(() => {
      setVoteValues([voteValues[0], voteValues[1] + 1])
    })
    setVoteValues([voteValues[0], voteValues[1] + 1])
    setShowResult(true)
  }

  const NextImagesPreloader = () => {
    return (
      <div className="fixed top-[-4000px] left-[-4000px] w-[100vw] h-[50vh] lg:h-[100vh]">
        {nextQuestion && (
          <>
            <Image
              src={nextQuestion.choiceLeft.img_path}
              alt="next image left"
              sizes="(max-width: 768px) 100vw,
                50vw"
              fill
              className="w-full h-full"
              loading="eager"
            />
            <Image
              src={nextQuestion.choiceRight.img_path}
              alt="next image right"
              sizes="(max-width: 768px) 100vw,
                50vw"
              fill
              className="w-full h-full"
              loading="eager"
            />
          </>
        )}
      </div>
    )
  }

  return (
    <PageTransitionWrapper
      className="w-full h-full absolute inset-0"
      key={`${question?.choiceLeft.title}-${question?.choiceRight.title}`}
      title={`${question?.choiceLeft.title} or ${question?.choiceRight.title}`}
      description={`${question?.choiceLeft.title} or ${question?.choiceRight.title}`}
    >
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
              alt: `${question?.choiceLeft.title}-${question?.choiceRight.title}`,
            },
          ],
        }}
      />
      {nextQuestion && <NextImagesPreloader />}
      {question && (
        <Question
          leftChoiceProps={{
            showResult: showResult,
            voteCount: voteValues[0],
            imgUrl: question.choiceLeft.img_path,
            position: 'left',
            title: question.choiceLeft.title,
            onClick: onLeft,
            totalCount: voteValues[0] + voteValues[1],
          }}
          rightChoiceProps={{
            showResult: showResult,
            voteCount: voteValues[1],
            imgUrl: question.choiceRight.img_path,
            position: 'right',
            title: question.choiceRight.title,
            onClick: onRight,
            totalCount: voteValues[0] + voteValues[1],
          }}
          questionSlug={question.slug}
          websiteUrl={WEBSITE_URL}
          showResult={showResult}
          onNext={onNext}
          onSkip={onSkip}
          onLeft={onLeft}
          onRight={onRight}
        />
      )}
    </PageTransitionWrapper>
  )
}

export default QuestionPage
