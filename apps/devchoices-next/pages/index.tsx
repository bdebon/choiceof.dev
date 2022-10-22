import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { QuestionContext } from './_app'

// todo find the type for context
export function Home() {
  const router = useRouter()
  const { slug } = router.query
  const questionContext = useContext(QuestionContext)

  useEffect(() => {
    if (!slug) router.push('question/' + questionContext.questions[0].slug)
  }, [slug])

  return (
    <div>
      <h1>Welcome to devchoices-next!</h1>
      <Link href={'/question/tab-or-space'}>Go to question 1</Link>
    </div>
  )
}

export default Home
