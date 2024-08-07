import { tokens } from '@equinor/eds-tokens';
import { Template } from 'src/organisms/Template/Template';

import { darkTokens } from 'src/atoms/style/darkTokens';
import { spacingTokens } from 'src/atoms/style/spacingTokens';
import { SnackbarProvider } from 'src/providers/SnackbarProvider';
import { Preview, StoryFn } from '@storybook/react';

const { colors } = tokens;

const globalTypes = {
  dataThemes: {
    defaultValue: {
      list: [
        { name: 'Light', dataTheme: 'light', color: '#FFFFFF' },
        { name: 'Dark', dataTheme: 'dark', color: '#243746' },
      ],
    },
  },
};

const decorators = [
  (Story: StoryFn) => {
    // Apply styles using the darkTokens variable
    const darkStyleElement = document.createElement('style');
    darkStyleElement.innerHTML = darkTokens;
    document.head.appendChild(darkStyleElement);

    const spacingStyleElement = document.createElement('style');
    spacingStyleElement.innerHTML = spacingTokens;
    document.head.appendChild(spacingStyleElement);

    return (
      <>
        <Template.GlobalStyles />
        <SnackbarProvider>
          <Story />
        </SnackbarProvider>
      </>
    );
  },
];

const parameters = {
  actions: { argTypes: /^on[A-Z].*/ },
  viewMode: 'docs',
  controls: { expanded: true },
  backgrounds: {
    default: 'Equinor UI Light (off-white/off-dark)',
    values: [
      {
        name: 'Equinor UI Light (off-white/off-dark)',
        value: colors.ui.background__light.rgba,
      },
      {
        name: 'Equinor UI Default (white/dark)',
        value: colors.ui.background__default.rgba,
      },
    ],
  },
  options: {
    storySort: {
      // Pre-emptively added 'Atoms', 'Molecules' and 'Organisms'
      order: ['Atoms', 'Molecules', 'Organisms', 'Other', 'Deprecated'],
    },
  },
};

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes,
  decorators,
  parameters,
};

export default preview;
