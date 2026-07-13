import React from 'react';
import { Device } from '../../types';
import { Thermometer, Droplets, Zap, Signal, Circle } from 'lucide-react';

interface DeviceCardProps {
  device: Device;
}

export function DeviceCard({ device }: DeviceCardProps) {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-red-500',
    maintenance: 'bg-yellow-500'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all hover:shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{device.name}</h3>
        <div className="flex items-center">
          <Circle className={`h-3 w-3 ${statusColors[device.status]} rounded-full mr-2`} />
          <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">{device.status}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {device.metrics.temperature !== undefined && (
          <div className="flex items-center">
            <Thermometer className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-gray-700 dark:text-gray-200">
              {Math.round(device.metrics.temperature)}°C
            </span>
          </div>
        )}
        
        {device.metrics.humidity !== undefined && (
          <div className="flex items-center">
            <Droplets className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-gray-700 dark:text-gray-200">
              {Math.round(device.metrics.humidity)}%
            </span>
          </div>
        )}
        
        {device.metrics.power !== undefined && (
          <div className="flex items-center">
            <Zap className="h-5 w-5 text-yellow-500 mr-2" />
            <span className="text-gray-700 dark:text-gray-200">
              {Math.round(device.metrics.power)}W
            </span>
          </div>
        )}
        
        {device.metrics.signal !== undefined && (
          <div className="flex items-center">
            <Signal className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-gray-700 dark:text-gray-200">
              {Math.round(device.metrics.signal)}dBm
            </span>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Last seen: {new Date(device.lastSeen).toLocaleString()}
      </div>
    </div>
  );
}