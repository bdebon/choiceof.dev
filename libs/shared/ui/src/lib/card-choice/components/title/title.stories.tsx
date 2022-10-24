import { ComponentStory, ComponentMeta } from '@storybook/react'
import Title from './title'

import { questions } from '@benjamincode/shared/assets'

const question = questions[0]

export default {
  component: Title,
  title: 'CardChoice/Title',
} as ComponentMeta<typeof Title>

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: question.choiceLeft.title
}
