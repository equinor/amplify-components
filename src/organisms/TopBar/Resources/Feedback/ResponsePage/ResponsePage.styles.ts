import { tokens } from '@equinor/eds-tokens';

import { spacings } from 'src/atoms/style';
import { Typography } from 'src/molecules';

import styled from 'styled-components';
const { colors } = tokens;

export const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  p {
    font-weight: 500;
  }
`;

export const SlackRequestsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${spacings.medium};
  gap: ${spacings.large};
  margin-left: ${spacings.large};
`;

export const ErrorText = styled(Typography)`
  align-self: flex-end;
  color: ${colors.interactive.warning__text.rgba};
  font-size: 16px;
  font-weight: 500;
  text-align: end;
`;
