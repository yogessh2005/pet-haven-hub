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
import { Package, Clock, Truck, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

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
      case 'pending': return 'bg-yellow-500/10 text-yellow-600';
      case 'processing': return 'bg-blue-500/10 text-blue-600';
      case 'shipped': return 'bg-purple-500/10 text-purple-600';
      case 'delivered': return 'bg-green-500/10 text-green-600';
      case 'cancelled': return 'bg-red-500/10 text-red-600';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="font-serif text-2xl font-semibold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
            <Button className="btn-gradient" onClick={() => navigate('/pets')}>
              Browse Pets <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl font-bold mb-8">
            {user?.isAdmin ? 'All Orders' : 'My Orders'}
          </h1>

          <div className="space-y-6">
            {orders.map(order => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="font-serif text-lg">{order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </Badge>
                      <span className="font-serif text-xl font-bold text-primary">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Items */}
                    <div>
                      <h4 className="font-medium mb-3">Items ({order.items.length})</h4>
                      <div className="space-y-3">
                        {order.items.map(item => (
                          <div key={item.pet.id} className="flex items-center gap-3">
                            <img
                              src={item.pet.image}
                              alt={item.pet.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.pet.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.quantity} x ${item.pet.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping */}
                    <div>
                      <h4 className="font-medium mb-3">Shipping Address</h4>
                      <p className="text-sm text-muted-foreground">{order.shippingAddress}</p>
                      
                      {/* Order Timeline */}
                      <div className="mt-4">
                        <h4 className="font-medium mb-3">Order Status</h4>
                        <div className="flex items-center gap-2">
                          {['pending', 'processing', 'shipped', 'delivered'].map((status, index) => (
                            <React.Fragment key={status}>
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                ['pending', 'processing', 'shipped', 'delivered'].indexOf(order.status) >= index
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted text-muted-foreground'
                              }`}>
                                {index + 1}
                              </div>
                              {index < 3 && (
                                <div className={`flex-1 h-1 ${
                                  ['pending', 'processing', 'shipped', 'delivered'].indexOf(order.status) > index
                                    ? 'bg-primary'
                                    : 'bg-muted'
                                }`} />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>Pending</span>
                          <span>Processing</span>
                          <span>Shipped</span>
                          <span>Delivered</span>
                        </div>
                      </div>
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
