import { useState } from 'react';

import { Story } from '@storybook/react';

import Stepper, { StepperProps } from './Stepper';

import styled from 'styled-components';

export default {
  title: 'Feedback/Stepper',
  component: Stepper,
  argTypes: {
    current: { control: 'number' },
    setCurrent: { action: 'Called setCurrent' },
    steps: { control: 'array' },
  },
  args: {
    current: 0,
    steps: ['Select conveyance', 'Select provider', 'Select service'],
  },
};

const Container = styled.div`
  width: fit-content;
  height: 100vh;
  display: flex;
  margin: 0 auto;
`;

export const Primary: Story<StepperProps> = (args) => {
  return (
    <Container>
      <Stepper {...args} />{' '}
    </Container>
  );
};
