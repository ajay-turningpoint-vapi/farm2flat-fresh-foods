import { useState, useEffect } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import BundleCarousel from "@/components/BundleCarousel";
import ProductCard from "@/components/ProductCard";
import CartSummary from "@/components/CartSummary";
import ViewCartPill from "@/components/ViewCartPill";
import PriceNotice from "@/components/PriceNotice";
import Footer from "@/components/Footer";
import BusinessDetails from "@/components/BusinessDetails";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import productsService from "@/lib/products";

// Products will be loaded from `productsService` (localStorage)
const PRODUCTS_PLACEHOLDER: Product[] = [];

const Index = () => {
  const { addToCart, updateQuantity, getCartItem } = useCart();
  const [products, setProducts] = useState<Product[]>(PRODUCTS_PLACEHOLDER);

  useEffect(() => {
    setProducts(productsService.loadProducts());
  }, []);

  const handleAddOnToCart = (addOn: {
    id: string;
    name: string;
    nameHindi: string;
    price: number;
    unit: string;
    image?: string;
  }) => {
    const product: Product = {
      id: addOn.id,
      name: addOn.name,
      nameHindi: addOn.nameHindi,
      price: addOn.price,
      unit: addOn.unit,
      image: addOn.image || "",
    };
    addToCart(product);
    toast.success(`${addOn.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BundleCarousel />

      <main className="container mx-auto px-3 py-6 pb-6">
        <div className="text-center mb-6 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
            Today's <span className="text-primary">Fresh Picks</span>
          </h2>
          <p className="text-muted-foreground text-xs">
            Farm-fresh vegetables at daily market prices
          </p>
        </div>

        {/* <PriceNotice /> */}

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.map((product, index) => (
            <div
              key={product.id}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ProductCard
                product={product}
                cartItem={getCartItem(product.id)}
                onAddToCart={addToCart}
                onUpdateQuantity={updateQuantity}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Floating Cart Pill - Opens dedicated cart page */}
      <ViewCartPill />

      {/* Cart Summary - For bundle upgrade suggestions */}
      {/* <CartSummary /> */}

      {/* <BusinessDetails /> */}
      <Footer />
    </div>
  );
};

export default Index;
