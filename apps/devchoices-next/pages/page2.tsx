import Link from 'next/link'
import { PageTransitionWrapper } from '@benjamincode/shared/ui'
import Image from 'next/image'

export function page2() {
  return (
    <PageTransitionWrapper key="page2" className="page-2" title="page 2" description="description">
      <div className="w-full h-[100vh] bg-blue-500 absolute inset-0">
        <Image src={'/assets/img/tab.png'} alt="hero" layout="fill" objectFit="cover" />

        <div className="relative">
          <h1>Welcome to page2!</h1>
          <Link prefetch href={'/page1'}>
            Go to page 1
          </Link>
        </div>
      </div>
    </PageTransitionWrapper>
  )
}

export default page2
