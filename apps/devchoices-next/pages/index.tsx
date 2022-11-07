import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import {getQuestions} from "../../../libs/shared/api/question";

export function Home() {
  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    getQuestions()
      .then(response => router.push('/question/' + response.data.currentItem.item.slug))
  }, [slug])

  return (
    <div>
      <h1>Welcome to devchoices-next!</h1>
      <Link href={'/question/tab-or-space'}>Go to question 1</Link>
    </div>
  )
}

export default Home
