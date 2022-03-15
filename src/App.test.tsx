import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hello world h1', () => {
  render(<App />);
  const helloworldElement = screen.getByText(/hello world/i);

  
  expect(helloworldElement).toBeInTheDocument();
});



