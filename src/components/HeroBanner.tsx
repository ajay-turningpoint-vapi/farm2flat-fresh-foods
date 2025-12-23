import heroBanner from "@/assets/hero-banner.jpg";

const HeroBanner = () => {
  return (
    <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBanner})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground drop-shadow-lg mb-4">
            Fresh produce,{" "}
            <span className="text-accent">straight to you.</span>
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/90 drop-shadow-md max-w-md mx-auto">
            Order directly from the farm via WhatsApp
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
