import { ChangeEvent, FC } from 'react';
import { FileWithPath } from 'react-dropzone';

import { Checkbox, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { FeedbackContentType } from 'src/components/Navigation/TopBar/Help/FeedbackForm/FeedbackForm.types';
import { SeverityOption } from 'src/components/Navigation/TopBar/Help/FeedbackForm/FeedbackFormInner';

import styled from 'styled-components';

const { spacings, colors } = tokens;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacings.comfortable.small};
`;

interface TextProps {
  disabled: boolean;
}

const Text = styled(Typography)<TextProps>`
  color: ${({ disabled }) =>
    disabled
      ? colors.interactive.disabled__text.hex
      : colors.text.static_icons__default.hex};
`;

interface FilePrivacyCheckboxProps {
  feedbackContent: FeedbackContentType;
  updateFeedback: (
    key: keyof FeedbackContentType,
    newValue: string | SeverityOption | FileWithPath[] | boolean
  ) => void;
  hasAttachment: boolean;
}
const FilePrivacyCheckbox: FC<FilePrivacyCheckboxProps> = ({
  feedbackContent,
  updateFeedback,
  hasAttachment,
}) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateFeedback('filePrivacyConsent', e.target.checked);
  };

  return (
    <Container>
      <Checkbox
        data-testid="consent_checkbox"
        checked={feedbackContent.filePrivacyConsent}
        disabled={!hasAttachment}
        onChange={handleOnChange}
      />
      <Text variant="body_short" disabled={!hasAttachment}>
        I confirm that the images included as attachments do not contain private
        information. <br />
        (Equinor email and shortname is allowed)
      </Text>
    </Container>
  );
};

export default FilePrivacyCheckbox;
