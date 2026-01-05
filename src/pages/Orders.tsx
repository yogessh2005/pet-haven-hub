import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Order } from '@/types';
import { STORAGE_KEYS } from '@/data/demoData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Clock, Truck, CheckCircle, XCircle, ArrowRight, MapPin, Phone, CreditCard } from 'lucide-react';

const Orders: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const storedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (storedOrders) {
      const allOrders: Order[] = JSON.parse(storedOrders);
      const userOrders = user.isAdmin ? allOrders : allOrders.filter(o => o.userId === user.id);
      setOrders(userOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }
  }, [user, navigate]);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
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

  const handleTrackOrder = (trackingNumber?: string) => {
    if (trackingNumber) {
      navigate(`/tracking?track=${trackingNumber}`);
    } else {
      navigate('/tracking');
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-muted/20">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center max-w-md mx-auto px-4">
            <Package className="h-24 w-24 mx-auto text-muted-foreground/50 mb-6" />
            <h2 className="font-serif text-3xl font-bold mb-3">No orders yet</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Start shopping to see your orders here. Your order history will appear once you make a purchase.
            </p>
            <Button className="btn-gradient h-12 px-8 text-lg" onClick={() => navigate('/pets')}>
              Browse Pets <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-serif text-4xl font-bold">
              {user?.isAdmin ? 'All Orders' : 'My Orders'}
            </h1>
            <Button 
              variant="outline"
              onClick={() => navigate('/tracking')}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Track Order
            </Button>
          </div>

          <div className="space-y-6">
            {orders.map(order => (
              <Card key={order.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-primary/5 border-b">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="font-serif text-xl">{order.id}</CardTitle>
                        <Badge className={`${getStatusColor(order.status)} border`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize font-semibold">{order.status}</span>
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span>
                          Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        {order.trackingNumber && (
                          <span className="font-mono font-semibold text-primary">
                            {order.trackingNumber}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                      <p className="font-serif text-2xl font-bold text-primary">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Items */}
                    <div className="lg:col-span-2">
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Items ({order.items.length})
                      </h4>
                      <div className="space-y-3">
                        {order.items.map(item => (
                          <div key={item.pet.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                            <img
                              src={item.pet.image}
                              alt={item.pet.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <p className="font-semibold">{item.pet.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Breed: {item.pet.breed}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {item.quantity} x ${item.pet.price.toFixed(2)} = ${(item.pet.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping & Payment Info */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Shipping Address
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">{order.shippingAddress}</p>
                        {order.phone && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {order.phone}
                          </div>
                        )}
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Payment Method
                        </h4>
                        <Badge variant="outline" className="text-sm">
                          {order.paymentMethod}
                        </Badge>
                      </div>

                      {/* Order Timeline */}
                      <div>
                        <h4 className="font-semibold mb-3">Order Status</h4>
                        <div className="space-y-2">
                          {['pending', 'processing', 'shipped', 'delivered'].map((status, index) => {
                            const isActive = ['pending', 'processing', 'shipped', 'delivered'].indexOf(order.status) >= index;
                            const isCurrent = ['pending', 'processing', 'shipped', 'delivered'].indexOf(order.status) === index;
                            
                            return (
                              <div key={status} className="flex items-center gap-2">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                                  isActive
                                    ? isCurrent
                                      ? 'bg-primary text-primary-foreground'
                                      : 'bg-green-500 text-white'
                                    : 'bg-muted text-muted-foreground'
                                }`}>
                                  {isActive && !isCurrent ? '✓' : index + 1}
                                </div>
                                <span className={`text-sm ${isActive ? 'font-medium' : 'text-muted-foreground'}`}>
                                  {status.charAt(0).toUpperCase() + status.slice(1)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Track Button */}
                      {order.trackingNumber && (
                        <Button 
                          className="w-full btn-gradient"
                          onClick={() => handleTrackOrder(order.trackingNumber)}
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          Track Order
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Orders;
