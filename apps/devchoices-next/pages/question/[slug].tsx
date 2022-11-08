import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { PageTransitionWrapper, QuestionComponent } from '@benjamincode/shared/ui'
import { QuestionContext } from '../_app'
import Image from 'next/future/image'
import {ApiQuestionItem, getQuestions} from "../../../../libs/shared/api/question";
import {QuestionItem} from "../../../../libs/shared/question/QuestionCollection";
import {addVote} from "../../../../libs/shared/api/vote";
import {ChoiceItem} from "../../../../libs/shared/question/Choice";

export async function getStaticProps(context): Promise<{ props: QuestionPageProps }> {
  const {data} = await getQuestions()

  return {
    props: {
      question: data.findBySlug(context.params.slug).item
    },
  }
}

export async function getStaticPaths(context) {
  const {data} = await getQuestions()

  return {
    paths: data.collection.map(question => ({params: { slug: question.item.slug }})),
    fallback: false,
  }
}

export interface QuestionPageProps {
  question?: ApiQuestionItem
}

export function QuestionPage(props: QuestionPageProps) {
  const router = useRouter()
  const { slug } = router.query
  const [hasVoted, setHasVoted] = useState<boolean>(false)
  const questionContext = useContext(QuestionContext)
  const [nextQuestionItem, setNextQuestionItem] = useState<QuestionItem|null>(null)
  const [questionItem, setQuestionItem] = useState<QuestionItem|null>(null)

  if (!questionItem) {
    setQuestionItem(new QuestionItem(props.question))
  }

  const onLoadPage = () => {
    if (!questionContext.questionCollection) return

    const questionItemBySlug = questionContext.questionCollection.findBySlug(slug as string)
    if  (questionItemBySlug && questionItemBySlug.item.id !== questionItem.item.id) {
      setQuestionItem(questionItemBySlug)
    }

    questionContext.questionCollection.currentItem = questionItem
    setNextQuestionItem(questionContext.questionCollection.next())
  }
  useEffect(onLoadPage, [questionContext.questionCollection, slug])

  const addVoteHandler = (choiceItem: ChoiceItem) => {
    addVote(choiceItem.item["@id"])
      .then(() => {
        setQuestionItem(questionItem)
      })

    questionItem.addVote(choiceItem.item.id)
    setHasVoted(true)
  }

  const nextQuestionHandler = () => {
    router.push(`/question/${nextQuestionItem.item.slug}`)
  }

  const NextImagesPreloader = () => {
    return (
      <div className="fixed top-[-4000px] left-[-4000px] w-[100vw] h-[50vh] lg:h-[100vh]">
        {
          nextQuestionItem.choiceItems.map(choiceItem => (
            <Image
              key={choiceItem.item.content}
              src={choiceItem.getImgUrl()}
              alt="next image left"
              sizes="(max-width: 768px) 100vw,
              50vw"
              fill
              className="w-full h-full"
              loading="eager"
            />
          ))
        }
      </div>
    )
  }

  return (
    <div>
      {questionItem && <PageTransitionWrapper
        className="w-full h-full absolute inset-0"
        key={`${questionItem.choiceItems[0].item.content}-${questionItem.choiceItems[1].item.content}`}
        title={`${questionItem.choiceItems[0].item.content} or ${questionItem.choiceItems[1].item.content}`}
        description={`${questionItem.choiceItems[0].item.content} or ${questionItem.choiceItems[1].item.content}`}
      >
        {nextQuestionItem && <NextImagesPreloader/>}
        <QuestionComponent
          questionItem={questionItem}
          addVote={addVoteHandler}
          onNext={nextQuestionHandler}/>
      </PageTransitionWrapper>}
    </div>
  )
}

export default QuestionPage
