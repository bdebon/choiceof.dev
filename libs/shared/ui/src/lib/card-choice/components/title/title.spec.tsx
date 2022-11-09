import { findByText, render } from '@testing-library/react'
import Title from "./title"

describe('Title', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Title>Hello World</Title>)
    expect(baseElement).toBeTruthy()
  })

  it('should display the children', async () => {
    const { baseElement } = render(<Title>Hello World</Title>)
    const element = findByText(baseElement, 'Hello World')
    expect(element).toBeTruthy()
  })
})
