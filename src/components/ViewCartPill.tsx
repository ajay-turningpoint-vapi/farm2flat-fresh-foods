import { ShoppingBag, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const ViewCartPill = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Get unique items with their images (max 4 for display)
  const displayItems = cartItems.slice(0, 4);

  if (cartItems.length === 0) return null;

  return (
    <button
      onClick={() => navigate("/cart")}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce-subtle"
    >
      <div className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Item count badge */}
        <div className="relative">
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        </div>

        {/* Product thumbnails */}
        <div className="flex items-center -space-x-2">
          {displayItems.map((item, index) => (
            <div
              key={item.id}
              className="w-8 h-8 rounded-full border-2 border-primary overflow-hidden bg-card"
              style={{ zIndex: displayItems.length - index }}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary text-xs font-bold">
                  {item.name.charAt(0)}
                </div>
              )}
            </div>
          ))}
          {cartItems.length > 4 && (
            <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center border-2 border-primary">
              +{cartItems.length - 4}
            </div>
          )}
        </div>

        {/* Price */}
        <span className="font-bold text-sm">₹{totalPrice}</span>

        {/* Chevron */}
        <ChevronUp className="w-4 h-4 text-accent-foreground/70" />
      </div>
    </button>
  );
};

export default ViewCartPill;
