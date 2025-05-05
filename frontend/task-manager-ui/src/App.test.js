import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Run Shell Command link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Run Shell Command/i);
  expect(linkElement).toBeInTheDocument();
});
