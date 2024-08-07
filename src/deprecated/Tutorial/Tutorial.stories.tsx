import { Meta, StoryFn } from '@storybook/react';

import TutorialStoryComponent from 'src/deprecated/Tutorial/stories/TutorialStoryComponent';
import Tutorial, {
  Step,
  TutorialProps,
} from 'src/deprecated/Tutorial/Tutorial';
import { Typography } from 'src/molecules';
import { TutorialStepsProvider } from 'src/providers';

export default {
  title: 'Deprecated/Tutorial',
  component: Tutorial,
} as Meta;

const steps: Step[] = [
  {
    key: 'step-one',
    title: 'Field',
    body: (
      <Typography group="table" variant="cell_text">
        Please insert field name.
      </Typography>
    ),
    button: 'Next',
  },
  {
    key: 'step-two',
    title: 'Select wellbore',
    body: (
      <Typography group="table" variant="cell_text">
        Select the desired wellbore
      </Typography>
    ),
    button: 'Next',
  },
  {
    key: 'last-step',
    title: 'Save',
    body: (
      <Typography group="table" variant="cell_text">
        Click on Save button to save your changes.
      </Typography>
    ),
    button: 'Done',
  },
];

const Template: StoryFn<TutorialProps> = (args) => {
  return (
    <TutorialStepsProvider>
      <TutorialStoryComponent {...args} />
    </TutorialStepsProvider>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  steps: steps,
  tutorialTitle: 'Get started!',
  tutorialIntro: "Let's start a tutorial for this form.",
};
