import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestStorybook } from './test-storybook';

export default {
  component: TestStorybook,
  title: 'TestStorybook',
} as ComponentMeta<typeof TestStorybook>;

const Template: ComponentStory<typeof TestStorybook> = (args) => (
  <TestStorybook {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
