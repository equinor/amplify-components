import { Icon } from '@equinor/eds-core-react';
import type { IconData } from '@equinor/eds-icons';
import { Meta, StoryFn } from '@storybook/react';

import {
  amplify_failure,
  amplify_lwd,
  amplify_success,
  amplify_wellbore,
  amplify_wireline_cased_hole,
  amplify_wireline_open_hole,
} from 'src/atoms/icons/drilling';
import {
  amplify_calculator,
  amplify_overlay,
  amplify_sidebyside,
} from 'src/atoms/icons/map';
import {
  amplify_aml,
  amplify_branch,
  amplify_info_small,
  amplify_merged,
  amplify_overview,
  amplify_resources,
  amplify_sharepoint,
  amplify_shield_person,
  amplify_small_portal,
  amplify_snail,
  amplify_sort_small,
  amplify_tutorials,
} from 'src/atoms/icons/other';
import {
  amplify_h1,
  amplify_h2,
  amplify_h3,
  amplify_h4,
} from 'src/atoms/icons/wysiwyg';

const allIcons: Record<string, IconData> = {
  amplify_wellbore: amplify_wellbore,
  amplify_wireline_open_hole: amplify_wireline_open_hole,
  amplify_wireline_cased_hole: amplify_wireline_cased_hole,
  amplify_lwd: amplify_lwd,
  amplify_aml: amplify_aml,
  amplify_success: amplify_success,
  amplify_failure: amplify_failure,
  amplify_snail: amplify_snail,
  amplify_h1: amplify_h1,
  amplify_h2: amplify_h2,
  amplify_tutorials: amplify_tutorials,
  amplify_small_portal: amplify_small_portal,
  amplify_h3: amplify_h3,
  amplify_h4: amplify_h4,
  amplify_sharepoint: amplify_sharepoint,
  amplify_sort_small: amplify_sort_small,
  amplify_info_small: amplify_info_small,
  amplify_resources: amplify_resources,
  amplify_overview: amplify_overview,
  amplify_shield_person: amplify_shield_person,
  amplify_merged: amplify_merged,
  amplify_branch: amplify_branch,
  amplify_sidebyside: amplify_sidebyside,
  amplify_overlay: amplify_overlay,
  amplify_calculator: amplify_calculator,
};

interface StoryFnProps {
  data: string;
  size: 16 | 18 | 24 | 32 | 40 | 48 | undefined;
  color?: string;
  rotation: 0 | 90 | 180 | 270;
}

const meta: Meta = {
  title: 'Atoms/AmplifyIcons',
  component: Icon,
  argTypes: {
    color: {
      control: 'color',
    },
    size: { control: 'radio', options: [16, 18, 24, 32, 40, 48, 96] },
    rotation: { control: 'radio', options: [0, 90, 180, 270] },
    data: {
      control: 'radio',
      options: [
        'amplify_wellbore',
        'amplify_wireline_open_hole',
        'amplify_wireline_cased_hole',
        'amplify_lwd',
        'amplify_aml',
        'amplify_success',
        'amplify_failure',
        'amplify_snail',
        'amplify_h1',
        'amplify_h2',
        'amplify_h3',
        'amplify_h4',
        'amplify_sharepoint',
        'amplify_tutorials',
        'amplify_small_portal',
        'amplify_sort_small',
        'amplify_info_small',
        'amplify_resources',
        'amplify_overview',
        'amplify_shield_person',
        'amplify_merged',
        'amplify_branch',
        'amplify_sidebyside',
        'amplify_overlay',
        'amplify_calculator',
      ],
    },
  },
  args: {
    data: 'amplify_wellbore',
    color: '#007979',
    size: 96,
    rotation: 0,
  },
};

export default meta;

export const Primary: StoryFn<StoryFnProps> = (args) => {
  return (
    <Icon
      size={args.size}
      color={args.color}
      data={allIcons[args.data]}
      fillRule="nonzero"
      rotation={args.rotation}
    />
  );
};
