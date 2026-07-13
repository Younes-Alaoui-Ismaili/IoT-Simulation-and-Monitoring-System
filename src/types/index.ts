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
  groupId?: string;
  metrics: {
    temperature?: number;
    humidity?: number;
    power?: number;
    signal?: number;
  };
  maintenanceSchedule?: {
    nextDate: string;
    description: string;
    assignedTo?: string;
  };
  tags?: string[];
}

export interface DeviceGroup {
  id: string;
  name: string;
  description?: string;
  parentGroupId?: string;
  devices: string[];
  createdAt: string;
  updatedAt: string;
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

export interface MaintenanceLog {
  id: string;
  deviceId: string;
  date: string;
  description: string;
  performedBy: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  condition: {
    deviceId: string;
    metric: string;
    operator: '>' | '<' | '==' | '>=' | '<=';
    value: number;
  };
  action: {
    type: 'notification' | 'deviceCommand' | 'maintenance';
    params: Record<string, any>;
  };
  enabled: boolean;
  createdAt: string;
  lastTriggered?: string;
}

export interface DashboardLayout {
  id: string;
  name: string;
  userId: string;
  widgets: {
    id: string;
    type: 'chart' | 'metrics' | 'alerts' | 'map' | 'custom';
    position: { x: number; y: number; w: number; h: number };
    config: Record<string, any>;
  }[];
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  timestamp: string;
  details: Record<string, any>;
}