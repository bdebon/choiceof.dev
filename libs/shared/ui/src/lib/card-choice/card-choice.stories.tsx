import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CardChoice } from './card-choice';

export default {
  component: CardChoice,
  title: 'CardChoice',
} as ComponentMeta<typeof CardChoice>;

const Template: ComponentStory<typeof CardChoice> = (args) => (
  <CardChoice {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
