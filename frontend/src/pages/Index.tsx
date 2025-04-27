import React, { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import PaymentModal from '@/components/PaymentModal';
import { coffees } from '@/data/coffees';
import { Coffee } from '@/types';

const Index = () => {
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyClick = (coffee: Coffee) => {
    setSelectedCoffee(coffee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-coffee-dark text-center">
            Premium Coffee Selection
          </h2>
          <p className="text-gray-600 text-center mt-2 max-w-2xl mx-auto">
            Choose from our curated selection of premium coffees and pay instantly with M-PESA
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coffees.map((coffee) => (
            <ProductCard 
              key={coffee.id} 
              coffee={coffee} 
              onBuyClick={handleBuyClick}
            />
          ))}
        </div>
      </main>
      
      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        coffee={selectedCoffee} 
      />
    </div>
  );
};

export default Index;
