import React from 'react';
import { Category } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Package } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  petCount?: number;
  viewMode?: 'grid' | 'list';
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  petCount = 0,
  viewMode = 'grid'
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pets?category=${encodeURIComponent(category.name.toLowerCase())}`);
  };

  if (viewMode === 'list') {
    return (
      <Card
        className="group overflow-hidden card-hover cursor-pointer border-2"
        onClick={handleClick}
      >
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-64 h-48 sm:h-auto shrink-0 overflow-hidden">
            <img
              src={category.image}
              alt={category.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="text-4xl" title={category.description}>
                {category.icon}
              </span>
            </div>
          </div>

          <CardContent className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif text-2xl font-bold group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                {petCount > 0 && (
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    <Package className="h-3 w-3 mr-1" />
                    {petCount} {petCount === 1 ? 'pet' : 'pets'}
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
                {category.description}
              </p>
            </div>
            <Button 
              className="w-full sm:w-auto btn-gradient group-hover:shadow-lg transition-all"
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
            >
              Explore {category.name}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </div>
      </Card>
    );
  }

  // Grid View
  return (
    <Card
      className="group overflow-hidden card-hover cursor-pointer border-2 h-full flex flex-col"
      onClick={handleClick}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Icon and Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-3">
          <span className="text-4xl drop-shadow-lg" title={category.description}>
            {category.icon}
          </span>
          {petCount > 0 && (
            <Badge className="bg-primary text-primary-foreground border-0 shadow-lg">
              <Package className="h-3 w-3 mr-1" />
              {petCount}
            </Badge>
          )}
        </div>

        {/* Category Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="font-serif text-2xl font-bold text-white mb-2 drop-shadow-lg">
            {category.name}
          </h3>
        </div>
      </div>

      <CardContent className="p-6 flex-1 flex flex-col">
        <p className="text-muted-foreground mb-4 flex-1 leading-relaxed">
          {category.description}
        </p>
        <Button 
          className="w-full btn-gradient group-hover:shadow-lg transition-all"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          View Pets
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
