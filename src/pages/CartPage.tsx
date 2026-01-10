import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Trash2,
  ChevronRight,
  Plus as PlusIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import PaymentModal from "@/components/PaymentModal";

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

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, addAddOnToCart, clearCart } = useCart();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(true);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Track which add-ons are already in cart and their quantities
  const addOnQuantities = useMemo(() => {
    const result: Record<string, number> = {};
    cartItems.forEach((item) => {
      if (addOns.some((addon) => addon.id === item.id)) {
        result[item.id] = item.quantity;
      }
    });
    return result;
  }, [cartItems]);

  const handleContinueToCheckout = () => {
    setShowPaymentModal(true);
  };

  const handlePlaceOrder = (
    paymentMethod: "cod" | "online",
    address: string
  ) => {
    if (cartItems.length === 0) return;

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const paymentInfo =
      paymentMethod === "online"
        ? `💳 *Payment: Online (UPI) - PAID*\n\n`
        : `💵 *Payment: Cash on Delivery*\n\n`;

    const message = encodeURIComponent(
      `🌿 *Farm2Flats Order*\n\n` +
        `${cartItems
          .map(
            (item) =>
              `• ${item.name} - ${item.quantity} ${item.unit} @ ₹${
                item.price
              }/${item.unit} = ₹${item.price * item.quantity}`
          )
          .join("\n")}\n\n` +
        `*Total: ₹${total}*\n\n` +
        `*Delivery address:*\n${address}\n\n` +
        paymentInfo +
        `Please confirm my order. Thank you!`
    );

    const whatsappUrl = `https://wa.me/919892162899?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  // Separate main items and add-ons
  const mainItems = cartItems.filter(
    (item) => !addOns.some((addon) => addon.id === item.id)
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="bg-card border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* Empty Cart State */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary/30 flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground/30" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Add fresh vegetables to your cart to see them here
            </p>
            <Button variant="whatsapp" size="lg" onClick={() => navigate("/")}>
              <ShoppingBag className="w-4 h-4 mr-2" />
              Browse Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Continue Shopping</span>
            </button>
            <button
              onClick={clearCart}
              className="flex items-center gap-1 text-sm text-destructive hover:text-destructive/80 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear Cart
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-6 pb-48">
        {/* Cart Items List */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Your Cart
            <span className="bg-primary/10 text-primary text-sm px-2 py-0.5 rounded-full">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </h2>

          <div className="space-y-3">
            {mainItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 p-3 bg-card rounded-xl border border-border/50"
              >
                {/* Product Image */}
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-secondary/30 shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-lg font-bold text-primary/30">
                      {item.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate text-sm">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    {item.nameHindi}
                  </p>
                  <p className="text-primary font-bold text-xs mt-0.5">
                    ₹{item.price}/{item.unit}
                  </p>
                </div>

                {/* Very Small Quantity Controls for Mobile */}
                <div className="flex items-center gap-1 bg-secondary/50 rounded-full px-1.5 py-0.5">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center font-bold text-xs">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Item Subtotal */}
                <div className="text-right min-w-[60px]">
                  <p className="text-[10px] text-muted-foreground">Total</p>
                  <p className="font-bold text-primary text-sm">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add-Ons Section - Horizontal scroll with +/- in card */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            Add-Ons
          </h2>

          {/* Horizontal scroll container - 1 row on mobile */}
          <div className="flex overflow-x-auto gap-3 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            {addOns.map((addOn) => {
              const quantity = addOnQuantities[addOn.id] || 0;
              return (
                <div
                  key={addOn.id}
                  className={`flex-shrink-0 w-[130px] p-2.5 rounded-xl border text-center transition-all ${
                    quantity > 0
                      ? "border-primary bg-primary/5"
                      : "border-border/50 hover:border-primary/30 bg-card"
                  }`}
                >
                  <div className="w-10 h-10 mx-auto mb-1.5 rounded-lg overflow-hidden bg-secondary/30">
                    {addOn.image ? (
                      <img
                        src={addOn.image}
                        alt={addOn.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-base font-bold text-primary/30">
                        {addOn.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <p className="font-semibold text-xs">{addOn.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {addOn.nameHindi}
                  </p>
                  <p className="text-primary font-bold text-xs mt-0.5">
                    ₹{addOn.price}/{addOn.unit}
                  </p>

                  {/* Show Add button when quantity is 0, show +/- controls when quantity > 0 */}
                  {quantity === 0 ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 w-full text-[10px] h-7"
                      onClick={() => addAddOnToCart(addOn)}
                    >
                      <PlusIcon className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  ) : (
                    <>
                      {/* +/- controls directly in card */}
                      <div className="flex items-center justify-center gap-1.5 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(addOn.id, Math.max(0, quantity - 1))
                          }
                          className="w-6 h-6 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-bold text-xs">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(addOn.id, quantity + 1)}
                          className="w-6 h-6 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-[10px] text-primary font-medium mt-1">
                        ₹{addOn.price * quantity}
                      </p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
          <button
            onClick={() => setShowOrderSummary(!showOrderSummary)}
            className="w-full px-4 py-3 flex items-center justify-between bg-secondary/30"
          >
            <h3 className="font-semibold text-foreground">Order Summary</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-primary">
                ₹{totalPrice}
              </span>
              <ChevronRight
                className={`w-4 h-4 text-muted-foreground transition-transform ${
                  showOrderSummary ? "rotate-90" : ""
                }`}
              />
            </div>
          </button>

          {showOrderSummary && (
            <div className="p-4 border-t border-border/50">
              <div className="space-y-2">
                {mainItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
                {addOns.map((addon) => {
                  const quantity = addOnQuantities[addon.id] || 0;
                  if (quantity === 0) return null;
                  return (
                    <div
                      key={addon.id}
                      className="flex justify-between text-xs"
                    >
                      <span className="text-muted-foreground">
                        {addon.name} × {quantity}
                      </span>
                      <span className="font-medium">
                        ₹{addon.price * quantity}
                      </span>
                    </div>
                  );
                })}
                <div className="pt-2 border-t border-border/50 flex justify-between">
                  <span className="font-semibold">Subtotal</span>
                  <span className="font-bold text-primary">₹{totalPrice}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="container mx-auto max-w-2xl">
          {/* Price Summary */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-muted-foreground text-sm">Subtotal</span>
            <span className="font-bold text-xl">₹{totalPrice}</span>
          </div>

          {/* Continue to Checkout Button */}
          <Button
            variant="whatsapp"
            size="lg"
            className="w-full"
            onClick={handleContinueToCheckout}
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Continue to Checkout • ₹{totalPrice}
          </Button>
        </div>
      </div>

      <PaymentModal
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        cartItems={cartItems}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  );
};

export default CartPage;
