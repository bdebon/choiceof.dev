import { ComponentStory, ComponentMeta } from '@storybook/react'
import { KeyboardControl } from './KeyboardControl'

export default {
  component: KeyboardControl,
  title: 'KeyboardControl',
  argTypes: {
    time: {
      name: 'Time',
      type: {name: 'number', required: true},
      description: 'Time of the animation'
    },
    keys: {
      name: 'Keys',
      type: {name: 'object', required: true},
      description: 'List of keys to press (For design reasons, 2 elements max in the table)'
    },
    showResult: {
      name: 'showResult',
      type: {name: 'boolean', required: true},
      description: 'Schow next question button ?'
    }
  }
} as ComponentMeta<typeof KeyboardControl>

const Template: ComponentStory<typeof KeyboardControl> = (args) => <KeyboardControl {...args}/>

export const Primary = Template.bind({})
Primary.args = {
  time: 4,
  keys: {
    leftKeys: ['l', 't'],
    rightKeys: ['r', 'b'],
    nextKeys: ['Space']
  }
}
