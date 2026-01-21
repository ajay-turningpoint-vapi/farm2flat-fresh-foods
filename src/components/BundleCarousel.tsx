import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Gift, Check, Sparkles, TrendingDown, BadgeCheck } from "lucide-react";
import bundleWeeklyImg from "@/assets/bundle-weekly.jpg";
import bundleFamilyImg from "@/assets/bundle-family.jpg";
import priceComparisonBg from "@/assets/price-comparison-bg.jpg";

const WHATSAPP_NUMBER = "919892162899";

const bundles = [
  {
    id: "weekly-tadka",
    title: "WEEKLY TADKA BUNDLE",
    emoji: "📦",
    items: "2kg Fresh Potato + 2kg Onion + 250g Garlic",
    originalPrice: 350,
    bundlePrice: 299,
    savings: 51,
    discount: "15% OFF",
    freebie: "FREE 50g Coriander + 7-day freshness guarantee",
    whatsappMessage: "Hi! Need Weekly Tadka Bundle ₹299 + [address]",
    image: bundleWeeklyImg,
  },
  {
    id: "family-pack",
    title: "FAMILY PACK - 7 DAYS SUPPLY",
    emoji: "👨‍👩‍👧‍👦",
    items: "5kg Potato + 5kg Onion + 500g Garlic",
    originalPrice: 750,
    bundlePrice: 599,
    savings: 151,
    discount: "20% OFF",
    freebie: "FREE 100g Coriander/Chilies + Priority delivery",
    whatsappMessage: "Family Pack ₹599 for [address] please",
    image: bundleFamilyImg,
  },
];

const potatoPriceComparison = {
  ourPrice: 35,
  unit: "kg",
  competitors: [
    { name: "Zepto", price: 45, color: "bg-purple-500" },
    { name: "BlinkIt", price: 48, color: "bg-yellow-500" },
    { name: "JioMart", price: 42, color: "bg-blue-500" },
  ],
};

const BundleCarousel = () => {
  const handleOrderBundle = (message: string) => {
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {bundles.map((bundle) => (
            <CarouselItem key={bundle.id} className="pl-0">
              <div className="relative w-full h-[320px] md:h-[400px] overflow-hidden">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${bundle.image})` }}
                />
                {/* Dark Overlay for readability */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-center px-5 md:px-12 lg:px-16">
                  <div className="max-w-xl space-y-3 animate-fade-in">
                    {/* Discount Badge */}
                    <div className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs md:text-sm font-bold animate-pulse">
                      <Sparkles className="w-3 h-3" />
                      SAVE ₹{bundle.savings} • {bundle.discount}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                      {bundle.emoji} {bundle.title}
                    </h2>

                    {/* Items */}
                    <p className="text-sm md:text-base text-white/90 font-medium">
                      {bundle.items}
                    </p>

                    {/* Pricing */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-white/60 line-through text-base md:text-xl">
                        ₹{bundle.originalPrice}
                      </span>
                      <span className="text-3xl md:text-4xl font-bold text-white">
                        ₹{bundle.bundlePrice}
                      </span>
                    </div>

                    {/* Freebie */}
                    <div className="flex items-center gap-2 text-white/90">
                      <Gift className="w-4 h-4 text-accent" />
                      <span className="text-xs md:text-sm">
                        {bundle.freebie}
                      </span>
                    </div>

                    {/* CTA Button */}
                    <Button
                      onClick={() => handleOrderBundle(bundle.whatsappMessage)}
                      variant="whatsapp"
                      size="lg"
                      className="mt-3 text-base font-bold shadow-2xl hover:scale-105 transition-transform"
                    >
                      ORDER ON WHATSAPP →
                    </Button>

                    {/* Price Breakdown */}
                    <div className="pt-3 text-xs text-white/60 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5" />
                      Potato: ₹35/kg | Onion: ₹35/kg | Garlic: ₹120/kg
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}

        </CarouselContent> 
           <CarouselPrevious className="left-3 md:left-6 bg-white/20 hover:bg-white/40 border-none text-white" />
        <CarouselNext className="right-3 md:right-6 bg-white/20 hover:bg-white/40 border-none text-white" />
      </Carousel>
    </section>
  );
};

export default BundleCarousel;
