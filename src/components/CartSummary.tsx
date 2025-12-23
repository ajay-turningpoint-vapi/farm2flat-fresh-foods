import { MessageCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/product";

interface CartSummaryProps {
  cartItems: CartItem[];
  onPlaceOrder: () => void;
}

const CartSummary = ({ cartItems, onPlaceOrder }: CartSummaryProps) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t-2 border-primary/20 shadow-lg animate-slide-up">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <ShoppingBag className="w-8 h-8 text-primary" />
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {cartItems.length} item{cartItems.length > 1 ? "s" : ""} · {totalItems} {totalItems > 1 ? "units" : "unit"}
              </p>
              <p className="text-xl font-bold text-foreground">
                Total: <span className="text-primary">₹{totalPrice}</span>
              </p>
            </div>
          </div>
          
          <Button 
            variant="whatsapp" 
            size="xl"
            onClick={onPlaceOrder}
            className="w-full sm:w-auto"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Order on WhatsApp
          </Button>
        </div>
        
        <div className="mt-3 pt-3 border-t border-border/50">
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {cartItems.map((item) => (
              <span 
                key={item.id}
                className="bg-secondary text-secondary-foreground text-sm px-3 py-1 rounded-full"
              >
                {item.name}: {item.quantity} {item.unit} (₹{item.price * item.quantity})
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
