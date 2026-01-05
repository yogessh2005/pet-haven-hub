import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Package, Shield, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  const shipping = total >= 500 ? 0 : 25;
  const tax = total * 0.1;
  const finalTotal = total + shipping + tax;

  /* ================= EMPTY CART ================= */
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-muted/20">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="mb-6">
              <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground/50" />
            </div>
            <h2 className="font-serif text-3xl font-bold mb-3">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Looks like you haven't added any pets to your cart yet. Start shopping to find your perfect companion!
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

  /* ================= CART PAGE - AMAZON STYLE ================= */
  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar />

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Shopping Cart</span>
          </div>

          <div className="flex items-center justify-between mb-6">
            <h1 className="font-serif text-3xl font-bold">Shopping Cart</h1>
            <span className="text-muted-foreground">Price</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* ================= CART ITEMS - LEFT SIDE ================= */}
            <div className="lg:col-span-8 space-y-4">
              {/* Cart Header */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-primary" />
                      <span className="font-semibold">
                        {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearCart}
                      className="text-destructive hover:text-destructive"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Cart Items */}
              {items.map((item) => (
                <Card key={item.pet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      {/* Product Image */}
                      <div className="w-full sm:w-48 h-48 sm:h-48 shrink-0 bg-muted/50 flex items-center justify-center">
                        <img
                          src={item.pet.image}
                          alt={item.pet.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex-1">
                              <Link to={`/pet/${item.pet.id}`}>
                                <h3 className="font-serif text-xl font-semibold hover:text-primary transition-colors mb-1">
                                  {item.pet.name}
                                </h3>
                              </Link>
                              <p className="text-sm text-muted-foreground mb-2">
                                Breed: {item.pet.breed}
                              </p>
                              {item.pet.status === 'available' && (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  In Stock
                                </Badge>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="font-serif text-2xl font-bold text-primary mb-1">
                                ${(item.pet.price * item.quantity).toFixed(2)}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-xs text-muted-foreground">
                                  ${item.pet.price.toFixed(2)} each
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-muted-foreground">Quantity:</span>
                            <div className="flex items-center border rounded-lg">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 rounded-r-none"
                                onClick={() => updateQuantity(item.pet.id, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-12 text-center text-sm font-semibold border-x">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 rounded-l-none"
                                onClick={() => updateQuantity(item.pet.id, item.quantity + 1)}
                                disabled={item.quantity >= item.pet.stock}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            {item.quantity >= item.pet.stock && (
                              <span className="text-xs text-destructive">Max stock reached</span>
                            )}
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeFromCart(item.pet.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Subtotal for items */}
              <div className="text-right text-lg">
                <span className="text-muted-foreground">Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'}): </span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* ================= ORDER SUMMARY - RIGHT SIDE ================= */}
            <div className="lg:col-span-4">
              <Card className="sticky top-24 border-2">
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
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
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between text-xl font-bold mb-6">
                    <span>Total</span>
                    <span className="text-primary">${finalTotal.toFixed(2)}</span>
                  </div>

                  <Button 
                    className="w-full btn-gradient h-12 text-lg mb-4" 
                    onClick={handleCheckout}
                  >
                    {user ? 'Proceed to Checkout' : 'Login to Checkout'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  {!user && (
                    <p className="text-xs text-center text-muted-foreground">
                      You need to be logged in to checkout
                    </p>
                  )}

                  {/* Trust Badges */}
                  <div className="mt-6 space-y-3 pt-6 border-t">
                    <div className="flex items-center gap-3 text-sm">
                      <Shield className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Truck className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">
                        {shipping === 0 ? 'Free Shipping' : 'Fast Delivery'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Package className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">30-Day Health Guarantee</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
