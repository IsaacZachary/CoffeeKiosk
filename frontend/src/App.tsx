import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Index from '@/pages/Index';
import Transactions from '@/pages/Transactions';
import About from '@/pages/About';

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="coffee-kiosk-theme">
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
