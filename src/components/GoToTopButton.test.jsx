import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GoToTopButton from './GoToTopButton';

describe('GoToTopButton', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    window.scrollTo = vi.fn();
  });

  test('is not visible initially', () => {
    render(<GoToTopButton />);
    expect(screen.queryByLabelText('Go to top')).not.toBeInTheDocument();
  });

  test('becomes visible after scrolling down', () => {
    render(<GoToTopButton />);
    // Simulate scrolling down
    fireEvent.scroll(window, { target: { pageYOffset: 400 } });
    expect(screen.getByLabelText('Go to top')).toBeInTheDocument();
  });

  test('scrolls to top when clicked', () => {
    render(<GoToTopButton />);
    // Scroll down to make the button visible
    fireEvent.scroll(window, { target: { pageYOffset: 400 } });
    const button = screen.getByLabelText('Go to top');
    fireEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});