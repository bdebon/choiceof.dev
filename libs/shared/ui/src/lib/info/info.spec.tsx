import { render } from '@testing-library/react'

import Info from './info'

describe('Info', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Info />)
    expect(baseElement).toBeTruthy()
  })
})
