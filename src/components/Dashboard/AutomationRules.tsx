import React from 'react';
import { AutomationRule, Device } from '../../types';
import { Play, Pause, Clock } from 'lucide-react';

interface AutomationRulesProps {
  rules: AutomationRule[];
  devices: Device[];
}

export function AutomationRules({ rules, devices }: AutomationRulesProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Automation Rules</h2>
      <div className="space-y-4">
        {rules.map(rule => {
          const device = devices.find(d => d.id === rule.condition.deviceId);
          return (
            <div
              key={rule.id}
              className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{rule.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    When {device?.name} {rule.condition.metric} is {rule.condition.operator} {rule.condition.value}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Action: {rule.action.type} - {JSON.stringify(rule.action.params)}
                  </p>
                  {rule.lastTriggered && (
                    <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      Last triggered: {new Date(rule.lastTriggered).toLocaleString()}
                    </div>
                  )}
                </div>
                <button
                  className={`p-2 rounded-full ${
                    rule.enabled
                      ? 'text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/20'
                      : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {rule.enabled ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}