import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CardChoice } from './card-choice'
import { questions } from '@benjamincode/shared/assets'

const question = questions[0]

export default {
  component: CardChoice,
  title: 'CardChoice',
} as ComponentMeta<typeof CardChoice>

const Template: ComponentStory<typeof CardChoice> = (args) => <CardChoice {...args} />

export const Primary = Template.bind({})
Primary.args = {
  title: question.choiceLeft.title,
  imgUrl: question.choiceLeft.img_path,
  totalCount: 100,
  voteCount: 40,
  onClick: () => console.log("Hello World"),
  position: 'left',
  showResult: false,
}
