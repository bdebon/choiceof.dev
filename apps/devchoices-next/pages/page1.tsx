import Link from 'next/link'
import { PageTransitionWrapper } from '@benjamincode/shared/ui'
import Image from 'next/image'

export function page1() {
  return (
    <PageTransitionWrapper key="page1" className="page-1" title="page 1" description="description">
      <div className="w-full h-[100vh] bg-red-500 absolute  inset-0">
        <Image src={'/assets/img/space.jpg'} alt="hero" layout="fill" objectFit="cover" />

        <div className="relative">
          <h1>Welcome to page1!</h1>
          <Link prefetch href={'/page2'}>
            Go to page 2
          </Link>
        </div>
      </div>
    </PageTransitionWrapper>
  )
}

export default page1
