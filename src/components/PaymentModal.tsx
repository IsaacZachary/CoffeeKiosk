
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Coffee, PaymentData } from "@/types";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  coffee: Coffee | null;
}

const PaymentModal = ({ isOpen, onClose, coffee }: PaymentModalProps) => {
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validatePhone = (value: string): boolean => {
    const phoneRegex = /^(?:(?:\+|0{0,2})254|0)7[0-9]{8}$/;
    if (!value) {
      setPhoneError("Phone number is required");
      return false;
    }
    if (!phoneRegex.test(value)) {
      setPhoneError("Invalid Safaricom number. Use format: 07XXXXXXXX, 254XXXXXXXX, or +254XXXXXXXX");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const formatPhone = (value: string): string => {
    // Convert to standard format (2547XXXXXXXX)
    if (value.startsWith("+")) {
      return value.substring(1);
    }
    if (value.startsWith("07")) {
      return "254" + value.substring(1);
    }
    return value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!coffee) return;
    
    if (!validatePhone(phone)) {
      return;
    }

    const formattedPhone = formatPhone(phone);
    
    const paymentData: PaymentData = {
      phone: formattedPhone,
      amount: coffee.price
    };

    setIsLoading(true);

    try {
      // For demo purposes, we'll simulate the API call
      // In production, uncomment this line and replace with actual endpoint
      // const response = await axios.post("http://localhost:3000/pay", paymentData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "STK Push sent!",
        description: "Please authorize payment on your phone.",
        variant: "default",
      });
      
      setPhone("");
      onClose();
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment failed",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Pay with M-PESA
          </DialogTitle>
        </DialogHeader>
        
        {coffee && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-2 border-b">
              <img 
                src={coffee.image} 
                alt={coffee.name}
                className="w-16 h-16 rounded-md object-cover" 
              />
              <div>
                <h3 className="font-medium">{coffee.name}</h3>
                <p className="text-lg font-bold text-coffee">KES {coffee.price}</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Safaricom Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="07XXXXXXXX or +2547XXXXXXXX"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (phoneError) validatePhone(e.target.value);
                  }}
                  className={phoneError ? "border-red-500" : ""}
                />
                {phoneError && (
                  <p className="text-red-500 text-xs">{phoneError}</p>
                )}
                <p className="text-xs text-gray-500">
                  We will send an M-PESA STK push to this number
                </p>
              </div>
              
              <DialogFooter className="mt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Pay Now"}
                </Button>
              </DialogFooter>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
