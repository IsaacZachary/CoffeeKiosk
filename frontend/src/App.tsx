import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Index from '@/pages/Index';
import Transactions from '@/pages/Transactions';
import About from '@/pages/About';
import Dashboard from '@/pages/Dashboard';
import Cart from '@/pages/Cart';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="coffee-kiosk-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <div className="min-h-screen bg-background text-foreground">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
