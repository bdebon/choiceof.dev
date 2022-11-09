import { queryByText, render } from '@testing-library/react'
import Votes, { VotesProps } from './votes'

const props: VotesProps = {
  isVisible: false,
  count: 40,
}

describe('Votes', () => {
  beforeEach(() => {
    props.isVisible = false
  })

  it('should render successfully', () => {
    const { baseElement } = render(<Votes {...props} />)
    expect(baseElement).toBeTruthy()
  })

  it('should display the count result', async () => {
    props.isVisible = true
    const { baseElement } = render(<Votes {...props} />)
    const element = queryByText(baseElement, '40 votes')
    expect(element).toBeTruthy()
  })

  it('shouldn\'t display the count result', async () => {
    props.isVisible = false
    const { baseElement } = render(<Votes {...props} />)
    const element = queryByText(baseElement, '40 votes')
    expect(element).toBeNull()
  })
})
