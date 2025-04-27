import React from 'react';
import { motion } from 'framer-motion';
import { useCartStore, usePaymentStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Printer } from 'lucide-react';
import { initiatePayment } from '@/lib/api';

const Cart = () => {
  const { items, removeItem, clearCart, getTotal } = useCartStore();
  const { isProcessing, setProcessing, setError } = usePaymentStore();
  const { toast } = useToast();

  const total = getTotal();
  const waitTime = Math.max(...items.map(item => item.waitTime || 0));

  const handleCheckout = async () => {
    try {
      setProcessing(true);
      setError(null);
      
      // Here you would typically collect the phone number and process payment
      // For now, we'll just show a success message
      toast({
        title: "Order placed successfully!",
        description: `Your order will be ready in ${waitTime} minutes.`,
      });
      clearCart();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to process payment');
      toast({
        title: "Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handlePrintReceipt = () => {
    const receipt = `
      Coffee Kiosk Receipt
      --------------------
      ${items.map(item => `${item.name} x${item.quantity} - KES ${item.price * item.quantity}`).join('\n')}
      --------------------
      Total: KES ${total}
      Estimated Wait Time: ${waitTime} minutes
      --------------------
      Thank you for your order!
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`<pre>${receipt}</pre>`);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Add some items to your cart to get started.</p>
          <Button asChild>
            <a href="/">Continue Shopping</a>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-foreground mb-6">Your Cart</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-4 bg-card p-4 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">KES {item.price}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg h-fit">
            <h2 className="text-xl font-semibold text-foreground mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">KES {total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Wait Time</span>
                <span className="font-semibold">{waitTime} minutes</span>
              </div>
            </div>
            <div className="space-y-2">
              <Button
                className="w-full"
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Checkout'}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handlePrintReceipt}
              >
                <Printer className="w-4 h-4 mr-2" />
                Print Receipt
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Cart; 