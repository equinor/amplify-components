import { FC, useMemo, useState } from 'react';
import { FileWithPath } from 'react-dropzone';

import { useMutation } from '@tanstack/react-query';

import {
  FeedbackContentType,
  FeedbackEnum,
  SeverityOption,
} from './FeedbackForm.types';
import {
  createServiceNowDescription,
  createSlackMessage,
} from './FeedbackForm.utils';
import FeedbackFormInner from './FeedbackFormInner';
import { ServiceNowIncidentRequestDto } from 'src/api';
import { PortalService } from 'src/api/services/PortalService';
import { useAuth } from 'src/providers/AuthProvider/AuthProvider';
import { useSnackbar } from 'src/providers/SnackbarProvider';

interface FeedbackFormProps {
  onClose: () => void;
  selectedType: FeedbackEnum;
}

const FeedbackForm: FC<FeedbackFormProps> = ({ onClose, selectedType }) => {
  const { account } = useAuth();
  const userEmail = account?.username;
  const { showSnackbar } = useSnackbar();

  const [feedbackContent, setFeedbackContent] = useState<FeedbackContentType>({
    title: '',
    description: '',
    optOutEmail: false,
  });

  const { mutateAsync: slackFileUpload, isLoading: isFileUploadLoading } =
    useMutation(['slackFileUpload', feedbackContent], (formData: FormData) =>
      PortalService.fileUpload(formData)
    );

  const { mutateAsync: slackPostMessage, isLoading: isPostMessageLoading } =
    useMutation(['slackPostMessage', feedbackContent], (formData: FormData) =>
      PortalService.postmessage(formData)
    );

  const { mutateAsync: serviceNowIncident, isLoading: isServiceNowLoading } =
    useMutation(
      ['serviceNowIncident', feedbackContent],
      async (serviceNowDto: ServiceNowIncidentRequestDto) =>
        PortalService.createIncident(serviceNowDto)
    );

  const requestIsLoading = useMemo(() => {
    return isPostMessageLoading || isFileUploadLoading || isServiceNowLoading;
  }, [isFileUploadLoading, isPostMessageLoading, isServiceNowLoading]);

  const updateFeedback = (
    key: keyof FeedbackContentType,
    newValue: string | SeverityOption | FileWithPath[] | boolean
  ) => {
    setFeedbackContent({ ...feedbackContent, [key]: newValue });
  };

  const handleSave = async () => {
    try {
      if (selectedType === FeedbackEnum.BUG && userEmail) {
        const serviceNowObject: ServiceNowIncidentRequestDto = {
          configurationItem: '117499', // TODO: use individual IDs for all apps with this as a fallback for "Amplify Applications"
          title: feedbackContent.title,
          description: createServiceNowDescription(feedbackContent),
          callerEmail: userEmail,
        };
        await serviceNowIncident(serviceNowObject);
      }

      const fileFormData = new FormData();
      const contentFormData = new FormData();
      contentFormData.append(
        'comment',
        createSlackMessage(feedbackContent, selectedType, userEmail)
      );

      await slackPostMessage(contentFormData);

      if (feedbackContent.attachments && feedbackContent.attachments[0]) {
        fileFormData.append('file', feedbackContent.attachments[0]);
        await slackFileUpload(fileFormData);
      }

      showSnackbar('Report has been sent successfully');
      onClose();
    } catch (err) {
      showSnackbar('There was an error sending your report');
    }
  };

  return (
    <>
      <FeedbackFormInner
        selectedType={selectedType}
        feedbackContent={feedbackContent}
        updateFeedback={updateFeedback}
        handleSave={handleSave}
        onClose={onClose}
        requestIsLoading={requestIsLoading}
      />
    </>
  );
};

export default FeedbackForm;