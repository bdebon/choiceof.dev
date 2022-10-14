import { render } from '@testing-library/react'

import Question, { QuestionProps } from './question'

const props: QuestionProps = {
  showResult: false,
  leftChoiceProps: {
    title: 'left',
    imgUrl: 'https://picsum.photos/200/300',
    totalCount: 100,
    voteCount: 40,
    onClick: jest.fn(),
  },
  rightChoiceProps: {
    title: 'right',
    imgUrl: 'https://picsum.photos/200/300',
    totalCount: 100,
    voteCount: 60,
    onClick: jest.fn(),
  },
  onNext: jest.fn(),
  onRight: jest.fn(),
  onLeft: jest.fn(),
  onSkip: jest.fn(),
}

describe('Question', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Question {...props} />)
    expect(baseElement).toBeTruthy()
  })
})
