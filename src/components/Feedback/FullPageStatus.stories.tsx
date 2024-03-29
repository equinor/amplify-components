import { Meta, StoryFn } from '@storybook/react';

import FullPageStatus, { FullPageStatusProps } from './FullPageStatus';

export default {
  title: 'Feedback/FullPageStatus',
  component: FullPageStatus,
} as Meta;

const Template: StoryFn<FullPageStatusProps> = (args) => (
  <FullPageStatus {...args} />
);

export const Primary = Template.bind({});
Primary.args = { loading: true, error: true, errorMessage: 'ERROR' };
