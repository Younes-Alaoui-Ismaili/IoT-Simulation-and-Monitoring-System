import React, { useState } from 'react';
import { DeviceCard } from './components/Dashboard/DeviceCard';
import { AlertsList } from './components/Dashboard/AlertsList';
import { MetricsChart } from './components/Dashboard/MetricsChart';
import { DeviceMap } from './components/Dashboard/DeviceMap';
import { AutomationRules } from './components/Dashboard/AutomationRules';
import { MaintenanceLogs } from './components/Dashboard/MaintenanceLogs';
import { AuditLogs } from './components/Dashboard/AuditLogs';
import { NetworkStatus } from './components/NetworkStatus';
import { useSimulatedData } from './hooks/useSimulatedData';
import { LayoutGrid, Bell, Map, Zap, PenTool as Tool, ClipboardList } from 'lucide-react';

function App() {
  const {
    devices,
    alerts,
    metrics,
    groups,
    maintenanceLogs,
    automationRules,
    auditLogs,
    isOnline,
    lastSync,
    retryConnection,
    acknowledgeAlert // Add this to the destructured values
  } = useSimulatedData();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'map' | 'automation' | 'maintenance' | 'audit'>('dashboard');
  const activeAlerts = alerts.filter(alert => !alert.acknowledged);

  const renderContent = () => {
    switch (activeTab) {
      case 'map':
        return <DeviceMap devices={devices} />;
      case 'automation':
        return <AutomationRules rules={automationRules} devices={devices} />;
      case 'maintenance':
        return <MaintenanceLogs logs={maintenanceLogs} devices={devices} />;
      case 'audit':
        return <AuditLogs logs={auditLogs} />;
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Devices</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {devices.map(device => (
                  <DeviceCard key={device.id} device={device} />
                ))}
              </div>

              <div className="space-y-6 mt-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Metrics</h2>
                {Object.entries(metrics).map(([key, data]) => {
                  const [deviceId, metricName] = key.split('-');
                  const device = devices.find(d => d.id === deviceId);
                  const colors = {
                    temperature: '#3B82F6',
                    humidity: '#10B981',
                    power: '#F59E0B',
                    signal: '#6366F1'
                  };
                  return (
                    <MetricsChart
                      key={key}
                      data={data}
                      metricName={`${device?.name} - ${metricName}`}
                      color={colors[metricName as keyof typeof colors]}
                    />
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Alerts
                  {activeAlerts.length > 0 && (
                    <span className="ml-2 text-sm bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 px-2 py-1 rounded-full">
                      {activeAlerts.length} active
                    </span>
                  )}
                </h2>
                <AlertsList
                  alerts={alerts.slice().reverse()}
                  onAcknowledge={acknowledgeAlert}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <LayoutGrid className="h-8 w-8 text-blue-500 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">IoT Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'dashboard'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <LayoutGrid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setActiveTab('map')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'map'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <Map className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setActiveTab('automation')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'automation'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <Zap className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setActiveTab('maintenance')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'maintenance'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <Tool className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setActiveTab('audit')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'audit'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <ClipboardList className="h-5 w-5" />
                </button>
              </nav>
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                {activeAlerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                    {activeAlerts.length}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      <NetworkStatus
        isOnline={isOnline}
        lastSync={lastSync}
        onRetry={retryConnection}
      />
    </div>
  );
}

export default App;