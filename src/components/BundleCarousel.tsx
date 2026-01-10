import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Package, Gift, Truck, Check } from "lucide-react";

const WHATSAPP_NUMBER = "918975944936";

const bundles = [
  {
    id: "weekly-tadka",
    title: "WEEKLY TADKA BUNDLE",
    icon: Package,
    items: "2kg Fresh Potato + 2kg Onion + 250g Garlic",
    originalPrice: 350,
    bundlePrice: 299,
    savings: 51,
    discount: "15% off",
    freebie: "FREE 50g Coriander + 7-day freshness guarantee",
    whatsappMessage: "Hi! Need Weekly Tadka Bundle ₹299 + [address]",
    gradient: "from-primary/90 to-accent/80",
  },
  {
    id: "family-pack",
    title: "FAMILY PACK - 7 DAYS SUPPLY",
    icon: Gift,
    items: "5kg Potato + 5kg Onion + 500g Garlic",
    originalPrice: 750,
    bundlePrice: 599,
    savings: 151,
    discount: "20% off",
    freebie: "FREE 100g Coriander/Chilies + Priority delivery",
    whatsappMessage: "Family Pack ₹599 for [address] please",
    gradient: "from-accent/90 to-primary/80",
  },
];

const BundleCarousel = () => {
  const handleOrderBundle = (message: string) => {
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="w-full py-6 md:py-10 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            🔥 Special <span className="text-primary">Bundle Offers</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Save more with our value packs!
          </p>
        </div>

        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {bundles.map((bundle) => {
              const IconComponent = bundle.icon;
              return (
                <CarouselItem key={bundle.id} className="md:basis-full">
                  <div
                    className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${bundle.gradient} p-6 md:p-8 text-primary-foreground shadow-lg`}
                  >
                    {/* Discount Badge */}
                    <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                      SAVE ₹{bundle.savings}
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <IconComponent className="w-8 h-8 md:w-10 md:h-10" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-3">
                        <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                          📦 {bundle.title}
                        </h3>
                        
                        <p className="text-primary-foreground/90 font-medium">
                          {bundle.items}
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-primary-foreground/70 line-through text-lg">
                            ₹{bundle.originalPrice}
                          </span>
                          <span className="text-2xl md:text-3xl font-bold">
                            ₹{bundle.bundlePrice}
                          </span>
                          <span className="bg-white/20 px-2 py-0.5 rounded text-sm font-semibold">
                            {bundle.discount}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-primary-foreground/90">
                          <Gift className="w-4 h-4" />
                          <span>{bundle.freebie}</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="flex-shrink-0">
                        <Button
                          onClick={() => handleOrderBundle(bundle.whatsappMessage)}
                          variant="whatsapp"
                          size="lg"
                          className="w-full md:w-auto text-base font-bold shadow-lg hover:scale-105 transition-transform"
                        >
                          ORDER ON WHATSAPP →
                        </Button>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="mt-4 pt-4 border-t border-white/20 text-xs text-primary-foreground/70">
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Potato: ₹35/kg | Onion: ₹35/kg | Garlic: ₹120/kg
                      </span>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="left-2 md:-left-12 bg-background/80 hover:bg-background" />
          <CarouselNext className="right-2 md:-right-12 bg-background/80 hover:bg-background" />
        </Carousel>

        {/* Upgrade Notice */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            💡 <span className="font-medium text-foreground">Buying individual items?</span>{" "}
            <span className="text-primary font-semibold">Upgrade to a bundle and save up to 20%!</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default BundleCarousel;
