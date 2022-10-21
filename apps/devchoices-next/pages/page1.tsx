import Link from 'next/link'
import { PageTransitionWrapper } from '@benjamincode/shared/ui'

export function page1() {
  return (
    <PageTransitionWrapper className="page-1" title="page 1" description="description">
      <div className="w-full h-[100vh] bg-red-500 absolute  inset-0">
        <h1>Welcome to page1!</h1>
        <Link href={'/page2'}>Go to page 2</Link>
      </div>
    </PageTransitionWrapper>
  )
}

export default page1
