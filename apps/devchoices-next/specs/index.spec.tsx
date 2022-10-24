import React from 'react'
import { render } from '@testing-library/react'

import Index from '../pages/index'

jest.mock('next/router', () => ({
  ...(jest.requireActual('next/router') as any),
  useRouter: () => ({ query: { slug: 'tab-or-space' } }),
}))

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Index />)
    expect(baseElement).toBeTruthy()
  })
})
