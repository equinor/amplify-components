import { Button, Card, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors } = tokens;

interface InfoCardTypes {
  title?: string;
  description?: string;
  url?: string;
  urlTitle?: string;
}

const SBCard = styled(Card)`
  border: 1px solid ${colors.infographic.primary__moss_green_100.rgba};
  max-width: 490px;
`;

export const InfoCard = ({
  title,
  description,
  url,
  urlTitle,
}: InfoCardTypes) => (
  <SBCard>
    <Card.Header>
      <Card.HeaderTitle>
        <Typography variant="h5">{title}</Typography>
      </Card.HeaderTitle>
    </Card.Header>
    <Card.Content>
      <Typography variant="body_short">{description}</Typography>
    </Card.Content>
    <Card.Actions>
      <Button href={url} variant="outlined">
        {urlTitle}
      </Button>
    </Card.Actions>
  </SBCard>
);
