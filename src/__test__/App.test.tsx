import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../Calendar';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/캘린더 테스트/i);
  expect(linkElement).toBeInTheDocument();
});
