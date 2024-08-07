import { Meta, StoryFn } from '@storybook/react';

import EditableField, {
  EditableFieldProps,
} from 'src/deprecated/EditableField';

export default {
  title: 'Deprecated/EditableField',
  component: EditableField,
  argTypes: {
    editable: { control: 'boolean' },
    value: { control: 'text' },
  },
  args: {
    editable: true,
    value: 'Initial value',
  },
} as Meta;

const Template: StoryFn<EditableFieldProps> = (args) => (
  <EditableField {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
