import React from 'react';
import { Alert } from '../../types';
import { AlertTriangle, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface AlertsListProps {
  alerts: Alert[];
  onAcknowledge: (alertId: string) => void;
}

export function AlertsList({ alerts, onAcknowledge }: AlertsListProps) {
  const severityIcons = {
    low: <AlertCircle className="h-5 w-5 text-blue-500" />,
    medium: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    high: <AlertTriangle className="h-5 w-5 text-orange-500" />,
    critical: <XCircle className="h-5 w-5 text-red-500" />
  };

  const severityClasses = {
    low: 'border-blue-200 bg-blue-50 dark:bg-blue-900/20',
    medium: 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20',
    high: 'border-orange-200 bg-orange-50 dark:bg-orange-900/20',
    critical: 'border-red-200 bg-red-50 dark:bg-red-900/20'
  };

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`border rounded-lg p-4 ${severityClasses[alert.severity]} transition-all`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              {severityIcons[alert.severity]}
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {alert.message}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(alert.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
            
            {!alert.acknowledged && (
              <button
                onClick={() => onAcknowledge(alert.id)}
                className="flex items-center space-x-1 text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Acknowledge</span>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}