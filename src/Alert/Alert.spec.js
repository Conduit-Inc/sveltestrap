import Alert from './Alert.svelte';
import { render, cleanup, fireEvent, waitForElementToBeRemoved } from '@testing-library/svelte';

beforeEach(cleanup);

describe('Alert', () => {
  test('should render with default color and text', () => {
    const { queryByRole } = render(Alert, { children: 'Hello world!' });

    const alert = queryByRole('alert');
    expect(alert.innerHTML.trim()).toBe('Hello world!');
    expect(alert.className).toBe('alert alert-success');
  });

  test('should render specified color', () => {
    const { queryByRole } = render(Alert, {
      color: 'primary',
      children: 'Hello world!'
    });

    const alert = queryByRole('alert');

    expect(alert.className).toBe('alert alert-primary');
  });

  test('should render alert heading', () => {
    const { container } = render(Alert, {
      heading: 'Hello world!'
    });

    const heading = container.querySelector('.alert-heading');

    expect(heading.textContent).toBe('Hello world!');
  });

  test('should render custom class', () => {
    const { queryByRole } = render(Alert, {
      color: 'danger',
      children: 'Hello world!',
      class: 'boogie'
    });

    const alert = queryByRole('alert');

    expect(alert.className).toBe('boogie alert alert-danger');
  });

  test('should render dismissible alert', async () => {
    const { queryByRole, queryByLabelText } = render(Alert, {
      color: 'info',
      children: 'I can be dismissed!',
      dismissible: true
    });

    const alert = queryByRole('alert');
    const closeBtn = queryByLabelText('Close');

    expect(alert).toBeInTheDocument();
    expect(alert.className).toBe('alert alert-info alert-dismissible');
    expect(closeBtn).toBeInTheDocument();

    fireEvent.click(closeBtn);

    await waitForElementToBeRemoved(alert, { timeout: 6000 });

    expect(alert).not.toBeInTheDocument();
    expect(closeBtn).not.toBeInTheDocument();
  });

  test('should render a controlled alert', async () => {
    let isOpen = true;

    const toggle = vi.fn(() => {
      isOpen = false;
    });

    const { rerender, queryByRole, queryByLabelText } = render(Alert, {
      color: 'info',
      children: 'I can be dismissed!',
      isOpen,
      toggle
    });

    const alert = queryByRole('alert');
    const closeBtn = queryByLabelText('Close');

    expect(alert).toBeInTheDocument();
    expect(alert.className).toBe('alert alert-info alert-dismissible');
    expect(closeBtn).toBeInTheDocument();

    await fireEvent.click(closeBtn);

    expect(isOpen).toBe(false);
    expect(toggle).toHaveBeenCalledTimes(1);

    await rerender({ isOpen, toggle });

    expect(alert).not.toBeInTheDocument();
  });

  test('should render alert without fade', async () => {
    const { queryByRole, queryByLabelText } = render(Alert, {
      color: 'info',
      children: 'I can be dismissed!',
      dismissible: true,
      fade: false
    });

    const alert = queryByRole('alert');
    const closeBtn = queryByLabelText('Close');

    expect(alert).toBeInTheDocument();
    expect(alert.className).toBe('alert alert-info alert-dismissible');
    expect(closeBtn).toBeInTheDocument();

    await fireEvent.click(closeBtn);

    await waitForElementToBeRemoved(alert, { timeout: 6000 });

    expect(alert).not.toBeInTheDocument();
    expect(closeBtn).not.toBeInTheDocument();
  });
});
