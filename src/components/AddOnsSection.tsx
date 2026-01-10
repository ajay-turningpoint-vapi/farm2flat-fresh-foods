import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddOn {
  id: string;
  name: string;
  nameHindi: string;
  price: number;
  unit: string;
  emoji: string;
}

const addOns: AddOn[] = [
  { id: "coriander", name: "Coriander", nameHindi: "धनिया", price: 10, unit: "bunch", emoji: "🌿" },
  { id: "lemon", name: "Lemon", nameHindi: "नींबू", price: 5, unit: "pc", emoji: "🍋" },
  { id: "tomato", name: "Tomato", nameHindi: "टमाटर", price: 40, unit: "kg", emoji: "🍅" },
  { id: "green-chilli", name: "Green Chilli", nameHindi: "हरी मिर्च", price: 80, unit: "kg", emoji: "🌶️" },
  { id: "ginger", name: "Ginger", nameHindi: "अदरक", price: 120, unit: "kg", emoji: "🫚" },
  { id: "curry-leaves", name: "Curry Leaves", nameHindi: "करी पत्ता", price: 10, unit: "bunch", emoji: "🍃" },
];

interface AddOnsSectionProps {
  onAddToCart: (addOn: AddOn) => void;
}

const AddOnsSection = ({ onAddToCart }: AddOnsSectionProps) => {
  return (
    <section className="py-8 md:py-12 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Quick <span className="text-primary">Add-Ons</span>
          </h3>
          <p className="text-muted-foreground text-sm md:text-base">
            Complete your kitchen with these essentials
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {addOns.map((addOn) => (
            <div
              key={addOn.id}
              className="bg-card rounded-xl border border-border/50 p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-2">{addOn.emoji}</div>
              <h4 className="font-semibold text-foreground text-sm">{addOn.name}</h4>
              <p className="text-muted-foreground text-xs mb-2">{addOn.nameHindi}</p>
              <p className="text-primary font-bold text-sm mb-3">
                ₹{addOn.price}/{addOn.unit}
              </p>
              <Button
                size="sm"
                variant="outline"
                className="w-full text-xs"
                onClick={() => onAddToCart(addOn)}
              >
                <Plus className="w-3 h-3 mr-1" />
                Add
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AddOnsSection;
