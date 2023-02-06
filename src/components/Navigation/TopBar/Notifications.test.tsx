import React from 'react';

import { notifications } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { expect, render, screen, test, userEvent } from '../../../test-utils';
import Notifications from './Notifications';

test('renders button and panel correctly', async () => {
  render(<Notifications setAllAsRead={() => null} />);
  const icons = screen.getAllByTestId('eds-icon-path');
  const panelElement =
    screen.queryByText('Notifications')?.parentElement?.parentElement;
  expect(icons[0]).toHaveAttribute('d', notifications.svgPathData);
  console.log(panelElement?.style.display);
  expect(panelElement).toBeVisisble();
  const button = screen.getByRole('button');
  await userEvent.click(button);
  expect(screen.getByText('Notifications')).toBeVisible();
});

test('renders element children correctly', async () => {
  const text = faker.animal.cow();
  render(
    <Notifications setAllAsRead={() => null}>
      <div>
        <p>{text}</p>
      </div>
      <div>
        <p>{text}</p>
      </div>
      <div>
        <p>{text}</p>
      </div>
    </Notifications>
  );
  expect(screen.getAllByText(text).length).toBe(3);
});
