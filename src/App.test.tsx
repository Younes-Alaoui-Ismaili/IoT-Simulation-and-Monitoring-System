import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

describe('App', () => {
  it('mounts and renders the dashboard header', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'IoT Dashboard' })).toBeInTheDocument();
  });

  it('shows the seeded devices', () => {
    render(<App />);
    expect(screen.getByText('Temperature Sensor 1')).toBeInTheDocument();
    expect(screen.getByText('Power Monitor 1')).toBeInTheDocument();
  });

  it('shows the alerts panel', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Alerts' })).toBeInTheDocument();
  });
});
