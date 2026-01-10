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
  {
    id: "coriander",
    name: "Coriander",
    nameHindi: "धनिया",
    price: 10,
    unit: "bunch",
    image: corianderImg,
  },
  {
    id: "lemon",
    name: "Lemon",
    nameHindi: "नींबू",
    price: 5,
    unit: "pc",
    image: lemonImg,
  },
  {
    id: "tomato",
    name: "Tomato",
    nameHindi: "टमाटर",
    price: 40,
    unit: "kg",
    image: tomatoImg,
  },
  {
    id: "green-chilli",
    name: "Green Chilli",
    nameHindi: "हरी मिर्च",
    price: 80,
    unit: "kg",
    image: greenChilliImg,
  },
  {
    id: "ginger",
    name: "Ginger",
    nameHindi: "अदरक",
    price: 120,
    unit: "kg",
    image: gingerImg,
  },
  {
    id: "curry-leaves",
    name: "Curry Leaves",
    nameHindi: "करी पत्ता",
    price: 10,
    unit: "bunch",
    image: curryLeavesImg,
  },
];

interface AddOnsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (addOn: {
    id: string;
    name: string;
    nameHindi: string;
    price: number;
    unit: string;
  }) => void;
  addedItems: string[];
  onContinue: () => void;
}

const AddOnsModal = ({
  open,
  onOpenChange,
  onAddToCart,
  addedItems,
  onContinue,
}: AddOnsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-xl max-h-[90vh] overflow-y-auto p-2 sm:p-4">
        <DialogHeader className="pb-1.5 sm:pb-3">
          <DialogTitle className="text-lg sm:text-xl font-bold text-center">
            Quick <span className="text-primary">Add-Ons</span>
          </DialogTitle>
          <DialogDescription className="text-center text-[10px] sm:text-xs">
            Complete your kitchen with these essentials
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2 md:gap-3 py-1 sm:py-3">
          {addOns.map((addOn) => {
            const isAdded = addedItems.includes(addOn.id);
            return (
              <div
                key={addOn.id}
                className={`bg-card rounded-lg border p-1.5 sm:p-2.5 text-center transition-all ${
                  isAdded
                    ? "border-primary bg-primary/5"
                    : "border-border/50 hover:shadow-md"
                }`}
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-1 sm:mb-1.5 rounded-lg overflow-hidden bg-secondary/30">
                  <img
                    src={addOn.image}
                    alt={addOn.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-foreground text-[10px] sm:text-sm">
                  {addOn.name}
                </h4>
                <p className="text-muted-foreground text-[9px] sm:text-xs mb-1 sm:mb-1.5">
                  {addOn.nameHindi}
                </p>
                <p className="text-primary font-bold text-[10px] sm:text-sm mb-1 sm:mb-2">
                  ₹{addOn.price}/{addOn.unit}
                </p>
                <Button
                  size="sm"
                  variant={isAdded ? "default" : "outline"}
                  className="w-full text-[9px] sm:text-xs h-8 sm:h-7"
                  onClick={() => onAddToCart(addOn)}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-2.5 h-2.5 mr-0.5" />
                      Added
                    </>
                  ) : (
                    <>
                      <Plus className="w-2.5 h-2.5 mr-0.5" />
                      Add
                    </>
                  )}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-2 pt-2 sm:pt-3 border-t">
          <Button
            variant="outline"
            className="flex-1 h-9 sm:h-8 text-xs"
            onClick={() => onOpenChange(false)}
          >
            Skip Add-Ons
          </Button>
          <Button
            variant="whatsapp"
            className="flex-1 h-9 sm:h-8 text-xs"
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
