import logo from "@/assets/farm2flat-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-6 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Farm2Flats Logo"
              className="w-10 h-10 rounded-full border-2 border-primary-foreground/30"
            />
            <div>
              <h3 className="text-lg font-bold">Farm2Flats</h3>
              <p className="text-xs text-primary-foreground/80">
                Fresh from farm to your doorstep
              </p>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-xs text-primary-foreground/80">
              Order via WhatsApp for quick delivery
            </p>
            <p className="text-[10px] text-primary-foreground/60 mt-1">
              © {new Date().getFullYear()} Farm2Flats. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
