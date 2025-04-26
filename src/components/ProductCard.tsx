
import React from 'react';
import { Button } from "@/components/ui/button";
import { Coffee } from "@/types";

interface ProductCardProps {
  coffee: Coffee;
  onBuyClick: (coffee: Coffee) => void;
}

const ProductCard = ({ coffee, onBuyClick }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg animate-fade-in">
      <div className="h-48 overflow-hidden">
        <img 
          src={coffee.image} 
          alt={coffee.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-coffee-dark">{coffee.name}</h3>
          <span className="text-lg font-semibold text-coffee">
            KES {coffee.price}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{coffee.description}</p>
        <Button 
          onClick={() => onBuyClick(coffee)}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Buy with M-PESA
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
