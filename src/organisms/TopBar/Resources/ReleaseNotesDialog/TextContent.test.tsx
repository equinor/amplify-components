import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { TextContent } from './TextContent';
import { CancelablePromise } from 'src/api';
import { AuthProvider, ReleaseNotesProvider } from 'src/providers';
import { render, screen, waitFor } from 'src/tests/test-utils';

const Wrappers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MemoryRouter>
          <ReleaseNotesProvider>{children}</ReleaseNotesProvider>
        </MemoryRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

const FAKE_TOKEN = 'FAKE_TOKEN';

vi.mock('src/api/services/ReleaseNotesService', () => {
  class ReleaseNotesService {
    public static getContainerSasUri(): CancelablePromise<unknown> {
      return new CancelablePromise((resolve) => {
        setTimeout(() => {
          resolve(`PORTALURL?${FAKE_TOKEN}`);
        }, 100);
      });
    }
  }
  return { ReleaseNotesService };
});

test('TextContent shows text', async () => {
  const textWithImg = '<p>hei<br><br><br></p>';

  render(<TextContent text={textWithImg} />, { wrapper: Wrappers });

  await waitFor(() => expect(screen.getByText('hei')).toBeInTheDocument(), {
    timeout: 200,
  });
});