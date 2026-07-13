import React from 'react';
import { MaintenanceLog, Device } from '../../types';
import { PenTool as Tool, CheckCircle, Clock, XCircle } from 'lucide-react';

interface MaintenanceLogsProps {
  logs: MaintenanceLog[];
  devices: Device[];
}

export function MaintenanceLogs({ logs, devices }: MaintenanceLogsProps) {
  const statusIcons = {
    scheduled: <Clock className="h-5 w-5 text-blue-500" />,
    'in-progress': <Tool className="h-5 w-5 text-yellow-500" />,
    completed: <CheckCircle className="h-5 w-5 text-green-500" />,
    cancelled: <XCircle className="h-5 w-5 text-red-500" />
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Maintenance Logs</h2>
      <div className="space-y-4">
        {logs.map(log => {
          const device = devices.find(d => d.id === log.deviceId);
          return (
            <div
              key={log.id}
              className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">{statusIcons[log.status]}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {device?.name}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(log.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {log.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Performed by: {log.performedBy}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      log.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                      log.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                      log.status === 'scheduled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                      'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                  {log.notes && (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Notes: {log.notes}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}