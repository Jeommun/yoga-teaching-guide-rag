
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-xs mx-auto">
      {selectedCategory ? (
        <div className="flex items-center">
          <Badge 
            variant="secondary" 
            className="px-2 py-0.5 text-xs bg-primary/20 hover:bg-primary/30"
          >
            {selectedCategory}
            <button 
              className="ml-1 hover:text-destructive"
              onClick={() => onSelectCategory(null)}
            >
              <X size={12} />
            </button>
          </Badge>
        </div>
      ) : (
        <>
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline" 
              size="sm" 
              className="text-xs px-2 py-0.5 h-6 rounded-full bg-yogaTeal-light hover:bg-yogaTeal text-foreground"
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </Button>
          ))}
        </>
      )}
    </div>
  );
};

export default CategoryFilter;
