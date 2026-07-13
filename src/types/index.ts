export interface Device {
  id: string;
  name: string;
  type: 'sensor' | 'actuator' | 'gateway';
  status: 'online' | 'offline' | 'maintenance';
  lastSeen: string;
  location?: {
    lat: number;
    lng: number;
    address?: string;
  };
  metrics: {
    temperature?: number;
    humidity?: number;
    power?: number;
    signal?: number;
  };
  tags?: string[];
}

export interface Alert {
  id: string;
  deviceId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  acknowledged: boolean;
  escalationLevel?: number;
  notificationsSent?: {
    type: 'email' | 'sms';
    timestamp: string;
    recipient: string;
  }[];
}

export interface MetricData {
  timestamp: string;
  value: number;
  deviceId: string;
  metricType: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  timestamp: string;
  details: Record<string, unknown>;
}