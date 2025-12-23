import logo from "@/assets/farm2flat-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8 mt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="Farm2Flat Logo" 
              className="w-12 h-12 rounded-full border-2 border-primary-foreground/30"
            />
            <div>
              <h3 className="text-xl font-bold">Farm2Flat</h3>
              <p className="text-sm text-primary-foreground/80">
                Fresh from farm to your doorstep
              </p>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-primary-foreground/80">
              Order via WhatsApp for quick delivery
            </p>
            <p className="text-xs text-primary-foreground/60 mt-2">
              © {new Date().getFullYear()} Farm2Flat. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
