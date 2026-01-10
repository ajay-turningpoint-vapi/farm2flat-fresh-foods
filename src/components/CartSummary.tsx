import { useState, useMemo } from "react";
import { ShoppingBag, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/product";
import PaymentModal from "./PaymentModal";

const WHATSAPP_NUMBER = "918975944936";

// Bundle definitions for upgrade suggestions
const bundles = [
  {
    id: "weekly-tadka",
    name: "Weekly Tadka Bundle",
    potato: 2,
    onion: 2,
    garlic: 0.25,
    originalPrice: 350,
    bundlePrice: 299,
    savings: 51,
    whatsappMessage: "Hi! Need Weekly Tadka Bundle ₹299 + [address]",
  },
  {
    id: "family-pack",
    name: "Family Pack",
    potato: 5,
    onion: 5,
    garlic: 0.5,
    originalPrice: 750,
    bundlePrice: 599,
    savings: 151,
    whatsappMessage: "Family Pack ₹599 for [address] please",
  },
];

interface CartSummaryProps {
  cartItems: CartItem[];
  onPlaceOrder: (paymentMethod: "cod" | "online", address: string) => void;
}

const CartSummary = ({ cartItems, onPlaceOrder }: CartSummaryProps) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Check for bundle upgrade opportunities
  const bundleSuggestion = useMemo(() => {
    const potato = cartItems.find((item) => item.id === "potato")?.quantity || 0;
    const onion = cartItems.find((item) => item.id === "onion")?.quantity || 0;
    const garlic = cartItems.find((item) => item.id === "garlic")?.quantity || 0;

    // Check if cart matches or exceeds bundle requirements
    for (const bundle of bundles) {
      if (
        potato >= bundle.potato * 0.8 &&
        onion >= bundle.onion * 0.8 &&
        garlic >= bundle.garlic * 0.5
      ) {
        // Calculate what user would pay vs bundle price
        const currentTotal =
          potato * 35 + onion * 35 + garlic * 120;
        
        if (currentTotal >= bundle.bundlePrice * 0.9) {
          return {
            ...bundle,
            currentTotal,
            wouldSave: currentTotal - bundle.bundlePrice + bundle.savings,
          };
        }
      }
    }

    // Check if close to weekly bundle
    if (potato >= 1.5 || onion >= 1.5 || (potato >= 1 && onion >= 1)) {
      const weeklyBundle = bundles[0];
      return {
        ...weeklyBundle,
        currentTotal: totalPrice,
        wouldSave: weeklyBundle.savings,
        isNearMatch: true,
      };
    }

    return null;
  }, [cartItems, totalPrice]);

  const handleBundleOrder = (message: string) => {
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t-2 border-primary/20 shadow-lg animate-slide-up">
      <div className="container mx-auto px-4 py-4">
        {/* Bundle Upgrade Suggestion */}
        {bundleSuggestion && (
          <div className="mb-4 p-3 bg-accent/20 border border-accent/40 rounded-xl animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    💡 Upgrade to {bundleSuggestion.name}!
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Get more items + FREE extras • Save ₹{bundleSuggestion.savings}
                  </p>
                </div>
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleBundleOrder(bundleSuggestion.whatsappMessage)}
                className="shrink-0 bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                ₹{bundleSuggestion.bundlePrice}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

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
            onClick={() => setShowPaymentModal(true)}
            className="w-full sm:w-auto"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Proceed to Order
          </Button>
          
          <PaymentModal
            open={showPaymentModal}
            onOpenChange={setShowPaymentModal}
            cartItems={cartItems}
            onPlaceOrder={onPlaceOrder}
          />
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
