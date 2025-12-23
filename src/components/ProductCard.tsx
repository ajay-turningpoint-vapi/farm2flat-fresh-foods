import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, CartItem } from "@/types/product";

interface ProductCardProps {
  product: Product;
  cartItem?: CartItem;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

const ProductCard = ({ 
  product, 
  cartItem, 
  onAddToCart, 
  onUpdateQuantity 
}: ProductCardProps) => {
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 animate-fade-in border border-border/50">
      <div className="relative h-48 overflow-hidden bg-secondary/30">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1.5 rounded-full font-bold text-sm shadow-glow">
          ₹{product.price}/{product.unit}
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-foreground">{product.name}</h3>
          <p className="text-muted-foreground text-sm">{product.nameHindi}</p>
        </div>
        
        {quantity === 0 ? (
          <Button 
            variant="default" 
            size="lg" 
            className="w-full"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="quantity"
              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
            >
              <Minus className="w-4 h-4" />
            </Button>
            
            <div className="flex-1 text-center">
              <span className="text-2xl font-bold text-primary">{quantity}</span>
              <span className="text-muted-foreground ml-1">{product.unit}</span>
            </div>
            
            <Button
              variant="quantity"
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        )}
        
        {quantity > 0 && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-center text-muted-foreground">
              Subtotal: <span className="font-bold text-primary">₹{product.price * quantity}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
