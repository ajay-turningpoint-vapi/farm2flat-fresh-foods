import { useState, useEffect } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import BundleCarousel from "@/components/BundleCarousel";
import ProductCard from "@/components/ProductCard";
import CartSummary from "@/components/CartSummary";
import PriceNotice from "@/components/PriceNotice";
import Footer from "@/components/Footer";
import BusinessDetails from "@/components/BusinessDetails";
import { Product, CartItem } from "@/types/product";
import productsService from "@/lib/products";

// Products will be loaded from `productsService` (localStorage)
const PRODUCTS_PLACEHOLDER: Product[] = [];

// WhatsApp number for orders
const WHATSAPP_NUMBER = "919892162899";

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
    // toast.success(`${product.name} added to cart!`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== productId));
      // toast.info("Item removed from cart");
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const handlePlaceOrder = (
    paymentMethod: "cod" | "online",
    address: string
  ) => {
    if (cart.length === 0) {
      // toast.error("Your cart is empty!");
      return;
    }

    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const paymentInfo =
      paymentMethod === "online"
        ? `💳 *Payment: Online (UPI) - PAID*\n\n`
        : `💵 *Payment: Cash on Delivery*\n\n`;

    const message = encodeURIComponent(
      `🌿 *Farm2Flats Order*\n\n` +
        `${cart
          .map(
            (item) =>
              `• ${item.name} - ${item.quantity} ${item.unit} @ ₹${
                item.price
              }/${item.unit} = ₹${item.price * item.quantity}`
          )
          .join("\n")}\n\n` +
        `*Total: ₹${totalPrice}*\n\n` +
        `*Delivery address:*\n${address}\n\n` +
        paymentInfo +
        `Please confirm my order. Thank you!`
    );

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, "_blank");
    toast.success("Opening WhatsApp to place your order!");
  };

  const [products, setProducts] = useState<Product[]>(PRODUCTS_PLACEHOLDER);

  useEffect(() => {
    setProducts(productsService.loadProducts());
  }, []);

  const getCartItem = (productId: string) => {
    return cart.find((item) => item.id === productId);
  };

  const handleAddOnToCart = (addOn: { id: string; name: string; nameHindi: string; price: number; unit: string }) => {
    const product: Product = {
      id: addOn.id,
      name: addOn.name,
      nameHindi: addOn.nameHindi,
      price: addOn.price,
      unit: addOn.unit,
      image: "",
    };
    handleAddToCart(product);
    toast.success(`${addOn.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BundleCarousel />

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
          {products.map((product, index) => (
            <div
              key={product.id}
              style={{ animationDelay: `${index * 150}ms` }}
            >
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

      <CartSummary cartItems={cart} onPlaceOrder={handlePlaceOrder} onAddToCart={handleAddOnToCart} />
      
      <BusinessDetails />
      <Footer />
    </div>
  );
};

export default Index;
