import React from 'react';
import { Pet } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

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
    <Card className="group overflow-hidden card-hover cursor-pointer" onClick={() => navigate(`/pet/${pet.id}`)}>
      <div className="relative overflow-hidden aspect-square">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          {getStatusBadge()}
        </div>
        <button 
          className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            // Add to wishlist functionality
          }}
        >
          <Heart className="h-4 w-4 text-primary" />
        </button>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-serif text-lg font-semibold">{pet.name}</h3>
            <p className="text-sm text-muted-foreground">{pet.breed}</p>
          </div>
          <Badge variant="outline" className="text-xs">
            {pet.category}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {pet.description}
        </p>
        <p className="font-serif text-xl font-bold text-primary">${pet.price}</p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full btn-gradient"
          disabled={pet.status !== 'available'}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(pet);
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PetCard;
