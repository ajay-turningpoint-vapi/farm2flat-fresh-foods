import logo from "@/assets/farm2flat-logo.png";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Farm2Flats Logo"
            className="w-12 h-12 rounded-full shadow-soft animate-float"
          />
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-primary tracking-tight">
              FARM2FLATS
            </h1>
            <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">
              Fresh produce, straight to you
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
