import { useRouter } from 'next/router'
import { questions } from '../../public/assets/data/questions'
import { useCallback, useContext, useEffect, useState } from 'react'
import { QuestionInterface } from '@benjamincode/shared/interfaces'
import { PageTransitionWrapper, Question } from '@benjamincode/shared/ui'
import { QuestionContext } from '../_app'
import Image from 'next/future/image'

export async function getStaticProps(context): Promise<{ props: QuestionPageProps }> {
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

export async function getStaticPaths(context) {
  return {
    paths: questions.map((q) => ({ params: { slug: q.slug } })),
    fallback: false,
  }
}

export interface QuestionPageProps {
  question?: QuestionInterface
}

export function QuestionPage(props: QuestionPageProps) {
  const router = useRouter()
  const { slug } = router.query
  const [showResult, setShowResult] = useState(false)
  const questionContext = useContext(QuestionContext)
  const [nextQuestion, setNextQuestion] = useState<QuestionInterface>()
  const [voteValues, setVoteValues] = useState<number[]>([0, 0])

  const computeNextQuestion = useCallback(() => {
    if (slug) {
      const currentQuestion = questionContext.questions.find((q) => q.slug === slug)

      let nextQuestion: QuestionInterface
      if (questionContext.questions[questionContext.questions.indexOf(currentQuestion) + 1]) {
        nextQuestion = questionContext.questions[questionContext.questions.indexOf(currentQuestion) + 1]
      } else {
        nextQuestion = questionContext.questions[0]
      }

      return nextQuestion
    }
    return null
  }, [slug, questionContext.questions])

  useEffect(() => {
    // todo replace with values fetched from database
    fetch(`http://localhost:8000?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        const left = data.find((v) => v.position === 0) || { count: 0 }
        const right = data.find((v) => v.position === 1) || { count: 0 }
        setVoteValues([+left.count, +right.count])
      })
    setVoteValues([Math.trunc(Math.random() * 1000), Math.trunc(Math.random() * 1000)])
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
    await router.push(`/question/${computeNextQuestion().slug}`)
  }

  const onSkip = async () => {
    await router.push(
      '/question/' + questionContext.questions[questionContext.questions.indexOf(props.question) + 1].slug
    )
  }

  const onLeft = () => {
    // todo store the +1 in the database
    const form = new FormData()
    form.append('position', '0')
    fetch(`http://localhost:8000/?slug=${slug}`, {
      method: 'POST',
      body: form,
    })
    setVoteValues([voteValues[0] + 1, voteValues[1]])
    setShowResult(true)
  }

  const onRight = () => {
    // todo store the +1 in the database
    const form = new FormData()
    form.append('position', '1')
    fetch(`http://localhost:8000/?slug=${slug}`, {
      method: 'POST',
      body: form,
    })
    setVoteValues([voteValues[0], voteValues[1] + 1])
    setShowResult(true)
  }

  const NextImagesPreloader = () => {
    return (
      <div className="fixed top-[-4000px] left-[-4000px] w-[100vw] h-[50vh] lg:h-[100vh]">
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
      </div>
    )
  }

  return (
    <PageTransitionWrapper
      className="w-full h-full absolute inset-0"
      key={`${props.question.choiceLeft.title}-${props.question.choiceRight.title}`}
      title={`${props.question.choiceLeft.title} or ${props.question.choiceRight.title}`}
      description={`${props.question.choiceLeft.title} or ${props.question.choiceRight.title}`}
    >
      {nextQuestion && <NextImagesPreloader />}
      <Question
        leftChoiceProps={{
          showResult: showResult,
          voteCount: voteValues[0],
          imgUrl: props.question?.choiceLeft.img_path,
          position: 'left',
          title: props.question?.choiceLeft.title,
          onClick: onLeft,
          totalCount: voteValues[0] + voteValues[1],
        }}
        rightChoiceProps={{
          showResult: showResult,
          voteCount: voteValues[1],
          imgUrl: props.question?.choiceRight.img_path,
          position: 'right',
          title: props.question?.choiceRight.title,
          onClick: onRight,
          totalCount: voteValues[0] + voteValues[1],
        }}
        showResult={showResult}
        onNext={onNext}
        onSkip={onSkip}
        onLeft={onLeft}
        onRight={onRight}
      />
    </PageTransitionWrapper>
  )
}

export default QuestionPage
