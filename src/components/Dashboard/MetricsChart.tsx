import React from 'react';
import { MetricData } from '../../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MetricsChartProps {
  data: MetricData[];
  metricName: string;
  color: string;
}

export function MetricsChart({ data, metricName, color }: MetricsChartProps) {
  return (
    <div className="h-[300px] w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        {metricName} Over Time
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.map(item => ({
          ...item,
          value: Math.round(item.value)
        }))} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
            stroke="#6B7280"
          />
          <YAxis stroke="#6B7280" tickFormatter={(value) => Math.round(value)} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '0.5rem',
              color: '#F3F4F6'
            }}
            labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
            formatter={(value) => [Math.round(value), '']}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}