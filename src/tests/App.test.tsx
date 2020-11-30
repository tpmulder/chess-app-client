import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('App does not crash', () => {
  render(<App />);
  expect(3).toBe(3);
});
