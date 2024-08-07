import { Input, Label, LabelProps } from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react';

import page from 'src/deprecated/Label/Label.docs.mdx';

const meta: Meta<typeof Label> = {
  title: 'Deprecated/Label',
  component: Label,
  parameters: {
    docs: {
      page,
    },
  },
  args: {
    label: "I'm a label!",
  },
};

export default meta;

export const Introduction: StoryFn<LabelProps> = (args) => <Label {...args} />;

export const WithMeta: StoryFn<LabelProps> = () => (
  <Label label="Speed" meta="km/h" />
);
WithMeta.storyName = 'With meta text';

export const Disabled: StoryFn<LabelProps> = () => (
  <Label
    label="I'm disabled, that means I belong to a disabled input field"
    disabled
  />
);

export const Accessiblity: StoryFn<LabelProps> = () => {
  // To wrap the input component inside the label element is not yet supported
  return (
    <>
      <Label label="I use the htmlFor prop" htmlFor="speed" />
      <Input type="text" id="speed" />
    </>
  );
};
