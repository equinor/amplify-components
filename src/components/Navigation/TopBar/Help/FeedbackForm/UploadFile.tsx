import { FC, useState } from 'react';
import { FileRejection, FileWithPath } from 'react-dropzone';

import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { FeedbackContentType, SeverityOption } from './FeedbackForm.types';
import FileProgress from 'src/components/Feedback/Progress/FileProgress';
import FileUploadArea from 'src/components/Inputs/FileUploadArea';

import styled from 'styled-components';

const { spacings, colors } = tokens;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FileUploadAreaWrapper = styled.div`
  position: relative;
  top: -10px;
`;

const FilesUploadedList = styled.div``;

const LabelAndMeta = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 10px;
  margin: 0 ${spacings.comfortable.small};
  > p {
    color: ${colors.text.static_icons__tertiary.hex};
  }
`;

interface UploadFileProps {
  feedbackContent: FeedbackContentType;
  updateFeedback: (
    key: keyof FeedbackContentType,
    newValue: string | SeverityOption | FileWithPath[]
  ) => void;
}

const UploadFile: FC<UploadFileProps> = ({
  feedbackContent,
  updateFeedback,
}) => {
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
  const onDrop = async (
    acceptedFiles: FileWithPath[],
    fileRejections: FileRejection[]
  ) => {
    if (acceptedFiles.length >= 1) {
      const cleanedOfHiddenFiles = acceptedFiles.filter(
        (file) => file.name[0] !== '.'
      );
      const reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);
      updateFeedback('attachments', cleanedOfHiddenFiles);
    }
    setRejectedFiles(fileRejections);
  };

  const handleOnDelete = (file: FileWithPath) => {
    const newAttachmentsList =
      feedbackContent.attachments?.filter(
        (attachment) =>
          /* c8 ignore start */ // TODO: Fix coverage for rejected files. user.upload doesnt send the rejected files to onDrop
          attachment.name !== file.name && attachment.size !== file.size
      ) ?? [];
    /* c8 ignore end */

    updateFeedback('attachments', newAttachmentsList);
  };

  /* c8 ignore start */
  const handleOnDeleteRejected = (rejection: FileRejection) => {
    setRejectedFiles(
      rejectedFiles?.filter(
        (attachment) =>
          attachment.file.name === rejection.file.name &&
          attachment.file.size !== rejection.file.size
      ) ?? []
    );
  };
  /* c8 ignore end */

  return (
    <Wrapper>
      <FileUploadAreaWrapper className="test">
        <LabelAndMeta>
          <Typography group="input" variant="label">
            Attachments
          </Typography>
          <Typography group="input" variant="label">
            optional
          </Typography>
        </LabelAndMeta>
        <FileUploadArea
          onDrop={onDrop}
          accept={{
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
          }}
        />
      </FileUploadAreaWrapper>
      <FilesUploadedList>
        {feedbackContent.attachments?.map((file) => {
          return (
            <FileProgress
              key={file.name + file.size}
              name={file.name}
              onDelete={() => handleOnDelete(file)}
              onAbort={() => null}
            />
          );
        })}
        {rejectedFiles.map((rejection) => {
          /* c8 ignore start */
          return (
            <FileProgress
              key={rejection.file.name + rejection.file.size}
              name={rejection.file.name}
              onDelete={() => handleOnDeleteRejected(rejection)}
              onAbort={() => null}
              error={true}
              errorMsg={
                rejection.errors[0].code + ' - ' + rejection.errors[0].message
              }
            />
          );
          /* c8 ignore end */
        })}
      </FilesUploadedList>
    </Wrapper>
  );
};

export default UploadFile;