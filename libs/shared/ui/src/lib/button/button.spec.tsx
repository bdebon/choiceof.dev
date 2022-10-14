import { render } from '@testing-library/react'

import Button, { ButtonProps } from './button'

const props: ButtonProps = {
  onClick: jest.fn(),
  children: 'test',
}

describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Button {...props} />)
    expect(baseElement).toBeTruthy()
  })
})
