import { exit_to_app } from '@equinor/eds-icons';
import { StoryFn } from '@storybook/react';

import {
  ExpandableIconButtonProps,
  ExpandingIconButton,
} from './ExpandingIconButton';

import styled from 'styled-components';

export default {
  title: 'Inputs/ExpandingIconButton',
  component: ExpandingIconButton,
  argTypes: {
    text: { control: 'text' },
  },
  args: {
    text: 'Exit calculator mode',
  },
};

type StoryProps = Omit<ExpandableIconButtonProps, 'icon'>;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Primary: StoryFn<StoryProps> = (args) => {
  return (
    <Wrapper>
      <ExpandingIconButton {...args} icon={exit_to_app} />
    </Wrapper>
  );
};

export const IconPositionRight: StoryFn<StoryProps> = (args) => {
  return (
    <Wrapper>
      <ExpandingIconButton
        {...args}
        icon={exit_to_app}
        iconPosition={'right'}
      />
    </Wrapper>
  );
};
