import { render } from '@testing-library/react'

import Question from './question'

describe('Question', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Question />)
    expect(baseElement).toBeTruthy()
  })
})
