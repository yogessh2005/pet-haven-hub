import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Order } from '@/types';
import { STORAGE_KEYS } from '@/data/demoData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Clock, 
  Truck, 
  CheckCircle, 
  MapPin, 
  Search,
  ArrowRight,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';

const Tracking: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [trackingNumber, setTrackingNumber] = useState(searchParams.get('track') || '');
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (trackingNumber) {
      handleTrack();
    }
  }, []);

  const handleTrack = () => {
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    const storedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!storedOrders) {
      setError('No orders found');
      setOrder(null);
      return;
    }

    const orders: Order[] = JSON.parse(storedOrders);
    const foundOrder = orders.find(o => o.trackingNumber === trackingNumber.toUpperCase());

    if (!foundOrder) {
      setError('Tracking number not found. Please check and try again.');
      setOrder(null);
      return;
    }

    // Check if user has access to this order
    if (user && !user.isAdmin && foundOrder.userId !== user.id) {
      setError('You do not have access to this order');
      setOrder(null);
      return;
    }

    setOrder(foundOrder);
    setError('');
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="h-5 w-5" />;
      case 'processing': return <Package className="h-5 w-5" />;
      case 'shipped': return <Truck className="h-5 w-5" />;
      case 'delivered': return <CheckCircle className="h-5 w-5" />;
      case 'cancelled': return <CheckCircle className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/10 text-yellow-600 border-yellow-200';
      case 'processing': return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'shipped': return 'bg-purple-500/10 text-purple-600 border-purple-200';
      case 'delivered': return 'bg-green-500/10 text-green-600 border-green-200';
      case 'cancelled': return 'bg-red-500/10 text-red-600 border-red-200';
    }
  };

  const getStatusSteps = (currentStatus: Order['status']) => {
    const steps = [
      { key: 'pending', label: 'Order Placed', icon: Clock },
      { key: 'processing', label: 'Processing', icon: Package },
      { key: 'shipped', label: 'Shipped', icon: Truck },
      { key: 'delivered', label: 'Delivered', icon: CheckCircle },
    ];

    const currentIndex = steps.findIndex(s => s.key === currentStatus);
    
    return steps.map((step, index) => {
      const isCompleted = index <= currentIndex;
      const isCurrent = index === currentIndex;
      const Icon = step.icon;
      
      return {
        ...step,
        isCompleted,
        isCurrent,
        Icon
      };
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-4xl font-bold mb-8">Track Your Order</h1>

          {/* Search Box */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Enter tracking number (e.g., TRK1234567890)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                    onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                    className="pl-10 h-12 text-lg"
                  />
                </div>
                <Button 
                  className="btn-gradient h-12 px-8" 
                  onClick={handleTrack}
                >
                  Track Order
                </Button>
              </div>
              {error && (
                <p className="text-destructive mt-4 text-sm">{error}</p>
              )}
            </CardContent>
          </Card>

          {/* Order Tracking Details */}
          {order && (
            <div className="space-y-6">
              {/* Order Header */}
              <Card>
                <CardHeader className="bg-primary/5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="font-serif text-2xl mb-2">{order.id}</CardTitle>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Ordered on {new Date(order.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          <span>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(order.status)} border-2 px-4 py-2 text-base`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-2 capitalize font-semibold">{order.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
              </Card>

              {/* Tracking Number */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Tracking Number</p>
                      <p className="text-2xl font-bold font-mono">{order.trackingNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                      <p className="text-2xl font-bold text-primary">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Order Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-muted" />
                    
                    <div className="space-y-8">
                      {getStatusSteps(order.status).map((step, index) => {
                        const Icon = step.Icon;
                        return (
                          <div key={step.key} className="relative flex items-start gap-4">
                            <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                              step.isCompleted
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-muted text-muted-foreground border-muted'
                            }`}>
                              <Icon className="h-6 w-6" />
                            </div>
                            <div className="flex-1 pt-1">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className={`font-semibold text-lg ${
                                  step.isCurrent ? 'text-primary' : ''
                                }`}>
                                  {step.label}
                                </h3>
                                {step.isCompleted && (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                )}
                              </div>
                              {step.isCurrent && (
                                <p className="text-sm text-muted-foreground">
                                  Your order is currently at this stage
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Updates */}
              {order.trackingUpdates && order.trackingUpdates.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif">Tracking Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.trackingUpdates
                        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                        .map((update, index) => (
                          <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <MapPin className="h-5 w-5 text-primary" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-semibold">{update.status}</h4>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(update.timestamp).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">{update.description}</p>
                              <p className="text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3 inline mr-1" />
                                {update.location}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Order Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif">Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.items.map(item => (
                        <div key={item.pet.id} className="flex items-center gap-3">
                          <img
                            src={item.pet.image}
                            alt={item.pet.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="font-semibold">{item.pet.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.quantity} x ${item.pet.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif">Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Delivery Address</p>
                      <p className="font-medium">{order.shippingAddress}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{order.phone}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                      <p className="font-medium">{order.paymentMethod}</p>
                    </div>
                    {order.notes && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Delivery Instructions</p>
                        <p className="text-sm">{order.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => navigate('/orders')}
                >
                  View All Orders
                </Button>
                <Button 
                  className="btn-gradient flex-1"
                  onClick={() => navigate('/pets')}
                >
                  Continue Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Help Section */}
          {!order && !error && (
            <Card className="mt-8">
              <CardContent className="p-6 text-center">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-serif text-xl font-semibold mb-2">Track Your Order</h3>
                <p className="text-muted-foreground mb-4">
                  Enter your tracking number above to see the real-time status of your order.
                </p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Your tracking number was sent to your email after order confirmation</p>
                  <p>• You can also find it in your order history</p>
                </div>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => navigate('/orders')}
                >
                  View My Orders
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tracking;

