import { render } from '@testing-library/react'

import ShareTwitter from './share-twitter'

describe('ShareTwitter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ShareTwitter />)
    expect(baseElement).toBeTruthy()
  })
})
