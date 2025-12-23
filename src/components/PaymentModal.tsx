import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, CreditCard, Banknote } from "lucide-react";
import { CartItem } from "@/types/product";
import upiQR from "@/assets/upi-qr.png";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: CartItem[];
  onPlaceOrder: (paymentMethod: "cod" | "online") => void;
}

const PaymentModal = ({ open, onOpenChange, cartItems, onPlaceOrder }: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    onPlaceOrder(paymentMethod);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Choose Payment Method
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Order Summary */}
          <div className="bg-secondary/50 rounded-xl p-4">
            <h4 className="font-semibold text-foreground mb-2">Order Summary</h4>
            <div className="space-y-1 text-sm">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-muted-foreground">
                  <span>{item.name} × {item.quantity} {item.unit}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-2 pt-2 flex justify-between font-bold text-foreground">
              <span>Total</span>
              <span className="text-primary">₹{totalPrice}</span>
            </div>
          </div>

          {/* Payment Options */}
          <div className="space-y-3">
            <button
              onClick={() => setPaymentMethod("cod")}
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                paymentMethod === "cod"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <Banknote className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Cash on Delivery</p>
                <p className="text-sm text-muted-foreground">Pay when you receive</p>
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod("online")}
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                paymentMethod === "online"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Online Payment (UPI)</p>
                <p className="text-sm text-muted-foreground">Pay via UPI/GPay/PhonePe</p>
              </div>
            </button>
          </div>

          {/* UPI QR Code - shown when online payment selected */}
          {paymentMethod === "online" && (
            <div className="bg-card border border-border rounded-xl p-4 text-center animate-fade-in">
              <p className="text-sm text-muted-foreground mb-3">
                Scan QR code or use UPI ID to pay ₹{totalPrice}
              </p>
              <img 
                src={upiQR} 
                alt="UPI Payment QR Code" 
                className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-lg border border-border"
              />
              <div className="mt-3 bg-secondary/50 rounded-lg p-2">
                <p className="text-xs text-muted-foreground">UPI ID</p>
                <p className="font-semibold text-primary text-sm">sushil@upi</p>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                After payment, click below to confirm order on WhatsApp
              </p>
            </div>
          )}

          <Button
            variant="whatsapp"
            size="lg"
            className="w-full"
            onClick={handlePlaceOrder}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {paymentMethod === "online" ? "Confirm & Send Order" : "Place Order on WhatsApp"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
