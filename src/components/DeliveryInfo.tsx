import { Clock, MapPin, Package, Shield } from "lucide-react";

const deliveryFeatures = [
  {
    icon: Clock,
    title: "Same Day Delivery",
    description: "Orders placed before 2 PM are delivered the same day",
  },
  {
    icon: MapPin,
    title: "Local Areas Covered",
    description: "We deliver across Mumbai and nearby areas",
  },
  {
    icon: Package,
    title: "Minimum Order",
    description: "No minimum order required - order as little or as much as you need",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Not satisfied? We'll replace or refund - no questions asked",
  },
];

const DeliveryInfo = () => {
  return (
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Delivery <span className="text-primary">Information</span>
          </h3>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            Fast, reliable delivery right to your doorstep
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {deliveryFeatures.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-4 p-4 md:p-6 bg-card rounded-xl border border-border/50"
            >
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryInfo;
