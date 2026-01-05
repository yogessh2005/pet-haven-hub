export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

export interface Pet {
  id: string;
  name: string;
  category: string;
  breed: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  status: 'available' | 'out_of_stock' | 'unavailable';
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  image: string;
}

export interface CartItem {
  pet: Pet;
  quantity: number;
}

export type PaymentMethod = 'COD' | 'GPay' | 'PhonePe' | 'Paytm';

export interface TrackingUpdate {
  status: string;
  location: string;
  timestamp: Date;
  description: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  shippingAddress: string;
  paymentMethod: PaymentMethod;
  trackingNumber?: string;
  trackingUpdates?: TrackingUpdate[];
  phone: string;
  city: string;
  notes?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}
