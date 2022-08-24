import { render, screen } from '@testing-library/react';

import OptionalTooltip from './OptionalTooltip';
import React from 'react';

const dummyData = {
  title: 'TootltipText',
};

test('renders without crashing', () => {
  render(
    <OptionalTooltip {...dummyData}>
      <>Test</>
    </OptionalTooltip>
  );

  expect(screen.getByText('Test')).toBeInTheDocument();
});
