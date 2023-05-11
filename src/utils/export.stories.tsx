import { Meta, StoryFn } from '@storybook/react';

import UtilStory from './UtilStory';

export default {
  title: 'Other/Utils/Export',
} as Meta;

export const ExportComponent: StoryFn = () => {
  const codeText = `
  exportComponent(
    node: RefObject<HTMLElement>,
    backgroundColor?: string)
  => Image of node (with background color) to clipboard
  `;
  return <UtilStory name="exportComponent" codeText={codeText} />;
};
