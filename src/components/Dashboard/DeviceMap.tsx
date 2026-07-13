import React from 'react';
import { Device } from '../../types';

interface DeviceMapProps {
  devices: Device[];
}

export function DeviceMap({ devices }: DeviceMapProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Device Locations</h2>
      <div className="h-[600px] w-full bg-gray-100 dark:bg-gray-700 rounded-lg">
        {/* Map implementation would go here */}
        <div className="p-4">
          <p className="text-gray-600 dark:text-gray-400">Map view coming soon...</p>
          <div className="mt-4 space-y-4">
            {devices.map(device => (
              <div key={device.id} className="flex items-start space-x-4">
                <div className={`h-3 w-3 rounded-full mt-1.5 ${
                  device.status === 'online' ? 'bg-green-500' :
                  device.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{device.name}</h3>
                  {device.location && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {device.location.address || `${device.location.lat}, ${device.location.lng}`}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}