import { FC, MouseEvent, ReactNode, useRef, useState } from 'react';

import { Button, Dialog, Divider, Icon } from '@equinor/eds-core-react';
import {
  arrow_back,
  file_description,
  help_outline,
  info_circle,
  move_to_inbox,
  report_bug,
  thumbs_up_down,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { environment } from '../../../../utils';
import {
  amplify_small_portal,
  amplify_tutorials,
} from '../../../Icons/AmplifyIcons';
import { EnvironmentType } from '../TopBar';
import { TopBarButton } from '../TopBar.styles';
import PortalTransit from './ApplicationTransit/PortalTransit';
import Feedback from './Feedback/Feedback';
import ReleaseNotes from './ReleaseNotesDialog/ReleaseNotes';
import Tutorial, { tutorialOptions } from './Tutorials/TutorialDialog';
import { FeedbackType } from 'src/components/Navigation/TopBar/Resources/Feedback/Feedback.types';
import ResourceMenuItem from 'src/components/Navigation/TopBar/Resources/ResourceMenuItem';
import TopBarMenu from 'src/components/Navigation/TopBar/TopBarMenu';
import { useReleaseNotes } from 'src/providers/ReleaseNotesProvider';
import { spacings } from 'src/style';

import styled from 'styled-components';

const { colors } = tokens;
const { getEnvironmentName } = environment;

const FeedbackFormDialog = styled(Dialog)`
  width: fit-content;
`;

const BackButton = styled.div`
  padding-top: ${spacings.medium};
`;

export interface ResourcesProps {
  field?: string;
  hideFeedback?: boolean;
  hideReleaseNotes?: boolean;
  children?: ReactNode;
  tutorialOptions?: tutorialOptions[];
}

export const Resources: FC<ResourcesProps> = ({
  field,
  hideFeedback = false,
  hideReleaseNotes = false,
  children,

  tutorialOptions,
}) => {
  const { open: showReleaseNotes, toggle: toggleReleaseNotes } =
    useReleaseNotes();
  const [isOpen, setIsOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [openPortal, setOpenPortal] = useState(false);
  const [openTutorials, setOpenTutorials] = useState(false);

  const buttonRef = useRef<HTMLDivElement | null>(null);
  const goToUrl = useRef<string | undefined>(undefined);

  const [feedbackType, setFeedbackType] = useState<FeedbackType | undefined>(
    undefined
  );

  const environmentName = getEnvironmentName(
    import.meta.env.VITE_ENVIRONMENT_NAME
  );

  console.log(environmentName, 'en');

  const environmentNameWithoutLocalHost =
    environmentName === EnvironmentType.LOCALHOST
      ? EnvironmentType.DEVELOP
      : environmentName;
  const closeMenu = () => {
    setIsOpen(false);
    setShowFeedback(false);
    setShowLearnMore(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleOnFeedbackClick = (event?: MouseEvent<HTMLDivElement>) => {
    setFeedbackType(event?.currentTarget.id as FeedbackType);
    closeMenu();
  };

  const handleOnReleaseNotesClick = () => {
    toggleReleaseNotes();
    closeMenu();
  };

  const handleOnDialogClose = () => {
    setFeedbackType(undefined);
    if (openPortal) {
      setOpenPortal(false);
    }
  };

  const handleFeedbackClick = () => {
    if (showFeedback) {
      setShowFeedback(false);
      setShowLearnMore(false);
    } else {
      setShowFeedback(true);
    }
  };

  const handleLearnMoreClick = () => {
    if (showLearnMore) {
      setShowLearnMore(false);
      setShowFeedback(false);
      setOpenTutorials(false);
    } else {
      setShowLearnMore(true);
    }
  };

  const handleOpenPortal = () => {
    if (openPortal) {
      setOpenPortal(false);
    } else {
      setOpenPortal(true);
      setShowLearnMore(false);
      setShowFeedback(false);
      setIsOpen(false);
    }
  };

  const handleOpenTutorials = () => {
    if (openTutorials) {
      setOpenTutorials(false);
    } else {
      setOpenTutorials(true);
    }
  };

  const handleMoreAccess = () => {
    goToUrl.current = `https://client-amplify-portal-${environmentNameWithoutLocalHost}.radix.equinor.com/dashboard`;
  };

  return (
    <>
      <TopBarButton
        variant="ghost_icon"
        ref={buttonRef}
        id="anchor-match"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="menu-match"
        onClick={toggleMenu}
        $isSelected={isOpen}
      >
        <Icon
          data={help_outline}
          color={colors.interactive.primary__resting.rgba}
        />
      </TopBarButton>

      <TopBarMenu
        open={isOpen}
        title="Resources"
        onClose={closeMenu}
        anchorEl={buttonRef.current}
      >
        {!hideReleaseNotes && !showFeedback && !showLearnMore && (
          <ResourceMenuItem
            id="release-notes"
            icon={file_description}
            onClick={handleOnReleaseNotesClick}
            text="Open release notes"
          />
        )}
        {!hideFeedback && (
          <>
            {!showFeedback && !showLearnMore && (
              <ResourceMenuItem
                text="Submit feedback"
                icon={thumbs_up_down}
                onClick={handleFeedbackClick}
              />
            )}

            {showFeedback && (
              <>
                <ResourceMenuItem
                  id={FeedbackType.BUG}
                  onClick={handleOnFeedbackClick}
                  icon={report_bug}
                  text="Report a bug"
                  lastItem
                />
                <ResourceMenuItem
                  id={FeedbackType.SUGGESTION}
                  onClick={handleOnFeedbackClick}
                  icon={move_to_inbox}
                  text="Suggest a idea"
                  lastItem
                />
                <BackButton>
                  <Button variant="outlined" onClick={handleFeedbackClick}>
                    <Icon data={arrow_back} /> Back
                  </Button>
                </BackButton>
              </>
            )}
          </>
        )}
        {!showLearnMore && !showFeedback && (
          <ResourceMenuItem
            text="Learn more"
            icon={info_circle}
            onClick={handleLearnMoreClick}
          />
        )}
        {openTutorials && tutorialOptions && (
          <Tutorial
            options={tutorialOptions}
            open={openTutorials}
            onClose={handleOpenTutorials}
          />
        )}
        {showLearnMore && (
          <>
            {!openTutorials && (
              <>
                <ResourceMenuItem
                  text="Open Application portal"
                  icon={amplify_small_portal}
                  onClick={handleOpenPortal}
                  lastItem
                />
                <ResourceMenuItem
                  text="Tutorials"
                  icon={amplify_tutorials}
                  onClick={handleOpenTutorials}
                  lastItem
                />
                {/*// TODO: Remove children when PWEX has change layout in topbar */}
                {children && !hideFeedback && !hideReleaseNotes && (
                  <Divider style={{ margin: 0 }} />
                )}
                {children && <div onClick={closeMenu}>{children}</div>}
              </>
            )}

            <BackButton>
              <Button variant="outlined" onClick={handleLearnMoreClick}>
                <Icon data={arrow_back} /> Back
              </Button>
            </BackButton>
          </>
        )}
      </TopBarMenu>
      {showReleaseNotes && <ReleaseNotes />}
      {!hideFeedback && feedbackType !== undefined && (
        <FeedbackFormDialog
          open={
            feedbackType === FeedbackType.BUG ||
            feedbackType === FeedbackType.SUGGESTION
          }
          onClose={handleOnDialogClose}
          isDismissable={true}
        >
          <Dialog.Header>
            {feedbackType === FeedbackType.BUG
              ? 'Report a bug - ServiceNow'
              : 'Suggest a feature'}
          </Dialog.Header>
          <Feedback
            field={field}
            selectedType={feedbackType}
            onClose={handleOnDialogClose}
          />
        </FeedbackFormDialog>
      )}

      {openPortal && (
        <PortalTransit
          open={openPortal}
          onClose={handleOpenPortal}
          onClick={handleMoreAccess}
        />
      )}
    </>
  );
};