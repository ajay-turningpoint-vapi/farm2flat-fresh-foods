import { Phone, PhoneCall } from "lucide-react";
import logo from "@/assets/farm2flat-logo.png";

const PHONE_NUMBER = "+919892162899";

const Header = () => {
  const handleCall = () => {
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

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

        {/* Contact Number - shown on desktop */}
        <div className="hidden md:flex items-center gap-2 text-sm">
          <PhoneCall className="w-4 h-4 text-primary" />
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="font-semibold text-foreground hover:text-primary transition-colors"
          >
            {PHONE_NUMBER}
          </a>
        </div>

        {/* Mobile Call Button - visible only on small screens */}
        <button
          onClick={handleCall}
          className="md:hidden w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
          aria-label="Call us"
        >
          <Phone className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
