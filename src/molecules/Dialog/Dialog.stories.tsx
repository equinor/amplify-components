import { ComponentType, useState } from 'react';

import {
  Button,
  Dialog,
  DialogProps,
  Radio,
  Typography,
} from '@equinor/eds-core-react';
import { useArgs } from '@storybook/preview-api';
import { Meta, StoryFn } from '@storybook/react';

import page from 'src/molecules/Dialog/Dialog.docs.mdx';
import { Stack } from 'src/storybook';

import styled from 'styled-components';

const meta: Meta<typeof Dialog> = {
  title: 'Molecules/Dialog',
  component: Dialog,
  args: {
    open: false,
    isDismissable: false,
  },
  subcomponents: {
    Header: Dialog.Header as ComponentType<unknown>,
    Title: Dialog.Title as ComponentType<unknown>,
    CustomContent: Dialog.CustomContent as ComponentType<unknown>,
    Actions: Dialog.Actions as ComponentType<unknown>,
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?type=design&node-id=3009-34034&mode=design&t=jlQAMMWK1GLpzcAL-4',
    },
    docs: {
      page,
      source: {
        excludeDecorators: true,
        type: 'code',
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <Stack>
          <Story />
        </Stack>
      );
    },
  ],
};

export default meta;

const Wrapper = styled.div`
  display: grid;
  column-gap: 16px;
  grid-template-columns: repeat(2, auto);
  justify-content: end;
  justify-self: end;
`;

const RadioWrapper = styled(Radio)`
  display: flex;
`;

const Placeholder = styled.div`
  background: rgba(255, 146, 0, 0.15);
  border: 1px dashed #ff9200;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  display: inline-block;
`;

export const Introduction: StoryFn<DialogProps> = (args) => {
  const { open, isDismissable } = args;
  const [, updateArgs] = useArgs();
  const handleClose = () => {
    updateArgs({ open: false });
  };
  const handleOpen = () => {
    updateArgs({ open: true });
  };
  return (
    <>
      <Button aria-haspopup="dialog" onClick={handleOpen}>
        Trigger Dialog
      </Button>
      <Dialog open={open} onClose={handleClose} isDismissable={isDismissable}>
        <Dialog.Header>
          <Dialog.Title>Title</Dialog.Title>
        </Dialog.Header>
        <Dialog.CustomContent>
          <Typography variant="body_short">Small description here.</Typography>
        </Dialog.CustomContent>
        <Dialog.Actions>
          <Wrapper>
            <Button onClick={handleClose}>OK</Button>
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
          </Wrapper>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

export const Dismissable: StoryFn<DialogProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Button aria-haspopup="dialog" onClick={handleOpen}>
        Trigger Dialog
      </Button>
      <Dialog open={isOpen} isDismissable onClose={handleClose}>
        <Dialog.Header>
          <Dialog.Title>Dismissable dialog</Dialog.Title>
        </Dialog.Header>
        <Dialog.CustomContent>
          <Typography variant="body_short">
            Closes dialog on click outside and escape key.
          </Typography>
        </Dialog.CustomContent>
        <Dialog.Actions>
          <Wrapper>
            <Button onClick={handleClose}>OK</Button>
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
          </Wrapper>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

export const TextPlusAction: StoryFn<DialogProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Button aria-haspopup="dialog" onClick={handleOpen}>
        Trigger Dialog
      </Button>
      <Dialog open={isOpen}>
        <Dialog.Header>
          <Dialog.Title>Text + actions</Dialog.Title>
        </Dialog.Header>
        <Dialog.CustomContent>
          <Typography variant="body_short">Small description here.</Typography>
        </Dialog.CustomContent>
        <Dialog.Actions>
          <Wrapper>
            <Button onClick={handleClose}>OK</Button>
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
          </Wrapper>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};
TextPlusAction.storyName = 'Text plus action';

export const PlaceholderPlusAction: StoryFn<DialogProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button aria-haspopup="dialog" onClick={handleOpen}>
        Trigger Dialog
      </Button>
      <Dialog open={isOpen}>
        <Dialog.Header>
          <Dialog.Title>Placeholder + actions</Dialog.Title>
        </Dialog.Header>
        <Dialog.CustomContent>
          <Placeholder>Custom content</Placeholder>
        </Dialog.CustomContent>
        <Dialog.Actions>
          <Wrapper>
            <Button onClick={handleClose}>OK</Button>
            <Button onClick={handleClose} variant="ghost">
              Cancel
            </Button>
          </Wrapper>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};
PlaceholderPlusAction.storyName = 'Placeholder plus action';

export const PlaceholderOnly: StoryFn<DialogProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Button aria-haspopup="dialog" onClick={handleOpen}>
        Trigger Dialog
      </Button>
      <Dialog open={isOpen} isDismissable onClose={handleClose}>
        <Dialog.Header>
          <Dialog.Title>View options</Dialog.Title>
        </Dialog.Header>
        <Dialog.CustomContent scrollable>
          <RadioWrapper label="Down" name="first" />
          <RadioWrapper label="Up" defaultChecked name="second" />
        </Dialog.CustomContent>
      </Dialog>
    </>
  );
};
PlaceholderOnly.storyName = 'Placeholder only';

export const ScrollablePlusActions: StoryFn<DialogProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Button aria-haspopup="dialog" onClick={handleOpen}>
        Trigger Dialog
      </Button>
      <Dialog open={isOpen}>
        <Dialog.Header>
          <Dialog.Title>Scrollable + actions</Dialog.Title>
        </Dialog.Header>
        <Dialog.CustomContent scrollable>
          <Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Accusantium architecto suscipit laboriosam, nisi quas omnis iusto
            nam incidunt. Mollitia aliquid alias explicabo dolorum molestias
            nostrum il
          </Typography>
          <Typography>
            lum vel rem assumenda ea! Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Quo repellendus at eligendi voluptas, eos omnis
            sunt consequatur nam facilis velit veritatis quibusdam dicta
            voluptate, labore soluta deserunt, odio enim alias.
          </Typography>
        </Dialog.CustomContent>
        <Dialog.Actions>
          <Wrapper>
            <Button onClick={handleClose}>OK</Button>
            <Button onClick={handleClose} variant="ghost">
              Cancel
            </Button>
          </Wrapper>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};
ScrollablePlusActions.storyName = 'Scrollable plus actions';

export const NoTitle: StoryFn<DialogProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Button aria-haspopup="dialog" onClick={handleOpen}>
        Trigger Dialog
      </Button>
      <Dialog open={isOpen}>
        <Dialog.CustomContent>
          <Typography variant="body_short">Small description here.</Typography>
        </Dialog.CustomContent>
        <Dialog.Actions>
          <Wrapper>
            <Button onClick={handleClose}>OK</Button>
            <Button onClick={handleClose} variant="ghost">
              Cancel
            </Button>
          </Wrapper>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};
NoTitle.storyName = 'No title';
