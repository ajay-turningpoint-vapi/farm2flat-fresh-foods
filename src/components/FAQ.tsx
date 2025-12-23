import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Simply add items to your cart, click 'Proceed to Order', choose your payment method (Cash on Delivery or UPI), and confirm. You'll be redirected to WhatsApp to complete your order.",
  },
  {
    question: "What are your delivery timings?",
    answer:
      "We deliver between 9 AM to 8 PM. Orders placed before 2 PM are usually delivered the same day. Orders after 2 PM are delivered the next day.",
  },
  {
    question: "Do prices change daily?",
    answer:
      "Yes, our prices are updated daily based on market rates. We ensure you always get the best farm-fresh prices without any middlemen markup.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Cash on Delivery (COD) and Online Payment via UPI. For UPI payments, you can scan our QR code or use our UPI ID: sushil@upi",
  },
  {
    question: "What if I'm not satisfied with the quality?",
    answer:
      "Customer satisfaction is our priority. If you're not happy with the quality of any product, contact us immediately and we'll replace it or provide a full refund.",
  },
  {
    question: "Is there a minimum order value?",
    answer:
      "No, there's no minimum order value. You can order as little or as much as you need!",
  },
  {
    question: "Which areas do you deliver to?",
    answer:
      "We currently deliver across Mumbai and nearby areas. Contact us on WhatsApp to check if we deliver to your location.",
  },
  {
    question: "Can I cancel or modify my order?",
    answer:
      "Yes, you can cancel or modify your order by messaging us on WhatsApp before the order is dispatched.",
  },
];

const FAQ = () => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Frequently Asked <span className="text-primary">Questions</span>
          </h3>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            Got questions? We've got answers!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border/50 rounded-xl px-4 md:px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-sm md:text-base font-medium text-foreground hover:text-primary py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
