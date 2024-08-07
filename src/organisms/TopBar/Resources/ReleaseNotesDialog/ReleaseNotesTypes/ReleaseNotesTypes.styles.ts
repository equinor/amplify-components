import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { spacings } from 'src/atoms/style';

import styled from 'styled-components';

const { shape, colors } = tokens;

const StyledChipButton = styled(Button)`
  border-radius: ${shape.rounded.borderRadius};
  color: ${colors.text.static_icons__default.rgba};
  background: ${colors.ui.background__light.rgba};
  border: 1px solid ${colors.ui.background__medium.rgba};
  padding: ${spacings.x_small} ${spacings.small};
  height: auto;

  span > p {
    color: ${colors.text.static_icons__default.rgba};
    line-height: normal;
    height: min-content;
    font-size: 12px;
  }

  &:hover {
    background: ${colors.ui.background__medium.rgba};
    border-radius: ${shape.rounded.borderRadius};
    color: ${colors.interactive.primary__hover.rgba};
  }
`;

const StyledChip = styled.div`
  display: flex;
  align-items: center;
  grid-gap: ${spacings.small};
  border-radius: ${shape.rounded.borderRadius};
  height: auto;
  background-color: ${colors.ui.background__light.rgba};
  color: ${colors.text.static_icons__default.rgba};
  padding: ${spacings.x_small} ${spacings.small};

  > p {
    line-height: normal;
    height: min-content;
    font-size: 12px;
  }
`;

interface DotProps {
  $dotColor: string;
}

const Dot = styled.span<DotProps>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ $dotColor }) => $dotColor};
  position: relative;
`;

export { Dot, StyledChip, StyledChipButton };
