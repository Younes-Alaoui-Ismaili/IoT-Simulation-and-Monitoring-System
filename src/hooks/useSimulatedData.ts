import { useState, useEffect, useCallback } from 'react';
import { Device, Alert, MetricData, DeviceGroup, MaintenanceLog, AutomationRule, DashboardLayout, AuditLog } from '../types';

export function useSimulatedData() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [metrics, setMetrics] = useState<Record<string, MetricData[]>>({});
  const [groups, setGroups] = useState<DeviceGroup[]>([]);
  const [maintenanceLogs, setMaintenanceLogs] = useState<MaintenanceLog[]>([]);
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([]);
  const [dashboardLayouts, setDashboardLayouts] = useState<DashboardLayout[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [isOnline, setIsOnline] = useState(true);
  const [lastSync, setLastSync] = useState<string | undefined>(undefined);
  const [retryCount, setRetryCount] = useState(0);

  const acknowledgeAlert = useCallback((alertId: string) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === alertId
          ? { ...alert, acknowledged: true }
          : alert
      )
    );
    addAuditLog('update', 'alert', alertId, { acknowledged: true });
  }, []);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Simulate initial devices with more data
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
    setLastSync(new Date().toISOString());
  }, []);

  // Simulate data updates with network error handling
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const updateData = () => {
      if (!isOnline) {
        // Simulate random network recovery
        if (Math.random() < 0.2) {
          setIsOnline(true);
          setRetryCount(0);
        } else {
          setRetryCount(prev => prev + 1);
          return;
        }
      }

      try {
        // Update devices
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

        // Update metrics history
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

        setLastSync(new Date().toISOString());

        // Simulate random network errors
        if (Math.random() < 0.05) {
          throw new Error('Network error');
        }
      } catch (error) {
        console.error('Error updating data:', error);
        setIsOnline(false);
      }
    };

    interval = setInterval(updateData, 2000);
    return () => clearInterval(interval);
  }, [devices, isOnline]);

  const retryConnection = useCallback(() => {
    setIsOnline(true);
    setRetryCount(0);
  }, []);

  return {
    devices,
    alerts,
    metrics,
    groups,
    maintenanceLogs,
    automationRules,
    dashboardLayouts,
    auditLogs,
    isOnline,
    lastSync,
    retryCount,
    retryConnection,
    acknowledgeAlert
  };
}