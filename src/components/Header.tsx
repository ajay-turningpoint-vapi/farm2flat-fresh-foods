import logo from "@/assets/farm2flat-logo.png";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="Farm2Flat Logo" 
            className="w-14 h-14 rounded-full shadow-soft animate-float"
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-primary tracking-tight">
              FARM2FLAT
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Fresh produce, straight to you
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
