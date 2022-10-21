import Link from 'next/link'
import { PageTransitionWrapper } from '@benjamincode/shared/ui'

export function page2() {
  return (
    <PageTransitionWrapper className="page-2" title="page 2" description="description">
      <div className="w-full h-[100vh] bg-blue-500 absolute inset-0">
        <h1>Welcome to page2!</h1>
        <Link href={'/page1'}>Go to page 1</Link>
      </div>
    </PageTransitionWrapper>
  )
}

export default page2
