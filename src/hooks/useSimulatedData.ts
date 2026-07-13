import { useState, useEffect, useCallback } from 'react';
import { Device, Alert, MetricData, AuditLog } from '../types';

export function useSimulatedData() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [metrics, setMetrics] = useState<Record<string, MetricData[]>>({});
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  const addAuditLog = useCallback((
    action: string,
    resource: string,
    resourceId: string,
    details: Record<string, unknown>
  ) => {
    setAuditLogs(prev => [
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        userId: 'local-user',
        action,
        resource,
        resourceId,
        timestamp: new Date().toISOString(),
        details
      },
      ...prev
    ]);
  }, []);

  const acknowledgeAlert = useCallback((alertId: string) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === alertId
          ? { ...alert, acknowledged: true }
          : alert
      )
    );
    addAuditLog('update', 'alert', alertId, { acknowledged: true });
  }, [addAuditLog]);

  // Seed the simulated devices once
  useEffect(() => {
    const initialDevices: Device[] = [
      {
        id: '1',
        name: 'Temperature Sensor 1',
        type: 'sensor',
        status: 'online',
        lastSeen: new Date().toISOString(),
        location: {
          lat: 48.8584,
          lng: 2.2945,
          address: 'Paris, France'
        },
        metrics: {
          temperature: 22,
          humidity: 45
        },
        tags: ['temperature', 'indoor', 'floor-1']
      },
      {
        id: '2',
        name: 'Power Monitor 1',
        type: 'sensor',
        status: 'online',
        lastSeen: new Date().toISOString(),
        location: {
          lat: 51.5074,
          lng: -0.1278,
          address: 'London, UK'
        },
        metrics: {
          power: 120,
          signal: -65
        },
        tags: ['power', 'industrial']
      }
    ];

    setDevices(initialDevices);
  }, []);

  // Simulate metric updates on a fixed tick
  useEffect(() => {
    const updateData = () => {
      setDevices(prevDevices =>
        prevDevices.map(device => {
          const updatedMetrics = {
            ...device.metrics,
            temperature: device.metrics.temperature
              ? Math.round(device.metrics.temperature + (Math.random() * 2 - 1))
              : undefined,
            humidity: device.metrics.humidity
              ? Math.round(Math.max(0, Math.min(100, device.metrics.humidity + (Math.random() * 4 - 2))))
              : undefined,
            power: device.metrics.power
              ? Math.round(device.metrics.power + (Math.random() * 10 - 5))
              : undefined,
            signal: device.metrics.signal
              ? Math.round(Math.max(-100, Math.min(-30, device.metrics.signal + (Math.random() * 2 - 1))))
              : undefined
          };

          return {
            ...device,
            lastSeen: new Date().toISOString(),
            metrics: updatedMetrics
          };
        })
      );

      setMetrics(prevMetrics => {
        const newMetrics = { ...prevMetrics };
        devices.forEach(device => {
          Object.entries(device.metrics).forEach(([key, value]) => {
            if (value !== undefined) {
              const metricKey = `${device.id}-${key}`;
              const timestamp = new Date().toISOString();
              newMetrics[metricKey] = [
                ...(newMetrics[metricKey] || []).slice(-50),
                {
                  timestamp,
                  value: Math.round(value),
                  deviceId: device.id,
                  metricType: key
                }
              ];
            }
          });
        });
        return newMetrics;
      });
    };

    const interval = setInterval(updateData, 2000);
    return () => clearInterval(interval);
  }, [devices]);

  return {
    devices,
    alerts,
    metrics,
    auditLogs,
    addAuditLog,
    acknowledgeAlert
  };
}
