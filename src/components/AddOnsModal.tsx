import { Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import corianderImg from "@/assets/coriander.png";
import lemonImg from "@/assets/lemon.png";
import tomatoImg from "@/assets/tomato.png";
import greenChilliImg from "@/assets/green-chilli.png";
import gingerImg from "@/assets/ginger.png";
import curryLeavesImg from "@/assets/curry-leaves.png";

interface AddOn {
  id: string;
  name: string;
  nameHindi: string;
  price: number;
  unit: string;
  image: string;
}

const addOns: AddOn[] = [
  { id: "coriander", name: "Coriander", nameHindi: "धनिया", price: 10, unit: "bunch", image: corianderImg },
  { id: "lemon", name: "Lemon", nameHindi: "नींबू", price: 5, unit: "pc", image: lemonImg },
  { id: "tomato", name: "Tomato", nameHindi: "टमाटर", price: 40, unit: "kg", image: tomatoImg },
  { id: "green-chilli", name: "Green Chilli", nameHindi: "हरी मिर्च", price: 80, unit: "kg", image: greenChilliImg },
  { id: "ginger", name: "Ginger", nameHindi: "अदरक", price: 120, unit: "kg", image: gingerImg },
  { id: "curry-leaves", name: "Curry Leaves", nameHindi: "करी पत्ता", price: 10, unit: "bunch", image: curryLeavesImg },
];

interface AddOnsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (addOn: { id: string; name: string; nameHindi: string; price: number; unit: string }) => void;
  addedItems: string[];
  onContinue: () => void;
}

const AddOnsModal = ({ open, onOpenChange, onAddToCart, addedItems, onContinue }: AddOnsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Quick <span className="text-primary">Add-Ons</span>
          </DialogTitle>
          <DialogDescription className="text-center">
            Complete your kitchen with these essentials
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 py-4">
          {addOns.map((addOn) => {
            const isAdded = addedItems.includes(addOn.id);
            return (
              <div
                key={addOn.id}
                className={`bg-card rounded-xl border p-4 text-center transition-all ${
                  isAdded ? "border-primary bg-primary/5" : "border-border/50 hover:shadow-md"
                }`}
              >
                <div className="w-16 h-16 mx-auto mb-2 rounded-lg overflow-hidden bg-secondary/30">
                  <img
                    src={addOn.image}
                    alt={addOn.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-foreground text-sm">{addOn.name}</h4>
                <p className="text-muted-foreground text-xs mb-2">{addOn.nameHindi}</p>
                <p className="text-primary font-bold text-sm mb-3">
                  ₹{addOn.price}/{addOn.unit}
                </p>
                <Button
                  size="sm"
                  variant={isAdded ? "default" : "outline"}
                  className="w-full text-xs"
                  onClick={() => onAddToCart(addOn)}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3 h-3 mr-1" />
                      Added
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3 mr-1" />
                      Add
                    </>
                  )}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Skip Add-Ons
          </Button>
          <Button
            variant="whatsapp"
            className="flex-1"
            onClick={onContinue}
          >
            Continue to Checkout →
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddOnsModal;
