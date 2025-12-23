import { useState } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import CartSummary from "@/components/CartSummary";
import PriceNotice from "@/components/PriceNotice";
import Footer from "@/components/Footer";
import BusinessDetails from "@/components/BusinessDetails";
import HowWeWork from "@/components/HowWeWork";
import DeliveryInfo from "@/components/DeliveryInfo";
import FAQ from "@/components/FAQ";
import { Product, CartItem } from "@/types/product";

import potatoImg from "@/assets/potato.png";
import onionImg from "@/assets/onion.png";
import garlicImg from "@/assets/garlic.png";

// Products with dynamic prices - these can be updated easily
const PRODUCTS: Product[] = [
  {
    id: "potato",
    name: "Potato",
    nameHindi: "आलू",
    price: 25,
    unit: "kg",
    image: potatoImg,
  },
  {
    id: "onion",
    name: "Onion",
    nameHindi: "प्याज",
    price: 30,
    unit: "kg",
    image: onionImg,
  },
  {
    id: "garlic",
    name: "Garlic",
    nameHindi: "लहसुन",
    price: 120,
    unit: "kg",
    image: garlicImg,
  },
];

// WhatsApp number for orders
const WHATSAPP_NUMBER = "918975944936";

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== productId));
      toast.info("Item removed from cart");
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handlePlaceOrder = (paymentMethod: "cod" | "online") => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    const paymentInfo = paymentMethod === "online" 
      ? `💳 *Payment: Online (UPI) - PAID*\n\n`
      : `💵 *Payment: Cash on Delivery*\n\n`;
    
    const message = encodeURIComponent(
      `🌿 *Farm2Flat Order*\n\n` +
      `${cart.map((item) => `• ${item.name} - ${item.quantity} ${item.unit} @ ₹${item.price}/${item.unit} = ₹${item.price * item.quantity}`).join("\n")}\n\n` +
      `*Total: ₹${totalPrice}*\n\n` +
      paymentInfo +
      `Please confirm my order. Thank you!`
    );

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, "_blank");
    toast.success("Opening WhatsApp to place your order!");
  };

  const getCartItem = (productId: string) => {
    return cart.find((item) => item.id === productId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroBanner />
      
      <main className="container mx-auto px-4 py-8 pb-32">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Today's <span className="text-primary">Fresh Picks</span>
          </h2>
          <p className="text-muted-foreground">
            Farm-fresh vegetables at daily market prices
          </p>
        </div>
        
        <PriceNotice />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, index) => (
            <div key={product.id} style={{ animationDelay: `${index * 150}ms` }}>
              <ProductCard
                product={product}
                cartItem={getCartItem(product.id)}
                onAddToCart={handleAddToCart}
                onUpdateQuantity={handleUpdateQuantity}
              />
            </div>
          ))}
        </div>
      </main>
      
      <CartSummary cartItems={cart} onPlaceOrder={handlePlaceOrder} />
      <HowWeWork />
      <DeliveryInfo />
      <FAQ />
      <BusinessDetails />
      <Footer />
    </div>
  );
};

export default Index;
