import { FileWithPath } from 'react-dropzone';

import { EnvironmentType } from '../../TopBar';
import {
  FeedbackContentType,
  FeedbackType,
  UrgencyOption,
} from './Feedback.types';
import { ServiceNowUrgency } from 'src/api';
import { date, environment } from 'src/utils';

const { formatDate } = date;
const { getAppName, getEnvironmentName } = environment;

const getSeverityEmoji = (feedbackContent: FeedbackContentType) => {
  if (feedbackContent.urgency === UrgencyOption.NO_IMPACT) {
    return ':large_yellow_circle:';
  }
  if (feedbackContent.urgency === UrgencyOption.IMPEDES) {
    return ':large_orange_circle:';
  }
  return ':red_circle:';
};

export const readUploadedFileAsText = (
  inputFile: FileWithPath
): Promise<string> => {
  const temporaryFileReader = new FileReader();

  /* c8 ignore start */ // Rejection files not working
  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };
    /* c8 ignore end */
    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result as string);
    };
    temporaryFileReader.readAsDataURL(inputFile);
  });
};

export const getUrgencyNumber = (urgency: UrgencyOption) => {
  switch (urgency) {
    case UrgencyOption.UNABLE:
      return ServiceNowUrgency.CRITICAL;
    case UrgencyOption.IMPEDES:
      return ServiceNowUrgency.MODERATE;
    case UrgencyOption.NO_IMPACT:
      return ServiceNowUrgency.NORMAL;
  }
};

export const createServiceNowDescription = (
  feedbackContent: FeedbackContentType
) => {
  const locationText = `Url location of bug: ${feedbackContent.url} \n`;
  const severityText = `Severity of bug: ${feedbackContent.urgency} \n`;

  return `${feedbackContent.url ? locationText : ''}${
    feedbackContent.urgency ? severityText : ''
  }${feedbackContent.description}`;
};

export const createServiceNowURL = (sysId: string) => {
  const environment = getEnvironmentName(import.meta.env.VITE_ENVIRONMENT_NAME);
  if (sysId.length === 0) return '';
  // if (environment === EnvironmentType.PRODUCTION) {
  //   return `https://equinor.service-now.com/now/nav/ui/classic/params/target/incident.do%3Fsys_id%${sysId}`;
  // }
  return `https://equinor${
    environment === EnvironmentType.PRODUCTION ? '' : 'test'
  }.service-now.com/now/nav/ui/classic/params/target/incident.do%3Fsys_id${sysId}`;
};

export const createSlackMessage = (
  feedbackContent: FeedbackContentType,
  selectedType: FeedbackType | undefined,
  email: string | undefined
) => {
  const isBugReport = selectedType === FeedbackType.BUG;
  const typeText = isBugReport ? ':bug: Bug report' : ':bulb: Suggestion';

  const dateAndUrlSectionArray = [];
  const titleAndSeveritySectionArray = [];

  titleAndSeveritySectionArray.push({
    type: 'mrkdwn',
    text: `*Title* \n ${feedbackContent.title}`,
  });
  dateAndUrlSectionArray.push({
    type: 'mrkdwn',
    text: ` ${formatDate(new Date(), {
      format: 'DD. month YYYY',
    })}`,
  });

  if (feedbackContent.url) {
    dateAndUrlSectionArray.push({
      type: 'mrkdwn',
      text: `*<${feedbackContent.url}|Error URL>*`,
    });
  }

  if (feedbackContent.urgency) {
    titleAndSeveritySectionArray.push({
      type: 'mrkdwn',
      text: `*Severity* \n ${getSeverityEmoji(feedbackContent)} ${
        feedbackContent.urgency
      }`,
    });
  }

  return JSON.stringify([
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: typeText,
        emoji: true,
      },
    },
    {
      type: 'section',
      fields: dateAndUrlSectionArray,
    },
    {
      type: 'section',
      fields: titleAndSeveritySectionArray,
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: '*Application* \n ' + getAppName(import.meta.env.VITE_NAME),
        },
        {
          type: 'mrkdwn',
          text: `*User* \n ${email}`,
        },
      ],
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Description* \n' + feedbackContent.description,
      },
    },
    {
      type: 'divider',
    },
  ]);
};