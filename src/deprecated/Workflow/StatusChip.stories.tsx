import { Meta, StoryFn } from '@storybook/react';

import StatusChip from 'src/deprecated/Workflow/StatusChip';
import { Typography } from 'src/molecules';

export default {
  title: 'Deprecated/Workflow/StatusChip',
  component: StatusChip,
  argTypes: {
    children: { control: 'text' },
    color: { control: 'color' },
    backgroundColor: { control: 'color' },
    width: { control: 'text' },
  },
  args: {
    width: '200px',
    children: 'Draft',
    color: '#004088',
    backgroundColor: '#D5EAF4',
  },
} as Meta;

export const Primary: StoryFn = (args) => (
  <StatusChip {...args} style={{ width: args.width as number }}>
    <Typography group="ui" variant="chip__badge">
      {args.children}
    </Typography>
  </StatusChip>
);
