import { Phone, Mail, User } from "lucide-react";

const BusinessDetails = () => {
  return (
    <section className="bg-secondary/50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
            Contact <span className="text-primary">Us</span>
          </h3>
          <p className="text-muted-foreground text-xs">
            Get in touch for bulk orders or inquiries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="bg-card rounded-xl p-4 shadow-md text-center hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground mb-0.5 text-sm">
              Business Owner
            </h4>
            <p className="text-primary font-medium text-sm">Sunil Dabholkar</p>
          </div>

          <div className="bg-card rounded-xl p-4 shadow-md text-center hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground mb-0.5 text-sm">
              Contact Number
            </h4>
            <a
              href="tel:9892162899"
              className="text-primary font-medium hover:underline text-sm"
            >
              +91 98921 62899
            </a>
          </div>

          <div className="bg-card rounded-xl p-4 shadow-md text-center hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground mb-0.5 text-sm">
              Email
            </h4>
            <a
              href="mailto:farmflats369@gmail.com"
              className="text-primary font-medium hover:underline text-xs"
            >
              farmflats369@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessDetails;
