import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Coffee } from "@/types";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";

interface ProductCardProps {
  coffee: Coffee;
  onBuyClick: (coffee: Coffee) => void;
}

const ProductCard = ({ coffee, onBuyClick }: ProductCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg"
    >
      <div className="relative h-48 overflow-hidden group">
        <motion.img 
          src={coffee.image} 
          alt={coffee.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          whileHover={{ scale: 1.1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-sm">{coffee.description}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-foreground">{coffee.name}</h3>
          <span className="text-lg font-semibold text-primary">
            KES {coffee.price}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{coffee.origin}</Badge>
            <Badge variant="outline">{coffee.roast} roast</Badge>
            <Badge variant="outline">{coffee.caffeine} caffeine</Badge>
          </div>

          <div className="flex flex-wrap gap-1">
            {coffee.flavor.map((flavor, index) => (
              <Badge key={index} variant="ghost" className="text-xs">
                {flavor}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Info className="w-4 h-4 mr-1" />
            Details
          </Button>
          <Button 
            onClick={() => onBuyClick(coffee)}
            className="bg-primary hover:bg-primary/90"
          >
            Buy with M-PESA
          </Button>
        </div>

        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t"
          >
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><span className="font-medium">Acidity:</span> {coffee.acidity}</p>
              <p><span className="font-medium">Body:</span> {coffee.body}</p>
              <div className="bg-muted p-2 rounded-md">
                <p className="font-mono text-xs">{coffee.code}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
