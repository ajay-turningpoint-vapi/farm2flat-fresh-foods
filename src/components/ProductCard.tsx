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
  onUpdateQuantity,
}: ProductCardProps) => {
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-md transition-all duration-300 animate-fade-in border border-border/50">
      <div className="relative h-32 sm:h-40 overflow-hidden bg-secondary/30">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 py-1 rounded-full font-semibold text-xs shadow-glow">
          ₹{product.price}/{product.unit}
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <div className="mb-2 sm:mb-3">
          <h3 className="text-base sm:text-lg font-bold text-foreground">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-[10px] sm:text-xs">
            {product.nameHindi}
          </p>
        </div>

        {quantity === 0 ? (
          <Button
            variant="default"
            size="sm"
            className="w-full text-xs h-8"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            Add
          </Button>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <Button
              variant="quantity"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
            >
              <Minus className="w-3 h-3" />
            </Button>

            <div className="flex-1 text-center">
              <span className="text-lg sm:text-xl font-bold text-primary">
                {quantity}
              </span>
              <span className="text-muted-foreground ml-1 text-xs sm:text-sm">
                {product.unit}
              </span>
            </div>

            <Button
              variant="quantity"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        )}

        {quantity > 0 && (
          <div className="mt-2 pt-2 border-t border-border">
            <p className="text-center text-muted-foreground text-[10px] sm:text-xs">
              Subtotal:{" "}
              <span className="font-bold text-primary">
                ₹{product.price * quantity}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
