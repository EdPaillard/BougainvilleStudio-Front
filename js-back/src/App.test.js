import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Boug 3.0/i);
  expect(linkElement).toBeInTheDocument();
});
