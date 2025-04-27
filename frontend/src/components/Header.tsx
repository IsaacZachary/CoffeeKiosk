import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="sticky top-0 z-30 w-full bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Coffee className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Coffee Kiosk</h1>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <nav>
            <Link 
              to="/transactions" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Transactions
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
