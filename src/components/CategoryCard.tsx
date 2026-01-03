import React from 'react';
import { Category } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(
      `/pets?category=${encodeURIComponent(category.name.toLowerCase())}`
    );
  };

  return (
    <Card
      className="group overflow-hidden card-hover cursor-pointer active:scale-95 transition-transform duration-150"
      onClick={handleClick}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background/90 dark:from-black/70 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center space-x-2">
            <span
              title={category.description}
              className="text-2xl cursor-help"
            >
              {category.icon}
            </span>
            <h3 className="font-serif text-lg font-semibold text-foreground">
              {category.name}
            </h3>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">
          {category.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
