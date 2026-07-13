import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSimulatedData } from './useSimulatedData';

describe('useSimulatedData', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('seeds the simulated devices on mount', () => {
    const { result } = renderHook(() => useSimulatedData());

    expect(result.current.devices).toHaveLength(2);
    expect(result.current.devices.map(d => d.name)).toEqual([
      'Temperature Sensor 1',
      'Power Monitor 1'
    ]);
  });

  it('generates metric history on each tick', () => {
    const { result } = renderHook(() => useSimulatedData());

    // No metric history is recorded until the first tick fires.
    expect(Object.keys(result.current.metrics)).toHaveLength(0);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    const keys = Object.keys(result.current.metrics);
    expect(keys.length).toBeGreaterThan(0);
    expect(keys).toContain('1-temperature');
    expect(result.current.metrics['1-temperature'][0]).toMatchObject({
      deviceId: '1',
      metricType: 'temperature'
    });
  });

  it('seeds demo alerts on mount', () => {
    const { result } = renderHook(() => useSimulatedData());

    expect(result.current.alerts).toHaveLength(2);
    expect(result.current.alerts.every(a => !a.acknowledged)).toBe(true);
  });

  it('acknowledges a seeded alert and records a timestamped audit entry', () => {
    const { result } = renderHook(() => useSimulatedData());
    const target = result.current.alerts[0];

    expect(target.acknowledged).toBe(false);
    expect(result.current.auditLogs).toHaveLength(0);

    act(() => {
      result.current.acknowledgeAlert(target.id);
    });

    expect(result.current.alerts.find(a => a.id === target.id)?.acknowledged).toBe(true);
    expect(result.current.auditLogs).toHaveLength(1);
    const entry = result.current.auditLogs[0];
    expect(entry).toMatchObject({
      action: 'update',
      resource: 'alert',
      resourceId: target.id,
      details: { acknowledged: true }
    });
    // The timestamp is a valid, round-trippable ISO string.
    expect(entry.timestamp).toBe(new Date(entry.timestamp).toISOString());
  });

  it('addAuditLog prepends a well-formed entry', () => {
    const { result } = renderHook(() => useSimulatedData());

    act(() => {
      result.current.addAuditLog('create', 'device', 'd-1', { foo: 'bar' });
    });
    act(() => {
      result.current.addAuditLog('delete', 'device', 'd-2', {});
    });

    expect(result.current.auditLogs).toHaveLength(2);
    // Newest entry is first.
    expect(result.current.auditLogs[0]).toMatchObject({
      action: 'delete',
      resource: 'device',
      resourceId: 'd-2',
      userId: 'local-user'
    });
  });
});
