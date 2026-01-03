import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Pet } from '@/types';
import { STORAGE_KEYS } from '@/data/demoData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Heart, ArrowLeft, Minus, Plus, Check, Truck, Shield } from 'lucide-react';

const PetDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [pet, setPet] = useState<Pet | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const storedPets = localStorage.getItem(STORAGE_KEYS.PETS);
    if (storedPets) {
      const pets: Pet[] = JSON.parse(storedPets);
      const found = pets.find(p => p.id === id);
      setPet(found || null);
    }
  }, [id]);

  if (!pet) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <span className="text-6xl mb-4 block">🔍</span>
            <h2 className="font-serif text-2xl font-semibold mb-2">Pet not found</h2>
            <Button onClick={() => navigate('/pets')}>Browse Pets</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getStatusBadge = () => {
    switch (pet.status) {
      case 'available':
        return <Badge className="bg-secondary text-secondary-foreground">Available</Badge>;
      case 'out_of_stock':
        return <Badge variant="destructive">Out of Stock</Badge>;
      case 'unavailable':
        return <Badge variant="secondary">Unavailable</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-full object-cover"
              />
              <button className="absolute top-4 right-4 p-3 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors">
                <Heart className="h-5 w-5 text-primary" />
              </button>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {getStatusBadge()}
                  <Badge variant="outline">{pet.category}</Badge>
                </div>
                <h1 className="font-serif text-4xl font-bold mb-2">{pet.name}</h1>
                <p className="text-xl text-muted-foreground">{pet.breed}</p>
              </div>

              <p className="font-serif text-4xl font-bold text-primary">${pet.price}</p>

              <p className="text-muted-foreground leading-relaxed">{pet.description}</p>

              {/* Stock Info */}
              <div className="flex items-center gap-2 text-sm">
                {pet.status === 'available' ? (
                  <>
                    <Check className="h-4 w-4 text-secondary" />
                    <span className="text-secondary font-medium">{pet.stock} in stock</span>
                  </>
                ) : (
                  <span className="text-destructive">Currently unavailable</span>
                )}
              </div>

              {/* Quantity and Add to Cart */}
              {pet.status === 'available' && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.min(pet.stock, quantity + 1))}
                      disabled={quantity >= pet.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button 
                    className="flex-1 btn-gradient h-12"
                    onClick={() => addToCart(pet, quantity)}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                </div>
              )}

              {/* Features */}
              <div className="border-t pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Safe Delivery</p>
                    <p className="text-sm text-muted-foreground">Free delivery for orders over $500</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Health Guarantee</p>
                    <p className="text-sm text-muted-foreground">30-day health guarantee included</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PetDetail;
