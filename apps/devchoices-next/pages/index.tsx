import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import {getQuestions} from "../../../libs/shared/application/question/question-client";
import LoaderComponent from "../../../libs/shared/ui/src/lib/shared/loader/loader-component";

export function Home() {
  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
     getQuestions()
       .then(response => router.push('/question/' + response.data.currentItem.item.slug))
  }, [router, slug])

  return (
    <div className={'bg-black min-w-screen min-h-screen'}>
      <LoaderComponent fullPage={true}></LoaderComponent>
    </div>
  )
}

export default Home
