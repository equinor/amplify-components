import { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { AccountInfo } from '@azure/msal-browser';
import {
  ServiceNowIncidentResponse,
} from '@equinor/subsurface-app-management';
import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { DEFAULT_REQUEST_ERROR_MESSAGE } from './Feedback/Feedback.const';
import { FeedbackContentType, UrgencyOption } from './Feedback/Feedback.types';
import { tutorialOptions } from './Tutorials/TutorialInfoDialog';
import { Resources } from './Resources';
import { environment } from 'src/atoms/utils';
import { AuthProvider, SnackbarProvider } from 'src/providers';
import { ReleaseNotesProvider } from 'src/providers/ReleaseNotesProvider';
import {
  act,
  render,
  screen,
  userEvent,
  waitFor,
  within,
} from 'src/tests/test-utils';

import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { beforeEach, describe, expect } from 'vitest';

const { PORTAL_URL_WITHOUT_LOCALHOST } = environment;

const releaseNotes = [
  {
    releaseId: '221d87d1-7aef-4be5-a0c6-15cb73e3fwefa2',
    applicationName: 'PWEX',
    version: null,
    title: 'Improved task board and reporting overview June',
    body: '<p>Release notes body text</p>',
    tags: ['Improvement', 'Bug fix'],
    createdDate: '2023-06-29T10:48:49.6883+00:00',
  },
];

vi.mock('@azure/msal-react', () => ({
  MsalProvider: (children: ReactElement) => <div>{children}</div>,
}));

vi.mock('@azure/msal-browser', () => {
  return {
    PublicClientApplication: class PublicClientApplication {
      constructor() {
        console.log('created');
      }
    },
    AccountInfo: { username: 'mock' } as AccountInfo,
  };
});

function Wrappers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReleaseNotesProvider>
          <SnackbarProvider>{children}</SnackbarProvider>
        </ReleaseNotesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const waitForMS = (timeout: number) => {
  return new Promise((r) => setTimeout(r, timeout));
};

function fakeImageFile(bad = false) {
  const extension = bad ? '.tiff' : '.png';
  return new File([faker.lorem.sentence()], faker.word.noun() + extension);
}

const createRegexToGetAttachment = (fileName: string) => {
  const split = fileName.split('.');
  return new RegExp(
    'uploaded file: ' + split[0].toLowerCase() + '\\.' + split[1],
    'i'
  );
};

function fakeInputs(): FeedbackContentType {
  return {
    title: faker.animal.crocodilia(),
    description: faker.lorem.sentence(),
    url: 'www.amplify.equinor.com',
  };
}

const SERVICE_NOW_ERROR = 'service now error';
const SLACK_POST_ERROR = 'slack post error';
const SLACK_FILE_ERROR = 'slack file error';

const severityOptions = [
  UrgencyOption.IMPEDES,
  UrgencyOption.UNABLE,
  UrgencyOption.NO_IMPACT,
];

// Default handlers for this test
const handlers = [
  http.get('*/api/v1/Token/AmplifyPortal', () => {
    return HttpResponse.text(faker.internet.password())
  }),
  http.post('*/api/v1/ServiceNow/incident', () => {
    const body: ServiceNowIncidentResponse = {
      sysId: faker.string.uuid(),
    };

    return HttpResponse.json(body);
  }),
  http.post('*/api/v1/Slack/fileUpload', async ({ request }) => {
    const formData = await request.formData();

    return HttpResponse.formData(formData);
  }),
  http.get('*/api/v1/ReleaseNotes', () => {
    return HttpResponse.json(releaseNotes);
  }),
  http.get('*/api/v1/ReleaseNotes/GetContainerSasUri', () => {
    return HttpResponse.text('PORTALURL?FAKE_TOKEN');
  }),
  http.post('*/api/v1/Slack/postmessage', async ({ request }) => {
    const formData = await request.formData();

    return HttpResponse.formData(formData);
  }),
];

const errorHandlers = [
  http.post('*/api/v1/ServiceNow/incident', () => {
    return HttpResponse.json({ message: SERVICE_NOW_ERROR }, { status: 500 });
  }),
  http.post('*/api/v1/Slack/fileUpload', () => {
    return HttpResponse.json(
      {
        message: SLACK_FILE_ERROR,
      },
      { status: 500 }
    );
  }),
  http.get('*/api/v1/ReleaseNotes', () => {
    return HttpResponse.text('error release notes', { status: 500 });
  }),
  http.post('*/api/v1/Slack/postmessage', () => {
    return HttpResponse.json(
      {
        message: SLACK_POST_ERROR,
      },
      { status: 500 }
    );
  }),
];
const server = setupServer(...handlers);

describe('Resources', () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('Behaves as expected', async () => {
    render(<Resources showTutorials>Child</Resources>, {
      wrapper: Wrappers,
    });
    const user = userEvent.setup();

    const button = screen.getByRole('button');

    await user.click(button);

    const learnMoreButton = screen.getByRole('menuitem', {
      name: /learn more/i,
    });

    await user.click(learnMoreButton);
    expect(screen.getByText(/tutorials/i)).toBeInTheDocument();

    const childElement = await screen.findByText('Child');

    expect(childElement).toBeInTheDocument();
  });

  test('Opens and closes as expected', async () => {
    render(<Resources />, { wrapper: Wrappers });
    const user = userEvent.setup();

    const button = screen.getByRole('button');

    await user.click(button);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();

    await user.click(button);

    await user.click(document.body);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  test('hide props working as expected', async () => {
    render(<Resources hideFeedback={true} hideReleaseNotes={true} />, {
      wrapper: Wrappers,
    });
    const user = userEvent.setup();

    const button = screen.getByRole('button');

    await user.click(button);

    const releaseNotes = screen.queryByText('Release notes');

    expect(releaseNotes).not.toBeInTheDocument();
  });

  describe('Release notes', () => {
    test('should close the dialog by clicking the close button inside', async () => {
      const { container } = render(
        <MemoryRouter initialEntries={['/']}>
          <Resources />
        </MemoryRouter>,
        { wrapper: Wrappers }
      );
      const user = userEvent.setup();
      const toggleHelpButton = screen.getByRole('button');
      await user.click(toggleHelpButton);
      const toggleReleaseNotesButton = screen.getByRole('menuitem', {
        name: /Open release notes/,
      });
      expect(toggleReleaseNotesButton).toBeInTheDocument();
      await user.click(toggleReleaseNotesButton);

      const dialog = within(container.children[1] as HTMLElement);
      const closeButton = dialog.getByRole('button', {
        hidden: true,
        name: 'close modal',
      });
      expect(closeButton).toBeInTheDocument();
      await user.click(closeButton);
      const title = screen.queryByText('Release Notes');
      expect(title).not.toBeInTheDocument();
    });

    test('can close dialog by clicking outside', async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Resources />
        </MemoryRouter>,
        { wrapper: Wrappers }
      );
      const user = userEvent.setup();

      const button = screen.getByRole('button');

      await user.click(button);

      const releaseNotesButton = screen.getByRole('menuitem', {
        name: 'Open release notes',
      });

      await user.click(releaseNotesButton);

      const title = screen.getByText('Release Notes');

      expect(title).toBeInTheDocument();
      const dialog = screen.getByRole('dialog', { hidden: true });
      await user.click(dialog);
      const titleHeader = screen.queryByText('Release Notes');

      expect(titleHeader).not.toBeInTheDocument();
    });

    test('show a release note', async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Resources />
        </MemoryRouter>,
        { wrapper: Wrappers }
      );
      const user = userEvent.setup();
      const button = screen.getByRole('button');
      await user.click(button);
      const releaseButton = document.querySelector('#release-notes');
      if (releaseButton) {
        await user.click(releaseButton);
      }
      const releaseNoteText = screen.getByText('Release Notes');
      expect(releaseNoteText).toBeInTheDocument();
      await waitFor(
        () => {
          const actualText = screen.getByText('Release notes body text');
          return expect(actualText).toBeInTheDocument();
        },
        { timeout: 500 }
      );
    });
    test('should show Nothing matching "SearchTerm" when no matching release notes given only entered a search and no filter', async () => {
      const { container } = render(
        <MemoryRouter initialEntries={['/']}>
          <Resources />
        </MemoryRouter>,
        { wrapper: Wrappers }
      );
      const user = userEvent.setup();
      const toggleHelpButton = screen.getByRole('button');
      await user.click(toggleHelpButton);
      const toggleReleaseNotesButton = screen.getByRole('menuitem', {
        name: /Open release notes/,
      });
      expect(toggleReleaseNotesButton).toBeInTheDocument();
      await user.click(toggleReleaseNotesButton);
      await waitFor(
        () => {
          const releaseNoteText = screen.getByText('Release notes body text');
          expect(releaseNoteText).toBeInTheDocument();
        },
        { timeout: 600 }
      );

      const dialog = within(container.children[1] as HTMLElement);
      const searchInput = dialog.getByRole('textbox', {
        hidden: true,
      });
      expect(searchInput).toBeInTheDocument();
      const searchTerm = faker.animal.crocodilia();
      await user.type(searchInput, searchTerm);

      const nothingMatchinText = dialog.getByText(
        `Nothing matching "${searchTerm} "`
      );
      expect(nothingMatchinText).toBeInTheDocument();
    });

    test('should show Nothing matching " Feature" when no matching release notes given only selected type', async () => {
      const { container } = render(
        <MemoryRouter initialEntries={['/']}>
          <Resources />
        </MemoryRouter>,
        { wrapper: Wrappers }
      );
      const user = userEvent.setup();
      const toggleHelpButton = screen.getByRole('button');
      await user.click(toggleHelpButton);
      const toggleReleaseNotesButton = screen.getByRole('menuitem', {
        name: /Open release notes/,
      });
      expect(toggleReleaseNotesButton).toBeInTheDocument();
      await user.click(toggleReleaseNotesButton);
      await waitFor(
        () => {
          const releaseNoteText = screen.getByText('Release notes body text');
          expect(releaseNoteText).toBeInTheDocument();
        },
        { timeout: 600 }
      );

      const dialog = within(container.children[1] as HTMLElement);
      const filterButton = dialog.getByRole('button', {
        hidden: true,
        name: 'Filter by',
      });
      expect(filterButton).toBeInTheDocument();
      await user.click(filterButton);
      const typeButton = dialog.getByRole('menuitem', {
        hidden: true,
        name: 'Type',
      });
      await user.click(typeButton);
      expect(typeButton).toBeInTheDocument();
      const featureButton = dialog.getByRole('menuitem', {
        hidden: true,
        name: 'Feature',
      });
      await user.click(featureButton);

      const nothingMatchingText = dialog.getByText(
        `Nothing matching " Feature"`
      );
      expect(nothingMatchingText).toBeInTheDocument();
    });
  });

  describe('Feedback: open menu', () => {
    beforeEach(async () => {
      render(<Resources />, { wrapper: Wrappers });
      const user = userEvent.setup();

      const resourceMenuButton = screen.getByRole('button');

      await user.click(resourceMenuButton);

      window.localStorage.clear();
    });

    describe('Click "Report a bug" menu item', () => {
      beforeEach(async () => {
        const user = userEvent.setup();
        const reportBug = screen.getByText('Report a bug');

        await user.click(reportBug);
      });

      test('can close dialog by clicking cancel', async () => {
        const user = userEvent.setup();

        const titleInput = screen.getByLabelText(/title/i);

        expect(titleInput).toBeInTheDocument();

        const cancelButton = screen.getByText(/cancel/i);

        await user.click(cancelButton);

        expect(titleInput).not.toBeInTheDocument();
      });

      test('Url validation working as expected', async () => {
        const user = userEvent.setup();

        const wrongUrl = 'www.google.com';
        const rightUrl = 'www.amplify.equinor.com';

        const urlInput: HTMLInputElement = screen.getByLabelText(/url/i);
        await user.type(urlInput, wrongUrl);

        act(() => {
          urlInput.blur();
        });
        await act(async () => {
          await waitForMS(1000);
        });
        const helperText = screen.queryByText(/URL must be from a .equinor/i);
        expect(helperText!).toBeInTheDocument();
        await user.clear(urlInput);

        expect(helperText).not.toBeInTheDocument();

        await user.type(urlInput, wrongUrl);

        act(() => {
          urlInput.blur();
        });
        await act(async () => {
          await waitForMS(1000);
        });
        const helperTextAgain = screen.queryByText(
          /URL must be from a .equinor/i
        );

        expect(helperTextAgain!).toBeInTheDocument();
        await user.type(urlInput, rightUrl);

        expect(helperTextAgain).not.toBeInTheDocument();
      }, 10000); // Setting timeout for this test to be 10 seconds

      describe('Input title, description and url', () => {
        beforeEach(async () => {
          const { title, description, url } = fakeInputs();
          const user = userEvent.setup();

          const titleInput: HTMLInputElement = screen.getByLabelText(/title/i);
          const descInput: HTMLInputElement =
            screen.getByLabelText(/description/i);
          const urlInput: HTMLInputElement = screen.getByLabelText(/url/i);

          const submitButton = screen.getByTestId('submit-button');

          expect(submitButton).toBeDisabled();

          await user.type(titleInput, title);
          await user.type(descInput, description);
          await user.type(urlInput, url ?? '');

          expect(titleInput.value).toEqual(title);
          expect(descInput.value).toEqual(description);
          expect(urlInput.value).toEqual(url);
        });

        describe('Severity options', () => {
          for (const option of severityOptions) {
            test(`can select and submit "${option}" severity`, async () => {
              const user = userEvent.setup();

              const severityInput: HTMLInputElement = screen.getByTestId(
                'feedback-severity-input'
              );

              await user.click(severityInput);

              const severityOption = screen.getByText(option);

              expect(severityOption).toBeInTheDocument();

              await user.click(severityOption);

              expect(severityInput.value).toEqual(option);

              const submitButton = screen.getByText(/send/i);

              expect(submitButton).not.toBeDisabled();
              await user.click(submitButton);
            }, 15000); // Setting timeout for this test to be 15 seconds
          }
        });

        describe('Error handling', () => {
          beforeEach(() => {
            server.use(...errorHandlers);
          });

          test('shows error message when everything fails', async () => {
            const imageOne = fakeImageFile();
            const user = userEvent.setup();

            const fileUploadArea = screen.getByTestId('file-upload-area-input');
            await user.upload(fileUploadArea, [imageOne]);

            const submitButton = screen.getByTestId('submit-button');
            await user.click(submitButton);

            await act(async () => {
              await waitForMS(2500);
            });

            expect(
              screen.getByText(`Posting ${imageOne.name}`)
            ).toBeInTheDocument();

            expect(screen.getByText(SERVICE_NOW_ERROR)).toBeInTheDocument();
            expect(screen.getByText(SLACK_POST_ERROR)).toBeInTheDocument();
            expect(screen.getByText(SLACK_FILE_ERROR)).toBeInTheDocument();
          }, 10000); // Setting timeout for this test to be 10 seconds

          test('shows more details if slack request fails, and can return to form to retry', async () => {
            const imageOne = fakeImageFile();

            const user = userEvent.setup();

            const fileUploadArea = screen.getByTestId('file-upload-area-input');

            await user.upload(fileUploadArea, [imageOne]);

            const submitButton = screen.getByTestId('submit-button');
            await user.click(submitButton);

            await act(async () => {
              await waitForMS(2500);
            });

            expect(
              screen.getByText(`Posting ${imageOne.name}`)
            ).toBeInTheDocument();

            const retryButton = screen.getByText(/retry/i);
            expect(retryButton).not.toBeDisabled();

            await user.click(retryButton);

            const titleInputAgain: HTMLInputElement =
              screen.getByLabelText(/title/i);
            const currentTitleInputValue = titleInputAgain.value;

            expect(
              screen.getByText(
                /The report has already been sent to service now/i
              )
            ).toBeInTheDocument();
            const resetForm = screen.getByTestId('reset-form-button');

            expect(titleInputAgain.value).toBe(currentTitleInputValue);
            await user.click(resetForm);
            await act(async () => {
              await waitForMS(1000);
            });
            expect(titleInputAgain.value).not.toBe(currentTitleInputValue);
          }, 10000); // Setting timeout for this test to be 10 seconds
        });

        test('Inputting all fields with file works as expected', async () => {
          const imageOne = fakeImageFile();
          const imageTwo = fakeImageFile();

          const user = userEvent.setup();

          const fileUploadArea = screen.getByTestId('file-upload-area-input');

          await user.upload(fileUploadArea, [imageTwo]);

          // Delete image file
          const file2nameElement = screen.getByAltText(
            createRegexToGetAttachment(imageTwo.name)
          );

          expect(file2nameElement).toBeInTheDocument();

          await user.hover(file2nameElement);

          const removeAttachmentButton = screen.getByTestId(
            'attachment-delete-button'
          );

          expect(removeAttachmentButton).toBeInTheDocument();

          if (removeAttachmentButton) {
            await user.click(removeAttachmentButton);
            expect(file2nameElement).not.toBeInTheDocument();
          }

          // Upload three files, two being duplicates, so expect only two files to be shown
          await user.upload(fileUploadArea, [imageOne]);
          await user.upload(fileUploadArea, [imageTwo]);
          await user.upload(fileUploadArea, [imageOne]);

          const allDeleteButtons = screen.getAllByTestId(
            'attachment-delete-button'
          );

          expect(allDeleteButtons.length).toBe(2);

          const submitButton = screen.getByTestId('submit-button');
          expect(submitButton).not.toBeDisabled();
          await user.click(submitButton);

          await act(async () => {
            await waitForMS(2500);
          });

          await waitFor(
            () => expect(screen.getAllByText(/success/i).length).toBe(2),
            { timeout: 4000 }
          );

          await waitFor(
            () => expect(screen.getByText(/Thank you/i)).toBeInTheDocument(),
            { timeout: 3000 }
          );

          const closeButton = screen.getByText(/close/i);
          await user.click(closeButton);
          await waitForMS(1000);
          expect(screen.queryByText(/report a bug/i)).not.toBeInTheDocument();
        }, 20000); // Setting timeout for this test to be 20 seconds
      });
    });

    describe('Click "Suggest a feature" menu item, and fill info', () => {
      beforeEach(async () => {
        const user = userEvent.setup();

        const { title, description } = fakeInputs();
        const suggestFeature = screen.getByText(/suggest idea/i);
        await user.click(suggestFeature);

        const titleInput: HTMLInputElement = screen.getByLabelText(/title/i);
        const descInput: HTMLInputElement =
          screen.getByLabelText(/description/i);

        const submitButton = screen.getByTestId('submit-button');

        expect(submitButton).toBeDisabled();

        await user.type(titleInput, title);
        await user.type(descInput, description);

        expect(titleInput.value).toEqual(title);
        expect(descInput.value).toEqual(description);
      });

      describe('Default error', () => {
        beforeEach(() => {
          server.use(
            ...[
              ...errorHandlers.slice(0, errorHandlers.length - 2),
              http.post('*/api/v1/Slack/postmessage', () => {
                return HttpResponse.json(
                  {
                    message: undefined,
                  },
                  { status: 500 }
                );
              }),
            ]
          );
        });

        test('shows default error message if errorText is undefined', async () => {
          const submitButton = screen.getByTestId('submit-button');
          const user = userEvent.setup();
          await user.click(submitButton);

          await act(async () => {
            await waitForMS(2500);
          });

          expect(
            screen.getByText(DEFAULT_REQUEST_ERROR_MESSAGE)
          ).toBeInTheDocument();
        }, 10000); // Setting timeout for this test to be 10 seconds
      });

      test('suggest a feature dialog submit button enabled at correct time', async () => {
        const submitButton = screen.getByTestId('submit-button');
        const user = userEvent.setup();
        await user.click(submitButton);
        await waitFor(
          () => expect(screen.getByText(/success/i)).toBeInTheDocument(),
          { timeout: 2000 }
        );
        await waitFor(
          () => expect(screen.getByText(/Thank you/i)).toBeInTheDocument(),
          { timeout: 2000 }
        );
      }, 15000); // Setting timeout for this test to be 15 seconds
    });
  });

  describe('Learn more ', () => {
    test('click on back button ', async () => {
      render(<Resources showTutorials />, { wrapper: Wrappers });
      const user = userEvent.setup();

      const button = screen.getByRole('button');

      await user.click(button);
      const learnMore = screen.getByText(/learn more/i);
      await user.click(learnMore);

      const tutorial = screen.getByText(/tutorials/i);
      expect(tutorial).toBeInTheDocument();

      const backButton = screen.getByRole('button', { name: /back/i });
      await user.click(backButton);
    });

    test(
      'open portal  ',
      async () => {
        window.open = vi.fn();

        render(<Resources />, { wrapper: Wrappers });
        const user = userEvent.setup();

        const button = screen.getByRole('button');

        await user.click(button);

        const learnMore = screen.getByText(/learn more/i);
        await user.click(learnMore);

        const openPortal = screen.getByText(/open application portal/i);
        await user.click(openPortal);

        const openLink = screen.getByText(/open link/i);
        expect(openLink).toBeInTheDocument();

        await waitFor(
          () =>
            expect(
              screen.getByText(/Transferring you to application/i)
            ).toBeInTheDocument(),
          {
            timeout: 8000,
          }
        );

        await waitFor(
          () =>
            expect(window.open).toHaveBeenCalledWith(
              PORTAL_URL_WITHOUT_LOCALHOST,
              '_self'
            ),
          {
            timeout: 10000,
          }
        );
      },
      { timeout: 20000 }
    );

    test('Close open portal by clicking cancel ', async () => {
      render(<Resources />, { wrapper: Wrappers });

      const user = userEvent.setup();

      const button = screen.getByRole('button');

      await user.click(button);

      const learnMore = screen.getByText(/learn more/i);
      await user.click(learnMore);

      const openPortal = screen.getByText(/open application portal/i);
      await user.click(openPortal);

      const openLink = screen.getByText(/open link/i);
      expect(openLink).toBeInTheDocument();

      const cancelButton = screen.getByTestId('close-transfer-app');

      await user.click(cancelButton);

      expect(openLink).not.toBeInTheDocument();
    });

    test('open tutorials from resources and close tutorials  ', async () => {
      const fakeTutorialOptions: tutorialOptions[] = [
        {
          description: faker.lorem.sentence(),
          steps: faker.animal.dog(),
          duration: faker.color.rgb(),
          pathName: '/current',
          onClick: vi.fn(),
        },
      ];

      const router = createMemoryRouter(
        [
          {
            path: '/current',
            element: (
              <Resources tutorialOptions={fakeTutorialOptions} showTutorials />
            ),
          },
        ],
        {
          initialEntries: ['/current'],
          initialIndex: 0,
        }
      );

      render(<RouterProvider router={router} />, {
        wrapper: Wrappers,
      });
      const user = userEvent.setup();

      const button = screen.getByRole('button');

      await user.click(button);

      const learnMore = screen.getByText(/learn more/i);
      await user.click(learnMore);

      const openTutorials = screen.getByRole('menuitem', {
        name: 'Tutorials',
      });
      await user.click(openTutorials);

      const findCurrentPage = screen.getByText(/ON CURRENT PAGE/i);
      expect(findCurrentPage).toBeInTheDocument();

      const closeButton = screen.getByTestId('close-tutorial-dialog');
      await user.click(closeButton);

      expect(findCurrentPage).not.toBeInTheDocument();
    });

    test('Render custom button works', () => {
      render(
        <Resources
          customButton={(ref, onToggle) => (
            <button ref={ref} onClick={onToggle}>
              custom
            </button>
          )}
        />,
        { wrapper: Wrappers }
      );

      const button = screen.getByRole('button');

      expect(button).toHaveTextContent('custom');
    });
  });
});
