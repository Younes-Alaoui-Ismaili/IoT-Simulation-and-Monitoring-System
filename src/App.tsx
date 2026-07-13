import { DeviceCard } from './components/Dashboard/DeviceCard';
import { AlertsList } from './components/Dashboard/AlertsList';
import { MetricsChart } from './components/Dashboard/MetricsChart';
import { useSimulatedData } from './hooks/useSimulatedData';
import { LayoutGrid, Bell } from 'lucide-react';

const metricColors = {
  temperature: '#3B82F6',
  humidity: '#10B981',
  power: '#F59E0B',
  signal: '#6366F1'
};

function App() {
  const { devices, alerts, metrics, acknowledgeAlert } = useSimulatedData();
  const activeAlerts = alerts.filter(alert => !alert.acknowledged);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <LayoutGrid className="h-8 w-8 text-blue-500 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">IoT Dashboard</h1>
            </div>
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
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                return (
                  <MetricsChart
                    key={key}
                    data={data}
                    metricName={`${device?.name} - ${metricName}`}
                    color={metricColors[metricName as keyof typeof metricColors]}
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
                alerts={activeAlerts.slice().reverse()}
                onAcknowledge={acknowledgeAlert}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
