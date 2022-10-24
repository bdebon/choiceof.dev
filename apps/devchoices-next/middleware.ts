import { NextRequest, NextResponse } from 'next/server'

import { questions } from './public/assets/data/questions'

export async function middleware(req: NextRequest) {

  const { pathname } = req.nextUrl

  const path = pathname.split('/').filter(Boolean).pop()

  if (!questions.some((question) => question.slug === path)) {
    const { slug } = questions[Math.floor(Math.random() * questions.length)]
    return NextResponse.redirect(new URL(`/question/${slug}`, req.url))
  }
}

export const config = {
  matcher: ['/', '/question/:slug*'],
}
