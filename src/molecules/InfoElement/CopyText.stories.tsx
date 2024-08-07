import React from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { Typography } from 'src/molecules';
import CopyText, { CopyTextProps } from 'src/molecules/InfoElement/CopyText';

import styled from 'styled-components';

export default {
  title: 'Deprecated/Inputs/CopyText',
  component: CopyText,
  args: {
    textToCopy: 'Some text',
  },
} as Meta;

const Container = styled.div`
  display: flex;
`;

export const Primary: StoryFn<CopyTextProps> = (args) => (
  <Container>
    <CopyText {...args}>
      <Typography>Some text</Typography>
    </CopyText>
  </Container>
);
