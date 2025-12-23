import { Phone, Mail, User } from "lucide-react";

const BusinessDetails = () => {
  return (
    <section className="bg-secondary/50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Contact <span className="text-primary">Us</span>
          </h3>
          <p className="text-muted-foreground">
            Get in touch for bulk orders or inquiries
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl p-6 shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground mb-1">Business Owner</h4>
            <p className="text-primary font-medium">Sunil Dabholkar</p>
          </div>
          
          <div className="bg-card rounded-2xl p-6 shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground mb-1">Contact Number</h4>
            <a 
              href="tel:9892162899" 
              className="text-primary font-medium hover:underline"
            >
              +91 98921 62899
            </a>
          </div>
          
          <div className="bg-card rounded-2xl p-6 shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground mb-1">Email</h4>
            <a 
              href="mailto:farmflats369@gmail.com" 
              className="text-primary font-medium hover:underline text-sm md:text-base"
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
