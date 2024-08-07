import { Button, Menu as EDSMenu, Typography } from '@equinor/eds-core-react';

import { colors, spacings } from 'src/atoms/style';
import { Chip } from 'src/molecules/Chip/Chip';
import { Variants } from 'src/molecules/Select/Select.types';

import styled from 'styled-components';

export const VARIANT_COLORS: Record<Variants, string> = {
  warning: colors.interactive.warning__resting.rgba,
  error: colors.interactive.danger__resting.rgba,
  success: colors.interactive.success__resting.rgba,
  dirty: colors.dataviz.darkblue.darker,
} as const;

interface ContainerProps {
  $lightBackground?: boolean;
  $variant?: Variants;
  $shouldShowTopMargin?: boolean;
}

const Container = styled.div<ContainerProps>`
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 6px 8px;

  ${({ $variant }) =>
    $variant
      ? `box-shadow: inset 0 -2px 0 0 ${VARIANT_COLORS[$variant]}`
      : `box-shadow: inset 0 -1px 0 0 ${colors.text.static_icons__tertiary.rgba}`};

  ${({ $lightBackground }) =>
    $lightBackground
      ? `background-color: ${colors.ui.background__default.rgba}`
      : `background-color: ${colors.ui.background__light.rgba}`};

  &[aria-expanded='true'] {
    box-shadow: inset 0 -2px 0 0 ${colors.interactive.primary__resting.rgba};
  }

  ${({ $shouldShowTopMargin }) => $shouldShowTopMargin && `margin-top: 1rem;`};

  > label {
    left: 0;
    right: 0;
    position: absolute;
    top: -1rem;
  }

  > svg[role='progressbar'] {
    overflow: unset;
  }
  > svg:not([role='progressbar']) {
    cursor: pointer;
    &:hover {
      background: ${colors.interactive.primary__hover_alt.rgba};
      border-radius: 50%;
    }
  }

  &:has(input:disabled) {
    cursor: not-allowed;
    box-shadow: none;
    > svg:not([role='progressbar']) {
      cursor: not-allowed;
      fill: ${colors.interactive.disabled__text.rgba};
      &:hover {
        background: transparent;
      }
    }
    > label {
      color: ${colors.interactive.disabled__text.rgba};
    }
  }
`;

const Section = styled.section`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: ${spacings.x_small};
  min-height: 24px;
  input[type='search'] {
    background: transparent;
    width: 0;
    flex-grow: 1;
    padding: 0;
    font-family: 'Equinor', sans-serif;
    color: ${colors.text.static_icons__default.rgba};
    outline: none;
    border: none;
  }
  input[type='search']:disabled {
    cursor: not-allowed;
  }
  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    appearance: none;
  }
  &:has(input:disabled) {
    > p {
      color: ${colors.interactive.disabled__text.rgba};
    }
    > .amplify-combo-box-chip {
      cursor: not-allowed;
      background: ${colors.interactive.disabled__fill.rgba};
      color: ${colors.interactive.disabled__text.rgba};
      > svg {
        fill: ${colors.interactive.disabled__text.rgba};
        &:hover {
          cursor: not-allowed;
          background: none;
        }
      }
    }
  }
`;

const ClearButton = styled(Button)`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: 26px;
  width: 24px;
  height: 24px;
  svg {
    fill: ${colors.text.static_icons__secondary.rgba};
  }
  &:after {
    width: 24px;
    height: 24px;
    left: 0;
  }
`;

interface StyledChipProps {
  $tryingToRemove: boolean;
  $lightBackground?: boolean;
  className: string;
}

const StyledChip = styled(Chip)<StyledChipProps>`
  background: ${({ $tryingToRemove, $lightBackground }) => {
    if ($tryingToRemove) return colors.interactive.primary__hover_alt.rgba;
    if ($lightBackground) return colors.ui.background__light.rgba;
    return colors.ui.background__default.rgba;
  }} !important;
`;

interface CustomMenuItemProps {
  $paddedLeft?: boolean;
}

const StyledMenuItem = styled(EDSMenu.Item)<CustomMenuItemProps>`
  flex-grow: 1;
  border-radius: 2px;
  ${({ $paddedLeft }) => $paddedLeft && `margin-left: 36px`};
  padding-left: 10px;

  &:hover {
    background: none;
  }

  &:focus {
    outline: none;
    background: ${colors.interactive.primary__hover_alt.rgba};
  }

  &:focus-visible {
    background: ${colors.interactive.primary__hover_alt.rgba};
  }
`;

const MenuItemSpacer = styled.hr`
  height: calc(100% + ${spacings.medium} * 2);
  justify-self: center;
  width: ${spacings.x_large};
`;

const PlaceholderText = styled(Typography)`
  position: absolute;
  color: ${colors.text.static_icons__tertiary.rgba};
  top: calc(50%);
  transform: translate(0, -50%);
`;

const ValueText = styled(PlaceholderText)`
  color: ${colors.text.static_icons__default.rgba};
`;

const NoItemsFoundText = styled(Typography)`
  margin-left: ${spacings.medium};
`;

const StyledMenu = styled(EDSMenu)`
  max-height: 20rem;
  overflow: auto;
`;

const MenuItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${spacings.small};
`;

const SmallButton = styled(Button)`
  width: 36px;
  height: 36px;
`;

export {
  Button,
  ClearButton,
  Container,
  MenuItemSpacer,
  StyledMenu,
  NoItemsFoundText,
  PlaceholderText,
  StyledChip,
  Section,
  MenuItemWrapper,
  SmallButton,
  StyledMenuItem,
  ValueText,
};
