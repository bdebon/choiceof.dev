import Link from 'next/link'

export function Home() {
  return (
    <div>
      <h1>Welcome to devchoices-next!</h1>
      <Link href={'/question/tab-or-space'}>Go to question 1</Link>
    </div>
  )
}

export default Home
