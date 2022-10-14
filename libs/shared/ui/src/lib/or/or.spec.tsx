import { render } from '@testing-library/react'

import Or from './or'

describe('Or', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Or />)
    expect(baseElement).toBeTruthy()
  })
})
