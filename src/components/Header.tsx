
import React from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-coffee rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">CK</span>
          </div>
          <h1 className="text-xl font-bold text-coffee-dark">Coffee Kiosk</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
