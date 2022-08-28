import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SharedUi } from './shared-ui';

export default {
  component: SharedUi,
  title: 'SharedUi',
} as ComponentMeta<typeof SharedUi>;

const Template: ComponentStory<typeof SharedUi> = (args) => (
  <SharedUi {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
