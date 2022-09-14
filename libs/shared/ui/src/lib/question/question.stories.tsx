import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Question } from './question'
import { questions } from '@benjamincode/shared/assets'

export default {
  component: Question,
  title: 'Question',
} as ComponentMeta<typeof Question>

const Template: ComponentStory<typeof Question> = (args) => <Question {...args} />

export const Primary = Template.bind({})
Primary.args = {
  showResult: false,
  leftChoiceProps: {
    title: questions[0].choiceLeft.title,
    imgUrl: questions[0].choiceLeft.img_path,
    totalCount: 100,
    voteCount: 40,
    onClick: () => {},
  },
  rightChoiceProps: {
    title: questions[0].choiceRight.title,
    imgUrl: questions[0].choiceRight.img_path,
    totalCount: 100,
    voteCount: 60,
    onClick: () => {},
  },
  onNext: () => {},
}
