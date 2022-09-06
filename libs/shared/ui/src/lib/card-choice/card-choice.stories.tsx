import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CardChoice } from './card-choice';
import { questions } from "../../../../assets/src";

const question = questions

export default {
  component: CardChoice,
  title: 'CardChoice',
} as ComponentMeta<typeof CardChoice>;

const Template: ComponentStory<typeof CardChoice> = (args) => (
  <CardChoice {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  title: question[0].choiceLeft.title,
  img_url: question[0].choiceLeft.img_path
};
