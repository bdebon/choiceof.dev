import { render } from '@testing-library/react'

import KeyboardControl, { KeyboardControlProps } from './KeyboardControl'

const props: KeyboardControlProps = {
  time: 4,
  keys: {
    leftKeys: ['l', 't'],
    rightKeys: ['r', 'b'],
    nextKeys: ['Space']
  },
  onLeft: () => {},
  onRight: () => {},
  onNext: () => {},
  showResult: false
}

describe('KeyboardControl', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<KeyboardControl {...props} />)
    expect(baseElement).toBeTruthy()
  })
})
