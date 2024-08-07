import { IconData } from '@equinor/eds-icons';
import { save } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { Chip } from 'src/molecules/Chip/Chip';
import { render, screen, userEvent } from 'src/tests/test-utils';

// Mock function for onDelete

test('Shows readonly chip with leading icon', () => {
  const someText = faker.animal.crocodilia();
  const leadingIconData: IconData = save;
  render(<Chip leadingIconData={leadingIconData}>{someText}</Chip>);

  //Accesses the span element, finds it parent and finds the first element, which in this case should alwasys be leading
  expect(
    screen.getByText(someText).parentElement?.firstElementChild?.className
  ).toBe('leading');
});

test('Works with just string/number', () => {
  const text = faker.animal.bear();
  const { rerender } = render(<Chip>{text}</Chip>);
  expect(screen.getByText(text)).toBeVisible();
  const randomNumb = faker.number.int();
  rerender(<Chip>{randomNumb}</Chip>);
  expect(screen.getByText(randomNumb)).toBeVisible();
});

test('Works with multiple children', () => {
  const first = faker.animal.bear();
  const second = faker.animal.lion();
  const third = faker.animal.cow();
  const fourth = faker.animal.crocodilia();
  const fifth = faker.animal.fish();
  const sixth = faker.animal.dog();
  render(
    <Chip>
      <div>{first}</div>
      {second}
      <p>{third}</p>
      <>
        <p>{fifth}</p>
        {fourth}
        <div>
          <p>{sixth}</p>
        </div>
      </>
    </Chip>
  );

  expect(screen.getByText(first)).toBeVisible();
  expect(screen.getByText(second)).toBeVisible();
  expect(screen.getByText(third)).toBeVisible();
  expect(screen.getByText(fourth)).toBeVisible();
  expect(screen.getByText(fifth)).toBeVisible();
  expect(screen.getByText(sixth)).toBeVisible();
});

test('Shows interactive chip with delete icon', () => {
  const someText = faker.animal.crocodilia();
  const handleOnClick = vi.fn();

  render(<Chip onDelete={handleOnClick}>{someText}</Chip>);

  expect(screen.queryByRole('img')).toBeInTheDocument();
});

test('Handles delete event on interactive chip', async () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  const handleDelete = vi.fn();
  const someText = faker.animal.crocodilia();

  render(<Chip onDelete={handleDelete}>{someText}</Chip>);
  const user = userEvent.setup();
  const chip = screen.getByText(someText);

  await user.click(chip);

  expect(handleDelete).toHaveBeenCalled();
});

test('Handles click event on interactive chip', async () => {
  const handleOnClick = vi.fn();

  const someText = faker.animal.crocodilia();

  render(<Chip onClick={handleOnClick}>{someText}</Chip>);
  const user = userEvent.setup();
  const chip = screen.getByText(someText);

  await user.click(chip);

  // Assert that handleOnClick has been called
  expect(handleOnClick).toHaveBeenCalled();
});

test('Interactive chip renders icon', () => {
  const handleOnClick = vi.fn();

  const someText = faker.animal.crocodilia();

  render(
    <Chip onClick={handleOnClick} leadingIconData={save}>
      {someText}
    </Chip>
  );

  expect(screen.getByTestId('eds-icon-path')).toHaveAttribute(
    'd',
    save.svgPathData
  );
});

test('Handles keyboard event on delete interactive chip', async () => {
  const handleOnDelete = vi.fn();

  const someText = faker.animal.crocodilia();

  render(<Chip onDelete={handleOnDelete}>{someText}</Chip>);
  const user = userEvent.setup();

  await user.tab();
  await user.keyboard('[Enter]');

  expect(handleOnDelete).toHaveBeenCalled();
});

test('Handles keyboard event on click interactive chip', async () => {
  const handleOnClick = vi.fn();

  const someText = faker.animal.crocodilia();

  render(<Chip onClick={handleOnClick}>{someText}</Chip>);
  const user = userEvent.setup();

  await user.tab();
  await user.keyboard('[Enter]');

  expect(handleOnClick).toHaveBeenCalled();
});

test('Disabled interactive chip works as expected', async () => {
  const handleOnClick = vi.fn();

  const someText = faker.animal.crocodilia();

  render(
    <Chip onClick={handleOnClick} disabled>
      {someText}
    </Chip>
  );
  const user = userEvent.setup();
  const chip = screen.getByText(someText);

  await user.click(chip);
  // Assert that handleOnClick has been called
  expect(handleOnClick).not.toHaveBeenCalled();
});

test('Disabled read only chip works as expected', () => {
  const someText = faker.animal.crocodilia();

  render(<Chip disabled>{someText}</Chip>);

  const chip = screen.getByText(someText).parentElement;

  expect(chip).toBeVisible();
});

test('Handles prioritized click event when delete is also defined on interactive chip', async () => {
  const someText = faker.animal.crocodilia();
  const handleDelete = vi.fn();
  const handleOnClick = vi.fn();
  render(
    <Chip onClick={handleOnClick} onDelete={handleDelete}>
      {someText}
    </Chip>
  );
  const user = userEvent.setup();
  const chip = screen.getByText(someText);

  await user.click(chip);

  expect(handleDelete).toHaveBeenCalled();
  expect(handleOnClick).not.toHaveBeenCalled();
});
