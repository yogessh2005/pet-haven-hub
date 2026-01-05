import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Order, PaymentMethod } from '@/types';
import { STORAGE_KEYS } from '@/data/demoData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, CreditCard, Smartphone, Wallet, Banknote, ArrowRight } from 'lucide-react';

const Checkout: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!user) {
    navigate('/login');
    return null;
  }

  if (items.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  const shipping = total >= 500 ? 0 : 25;
  const tax = total * 0.1;
  const finalTotal = total + shipping + tax;

  const generateTrackingNumber = () => {
    return `TRK${Date.now()}${Math.floor(Math.random() * 1000)}`;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address || !city || !phone || !pincode) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    if (paymentMethod !== 'COD' && !phone) {
      toast({
        title: 'Payment method requires phone number',
        description: 'Please enter your phone number for digital payment.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const trackingNumber = generateTrackingNumber();
    const order: Order = {
      id: `ORD-${Date.now()}`,
      userId: user.id,
      items: [...items],
      total: finalTotal,
      status: 'pending',
      createdAt: new Date(),
      shippingAddress: `${address}, ${city}, ${state} - ${pincode}`,
      paymentMethod,
      trackingNumber,
      phone,
      city,
      notes,
      trackingUpdates: [
        {
          status: 'Order Placed',
          location: 'Order Processing Center',
          timestamp: new Date(),
          description: 'Your order has been placed successfully and is being processed.'
        }
      ]
    };
    
    const orders: Order[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
    orders.push(order);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    
    setOrderId(order.id);
    clearCart();
    setIsSubmitting(false);
    setOrderPlaced(true);
    
    toast({
      title: 'Order placed successfully!',
      description: `Your order ${order.id} has been confirmed. Tracking: ${trackingNumber}`,
    });
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col bg-muted/20">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center max-w-2xl mx-auto px-4 animate-fade-in-up">
            <div className="mb-6">
              <CheckCircle className="h-24 w-24 mx-auto text-green-500" />
            </div>
            <h2 className="font-serif text-4xl font-bold mb-4">Order Confirmed!</h2>
            <p className="text-muted-foreground mb-2 text-lg">
              Thank you for your order. We've received your order and will begin processing it right away.
            </p>
            <div className="bg-card border-2 rounded-lg p-6 my-6 text-left">
              <div className="space-y-2">
                <p><span className="font-semibold">Order ID:</span> {orderId}</p>
                <p><span className="font-semibold">Payment Method:</span> {paymentMethod}</p>
                <p><span className="font-semibold">Total Amount:</span> ${finalTotal.toFixed(2)}</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-8">
              You'll receive an email with order details and tracking information shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-gradient h-12 px-8" onClick={() => navigate('/orders')}>
                View My Orders
              </Button>
              <Button variant="outline" className="h-12 px-8" onClick={() => navigate('/pets')}>
                Continue Shopping
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const paymentMethods = [
    {
      value: 'COD' as PaymentMethod,
      label: 'Cash on Delivery',
      icon: Banknote,
      description: 'Pay when you receive your order'
    },
    {
      value: 'GPay' as PaymentMethod,
      label: 'Google Pay',
      icon: Smartphone,
      description: 'Pay using Google Pay'
    },
    {
      value: 'PhonePe' as PaymentMethod,
      label: 'PhonePe',
      icon: Wallet,
      description: 'Pay using PhonePe wallet'
    },
    {
      value: 'Paytm' as PaymentMethod,
      label: 'Paytm',
      icon: CreditCard,
      description: 'Pay using Paytm wallet'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="font-serif text-4xl font-bold mb-8">Checkout</h1>

          <form onSubmit={handlePlaceOrder}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Forms */}
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-xl">Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" value={user.name} disabled className="bg-muted" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" value={user.email} disabled className="bg-muted" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your 10-digit phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        maxLength={10}
                        pattern="[0-9]{10}"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        placeholder="House/Flat No., Building Name, Street"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          placeholder="Enter your city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          placeholder="Enter your state"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode *</Label>
                        <Input
                          id="pincode"
                          placeholder="Enter pincode"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          required
                          maxLength={6}
                          pattern="[0-9]{6}"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Delivery Instructions (Optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any special instructions for delivery (e.g., leave at door, call before delivery)..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-xl">Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      value={paymentMethod} 
                      onValueChange={(value) => {
                        setPaymentMethod(value as PaymentMethod);
                      }}
                      className="space-y-3"
                    >
                      {paymentMethods.map((method) => {
                        const Icon = method.icon;
                        const isSelected = paymentMethod === method.value;
                        return (
                          <div key={method.value}>
                            <RadioGroupItem 
                              value={method.value} 
                              id={method.value} 
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={method.value}
                              className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                isSelected 
                                  ? 'border-primary bg-primary/5 shadow-md' 
                                  : 'border-border hover:border-primary/50 hover:bg-muted/30'
                              }`}
                            >
                              <div className={`p-2 rounded-lg transition-colors ${
                                isSelected ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                              }`}>
                                <Icon className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold">{method.label}</div>
                                <div className="text-sm text-muted-foreground">{method.description}</div>
                              </div>
                              {isSelected && (
                                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-white" />
                                </div>
                              )}
                            </Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Order Items Review */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-xl">Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {items.map(item => (
                        <div key={item.pet.id} className="flex items-center gap-4 pb-4 border-b last:border-0">
                          <img
                            src={item.pet.image}
                            alt={item.pet.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="font-semibold">{item.pet.name}</p>
                            <p className="text-sm text-muted-foreground">Breed: {item.pet.breed}</p>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-lg">${(item.pet.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Order Summary */}
              <div>
                <Card className="sticky top-24 border-2">
                  <CardHeader>
                    <CardTitle className="font-serif text-xl">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (10%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    {total < 500 && (
                      <div className="text-xs text-primary bg-primary/10 p-2 rounded">
                        Add ${(500 - total).toFixed(2)} more for free shipping!
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-primary">${finalTotal.toFixed(2)}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full btn-gradient h-12 text-lg" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Place Order
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
