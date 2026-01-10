import heroBanner from "@/assets/hero-banner.jpg";

const HeroBanner = () => {
  return (
    <section className="relative w-full h-[250px] md:h-[350px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBanner})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/5 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4 animate-fade-in">
          <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground drop-shadow-lg mb-2">
            Fresh produce, <span className="text-accent">straight to you.</span>
          </h2>
          <p className="text-sm md:text-base text-primary-foreground/90 drop-shadow-md max-w-xs mx-auto">
            Order directly from the farm via WhatsApp
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
