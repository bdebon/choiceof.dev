import { render } from '@testing-library/react'

import PageTransitionWrapper from './page-transition-wrapper'

describe('PageTransitionWrapper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageTransitionWrapper />)
    expect(baseElement).toBeTruthy()
  })
})
