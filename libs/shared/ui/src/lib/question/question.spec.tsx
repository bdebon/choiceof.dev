import { render } from '@testing-library/react'

import Question, { QuestionProps } from './question'
import { questions } from '@benjamincode/shared/assets'

const props: QuestionProps = {
  showResult: false,
  leftChoiceProps: {
    title: questions[0].choiceLeft.title,
    imgUrl: questions[0].choiceLeft.img_path,
    totalCount: 100,
    voteCount: 40,
    onClick: jest.fn(),
  },
  rightChoiceProps: {
    title: questions[0].choiceRight.title,
    imgUrl: questions[0].choiceRight.img_path,
    totalCount: 100,
    voteCount: 60,
    onClick: jest.fn(),
  },
  onNext: jest.fn(),
}

describe('Question', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Question {...props} />)
    expect(baseElement).toBeTruthy()
  })
})
