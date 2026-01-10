import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, TrendingDown, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PriceComparison {
  product: string;
  emoji: string;
  ourPrice: number;
  unit: string;
  competitors: {
    name: string;
    price: number;
    logo: string;
  }[];
}

const priceComparisons: PriceComparison[] = [
  {
    product: "Potato",
    emoji: "🥔",
    ourPrice: 35,
    unit: "kg",
    competitors: [
      { name: "Zepto", price: 45, logo: "🟣" },
      { name: "BlinkIt", price: 48, logo: "🟡" },
      { name: "JioMart", price: 42, logo: "🔵" },
    ],
  },
  {
    product: "Onion",
    emoji: "🧅",
    ourPrice: 35,
    unit: "kg",
    competitors: [
      { name: "Zepto", price: 50, logo: "🟣" },
      { name: "BlinkIt", price: 52, logo: "🟡" },
      { name: "JioMart", price: 46, logo: "🔵" },
    ],
  },
  {
    product: "Garlic",
    emoji: "🧄",
    ourPrice: 120,
    unit: "kg",
    competitors: [
      { name: "Zepto", price: 180, logo: "🟣" },
      { name: "BlinkIt", price: 200, logo: "🟡" },
      { name: "JioMart", price: 160, logo: "🔵" },
    ],
  },
];

const PriceComparisonCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Why Choose <span className="text-primary">Farm2Flat?</span>
          </h3>
          <p className="text-muted-foreground text-sm md:text-base">
            Compare our prices with quick commerce apps
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {priceComparisons.map((comparison, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-2"
                >
                  <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm">
                    {/* Header */}
                    <div className="bg-primary/10 p-4 text-center">
                      <span className="text-5xl mb-2 block">{comparison.emoji}</span>
                      <h4 className="text-xl font-bold text-foreground">{comparison.product}</h4>
                    </div>

                    {/* Our Price */}
                    <div className="p-4 bg-accent/10 border-b border-border/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BadgeCheck className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-foreground">Farm2Flat</span>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-accent">₹{comparison.ourPrice}</span>
                          <span className="text-muted-foreground text-sm">/{comparison.unit}</span>
                        </div>
                      </div>
                    </div>

                    {/* Competitor Prices */}
                    <div className="p-4 space-y-3">
                      {comparison.competitors.map((competitor, idx) => {
                        const savings = competitor.price - comparison.ourPrice;
                        const savingsPercent = Math.round((savings / competitor.price) * 100);
                        return (
                          <div key={idx} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{competitor.logo}</span>
                              <span className="text-muted-foreground">{competitor.name}</span>
                            </div>
                            <div className="text-right flex items-center gap-2">
                              <span className="text-foreground line-through opacity-60">
                                ₹{competitor.price}
                              </span>
                              <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full font-medium">
                                +{savingsPercent}%
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Savings Banner */}
                    <div className="bg-accent text-accent-foreground p-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <TrendingDown className="w-4 h-4" />
                        <span className="font-semibold text-sm">
                          Save up to ₹{Math.max(...comparison.competitors.map(c => c.price)) - comparison.ourPrice}/{comparison.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-background/90 backdrop-blur-sm hidden md:flex"
            onClick={scrollPrev}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-background/90 backdrop-blur-sm hidden md:flex"
            onClick={scrollNext}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Trust Badge */}
        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">
            💡 <span className="font-medium">Pro tip:</span> Buy directly from farmers, skip the middlemen!
          </p>
        </div>
      </div>
    </section>
  );
};

export default PriceComparisonCarousel;
