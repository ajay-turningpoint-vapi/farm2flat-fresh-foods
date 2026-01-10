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
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
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
              <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${bundle.image})` }}
                />
                {/* Dark Overlay for readability */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24">
                  <div className="max-w-2xl space-y-4 animate-fade-in">
                    {/* Discount Badge */}
                    <div className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground px-4 py-2 rounded-full text-sm md:text-base font-bold animate-pulse">
                      <Sparkles className="w-4 h-4" />
                      SAVE ₹{bundle.savings} • {bundle.discount}
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                      {bundle.emoji} {bundle.title}
                    </h2>

                    {/* Items */}
                    <p className="text-lg md:text-xl text-white/90 font-medium">
                      {bundle.items}
                    </p>

                    {/* Pricing */}
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="text-white/60 line-through text-xl md:text-2xl">
                        ₹{bundle.originalPrice}
                      </span>
                      <span className="text-4xl md:text-5xl font-bold text-white">
                        ₹{bundle.bundlePrice}
                      </span>
                    </div>

                    {/* Freebie */}
                    <div className="flex items-center gap-2 text-white/90">
                      <Gift className="w-5 h-5 text-accent" />
                      <span className="text-base md:text-lg">{bundle.freebie}</span>
                    </div>

                    {/* CTA Button */}
                    <Button
                      onClick={() => handleOrderBundle(bundle.whatsappMessage)}
                      variant="whatsapp"
                      size="xl"
                      className="mt-4 text-lg font-bold shadow-2xl hover:scale-105 transition-transform"
                    >
                      ORDER ON WHATSAPP →
                    </Button>

                    {/* Price Breakdown */}
                    <div className="pt-4 text-sm text-white/60 flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Potato: ₹35/kg | Onion: ₹35/kg | Garlic: ₹120/kg
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}

          {/* Price Comparison Slide */}
          <CarouselItem className="pl-0">
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${priceComparisonBg})` }}
              />
              {/* Dark Overlay for readability */}
              <div className="absolute inset-0 bg-black/60" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24">
                <div className="max-w-3xl space-y-6 animate-fade-in">
                  {/* Title */}
                  <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm md:text-base font-bold">
                    <TrendingDown className="w-4 h-4" />
                    COMPARE & SAVE
                  </div>

                  <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                    🥔 Potato Price Comparison
                  </h2>

                  <p className="text-lg md:text-xl text-white/90">
                    Why pay more? Get farm-fresh potatoes at the best price!
                  </p>

                  {/* Price Comparison Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {/* Our Price */}
                    <div className="bg-accent/90 backdrop-blur-sm rounded-xl p-4 text-center border-2 border-accent">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <BadgeCheck className="w-5 h-5 text-accent-foreground" />
                        <span className="font-bold text-accent-foreground text-sm">Farm2Flat</span>
                      </div>
                      <div className="text-3xl md:text-4xl font-bold text-accent-foreground">
                        ₹{potatoPriceComparison.ourPrice}
                      </div>
                      <div className="text-accent-foreground/80 text-sm">per kg</div>
                    </div>

                    {/* Competitor Prices */}
                    {potatoPriceComparison.competitors.map((competitor) => {
                      const savings = competitor.price - potatoPriceComparison.ourPrice;
                      return (
                        <div
                          key={competitor.name}
                          className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20"
                        >
                          <div className="flex items-center justify-center gap-1 mb-2">
                            <div className={`w-3 h-3 rounded-full ${competitor.color}`} />
                            <span className="font-medium text-white/80 text-sm">{competitor.name}</span>
                          </div>
                          <div className="text-2xl md:text-3xl font-bold text-white/60 line-through">
                            ₹{competitor.price}
                          </div>
                          <div className="text-destructive text-sm font-semibold">
                            +₹{savings} more
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Savings Message */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">💰</div>
                      <div>
                        <p className="text-white font-bold text-lg">Save up to ₹13/kg!</p>
                        <p className="text-white/70 text-sm">Direct from farmers, no middlemen</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleOrderBundle("Hi! I want to order fresh Potatoes at ₹35/kg")}
                      variant="whatsapp"
                      size="lg"
                      className="hidden md:flex"
                    >
                      Order Now →
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-4 md:left-8 bg-white/20 hover:bg-white/40 border-none text-white" />
        <CarouselNext className="right-4 md:right-8 bg-white/20 hover:bg-white/40 border-none text-white" />
      </Carousel>
    </section>
  );
};

export default BundleCarousel;
