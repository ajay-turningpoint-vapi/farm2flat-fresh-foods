import { TrendingUp } from "lucide-react";

const PriceNotice = () => {
  return (
    <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 mb-8 animate-fade-in">
      <div className="flex items-start gap-3">
        <TrendingUp className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground">
            Prices updated daily based on market rates
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Today's prices are shown above. Final price will be confirmed on WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceNotice;
