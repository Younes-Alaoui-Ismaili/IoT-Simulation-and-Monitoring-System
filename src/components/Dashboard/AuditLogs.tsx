import React from 'react';
import { AuditLog } from '../../types';
import { Activity, User, Calendar } from 'lucide-react';

interface AuditLogsProps {
  logs: AuditLog[];
}

export function AuditLogs({ logs }: AuditLogsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Audit Logs</h2>
      <div className="space-y-4">
        {logs.map(log => (
          <div
            key={log.id}
            className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-start space-x-4">
              <Activity className="h-5 w-5 text-blue-500 mt-1" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {log.action} {log.resource}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(log .timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {log.userId}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(log.timestamp).toLocaleString()}
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  <pre className="whitespace-pre-wrap font-mono bg-gray-50 dark:bg-gray-900 p-2 rounded">
                    {JSON.stringify(log.details, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}