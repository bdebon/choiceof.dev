import { ComponentStory, ComponentMeta } from '@storybook/react'
import Votes from './votes'

export default {
  component: Votes,
  title: 'CardChoice/Votes',
} as ComponentMeta<typeof Votes>

// A little of css to make it centered and more visible :)
const Template: ComponentStory<typeof Votes> = (args) => <div className='flex justify-center items-center h-60'><Votes {...args} /></div>

export const Primary = Template.bind({})
Primary.args = {
  count: 40,
  isVisible: false
}
