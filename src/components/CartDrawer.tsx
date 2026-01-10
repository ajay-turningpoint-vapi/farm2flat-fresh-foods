import { useState, useMemo } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ShoppingBag, Sparkles } from "lucide-react";
import { CartItem } from "@/types/product";
import PaymentModal from "./PaymentModal";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onAddToCart: (addOn: {
    id: string;
    name: string;
    nameHindi: string;
    price: number;
    unit: string;
    image: string;
  }) => void;
  onPlaceOrder: (paymentMethod: "cod" | "online", address: string) => void;
}

// Add-ons data (same as AddOnsModal)
const addOns = [
  {
    id: "coriander",
    name: "Coriander",
    nameHindi: "धनिया",
    price: 10,
    unit: "bunch",
    image: "",
  },
  {
    id: "lemon",
    name: "Lemon",
    nameHindi: "नींबू",
    price: 5,
    unit: "pc",
    image: "",
  },
  {
    id: "tomato",
    name: "Tomato",
    nameHindi: "टमाटर",
    price: 40,
    unit: "kg",
    image: "",
  },
  {
    id: "green-chilli",
    name: "Green Chilli",
    nameHindi: "हरी मिर्च",
    price: 80,
    unit: "kg",
    image: "",
  },
  {
    id: "ginger",
    name: "Ginger",
    nameHindi: "अदरक",
    price: 120,
    unit: "kg",
    image: "",
  },
  {
    id: "curry-leaves",
    name: "Curry Leaves",
    nameHindi: "करी पत्ता",
    price: 10,
    unit: "bunch",
    image: "",
  },
];

const CartDrawer = ({
  open,
  onOpenChange,
  cartItems,
  onUpdateQuantity,
  onAddToCart,
  onPlaceOrder,
}: CartDrawerProps) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddOns, setShowAddOns] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Track which add-ons are already in cart
  const addedAddOns = useMemo(() => {
    return cartItems.map((item) => item.id);
  }, [cartItems]);

  const handleContinueToCheckout = () => {
    setShowPaymentModal(true);
  };

  // Find total add-ons price
  const addOnsTotal = cartItems
    .filter((item) => addOns.some((addon) => addon.id === item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const mainItemsTotal = cartItems
    .filter((item) => !addOns.some((addon) => addon.id === item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="pb-2">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-bold flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              Your Cart
              <span className="bg-primary/10 text-primary text-sm px-2 py-0.5 rounded-full">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            </DrawerTitle>
            <DrawerClose className="p-2 hover:bg-secondary rounded-full transition-colors">
              <X className="w-5 h-5" />
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="overflow-y-auto px-4 pb-32 max-h-[calc(85vh-120px)]">
          {/* Cart Items */}
          {cartItems.length > 0 ? (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border/50"
                >
                  {/* Product Image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary/30 shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-primary/30">
                        {item.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate">
                      {item.name}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {item.nameHindi}
                    </p>
                    <p className="text-primary font-bold mt-1">
                      ₹{item.price}/{item.unit}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 bg-secondary/50 rounded-full px-2 py-1">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground/70">
                Add items to see them here
              </p>
            </div>
          )}

          {/* Add-Ons Section */}
          <div className="mt-6">
            <button
              onClick={() => setShowAddOns(!showAddOns)}
              className="w-full flex items-center justify-between p-3 bg-accent/10 border border-accent/30 rounded-xl hover:bg-accent/20 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                <span className="font-semibold text-foreground">Add-Ons</span>
                <span className="text-xs text-muted-foreground">
                  {
                    addedAddOns.filter((id) => addOns.some((a) => a.id === id))
                      .length
                  }{" "}
                  added
                </span>
              </div>
              <span
                className={`transition-transform ${
                  showAddOns ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {showAddOns && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {addOns.map((addOn) => {
                  const isAdded = addedAddOns.includes(addOn.id);
                  return (
                    <div
                      key={addOn.id}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        isAdded
                          ? "border-primary bg-primary/5"
                          : "border-border/50 hover:border-primary/30"
                      }`}
                    >
                      <p className="font-semibold text-sm">{addOn.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {addOn.nameHindi}
                      </p>
                      <p className="text-primary font-bold text-sm mt-1">
                        ₹{addOn.price}/{addOn.unit}
                      </p>
                      <Button
                        size="sm"
                        variant={isAdded ? "default" : "outline"}
                        className="mt-2 w-full text-xs h-7"
                        onClick={() => onAddToCart(addOn)}
                      >
                        {isAdded ? "Added" : "Add"}
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Fixed Bottom Section */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 space-y-3">
          {/* Price Summary */}
          {cartItems.length > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">₹{totalPrice}</span>
            </div>
          )}

          {/* Continue to Checkout Button */}
          <Button
            variant="whatsapp"
            size="lg"
            className="w-full"
            onClick={handleContinueToCheckout}
            disabled={cartItems.length === 0}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Continue to Checkout • ₹{totalPrice}
          </Button>
        </div>
      </DrawerContent>

      <PaymentModal
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        cartItems={cartItems}
        onPlaceOrder={onPlaceOrder}
      />
    </Drawer>
  );
};

export default CartDrawer;
