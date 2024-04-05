import { forwardRef } from 'react';

import { ChipProps as EdsChipProps } from '@equinor/eds-core-react';

import { StyledChip } from './Chip.styles';

type ChipProps = EdsChipProps & {
  readonly?: boolean;
};

export const Chip = forwardRef<HTMLDivElement, ChipProps>((props, ref) => {
  const { readonly, ...rest } = props;

  return <StyledChip ref={ref} {...rest} $readonly={readonly} />;
});

Chip.displayName = 'Chip';
