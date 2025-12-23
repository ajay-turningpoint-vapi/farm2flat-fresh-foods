import { ShoppingCart, MessageCircle, Truck, ThumbsUp } from "lucide-react";

const steps = [
  {
    icon: ShoppingCart,
    title: "Browse & Add",
    description: "Select fresh vegetables and add them to your cart with just a tap",
  },
  {
    icon: MessageCircle,
    title: "Order on WhatsApp",
    description: "Choose payment method and place order directly via WhatsApp",
  },
  {
    icon: Truck,
    title: "We Deliver",
    description: "Fresh produce delivered to your doorstep within 24 hours",
  },
  {
    icon: ThumbsUp,
    title: "Enjoy Fresh",
    description: "Enjoy farm-fresh vegetables with your family",
  },
];

const HowWeWork = () => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            How <span className="text-primary">We Work</span>
          </h3>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            Simple 4-step process to get fresh vegetables at your doorstep
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative text-center p-6 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mt-2 mb-4">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">{step.title}</h4>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
