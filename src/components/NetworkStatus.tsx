import React from 'react';
import { WifiOff, Wifi } from 'lucide-react';

interface NetworkStatusProps {
  isOnline: boolean;
  lastSync?: string;
  onRetry: () => void;
}

export function NetworkStatus({ isOnline, lastSync, onRetry }: NetworkStatusProps) {
  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
      isOnline ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
    }`}>
      <div className="flex items-center space-x-3">
        {isOnline ? (
          <Wifi className="h-5 w-5 text-green-500 dark:text-green-400" />
        ) : (
          <WifiOff className="h-5 w-5 text-red-500 dark:text-red-400" />
        )}
        <div>
          <p className={`text-sm font-medium ${
            isOnline ? 'text-green-700 dark:text-green-200' : 'text-red-700 dark:text-red-200'
          }`}>
            {isOnline ? 'Connected' : 'Network Error'}
          </p>
          {lastSync && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Last sync: {new Date(lastSync).toLocaleString()}
            </p>
          )}
        </div>
        {!isOnline && (
          <button
            onClick={onRetry}
            className="ml-4 px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 rounded-md transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}