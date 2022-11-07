import { ComponentStory, ComponentMeta } from '@storybook/react'
import { QuestionComponent } from './questionComponent'
import { questions } from '@benjamincode/shared/assets'

export default {
  component: QuestionComponent,
  title: 'Question',
} as ComponentMeta<typeof QuestionComponent>

const Template: ComponentStory<typeof QuestionComponent> = (args) => <QuestionComponent {...args} />

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
