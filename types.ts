export interface Metric {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
}

export interface ChartDataPoint {
  name: string;
  revenue: number;
}

export interface ActivityItem {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  target: string;
  timestamp: string;
}

export interface SubscriptionTier {
    name: string;
    price: string;
    features: string[];
    isPopular: boolean;
}

export interface ChatMessage {
    id: number;
    sender: 'user' | 'ai';
    text: string;
}