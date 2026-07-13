import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
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

  it('shows the alerts panel with the seeded demo alerts', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Alerts/ })).toBeInTheDocument();
    expect(
      screen.getByText('Temperature Sensor 1 exceeded its temperature threshold')
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /acknowledge/i })).toHaveLength(2);
  });

  it('removes an alert from the panel when the user acknowledges it', () => {
    render(<App />);
    expect(screen.getAllByRole('button', { name: /acknowledge/i })).toHaveLength(2);

    fireEvent.click(screen.getAllByRole('button', { name: /acknowledge/i })[0]);

    expect(screen.getAllByRole('button', { name: /acknowledge/i })).toHaveLength(1);
  });
});
