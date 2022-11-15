import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CardChoice } from './card-choice'
import { questions } from '@benjamincode/shared/assets'

const question = questions

export default {
  component: CardChoice,
  title: 'CardChoice',
} as ComponentMeta<typeof CardChoice>

const Template: ComponentStory<typeof CardChoice> = (args) => <CardChoice {...args} />

export const Primary = Template.bind({})
Primary.args = {
  title: question[0].choiceLeft.title,
  imgUrl: question[0].choiceLeft.img_path,
  totalCount: 100,
  voteCount: 40,
  onClick: () => {
    console.log('Hello')
  },
  position: 'left',
  showResult: false,
}
