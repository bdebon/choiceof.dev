import { ComponentStory, ComponentMeta } from '@storybook/react'
import Percentage from './percentage'

export default {
  component: Percentage,
  title: 'CardChoice/Percentage',
} as ComponentMeta<typeof Percentage>

// A little of css to make it centered and more visible :)
const Template: ComponentStory<typeof Percentage> = (args) => <div className='flex justify-center items-center h-60'><Percentage {...args} /></div>

export const Primary = Template.bind({})
Primary.args = {
  percentage: 40,
  isVisible: false
}
