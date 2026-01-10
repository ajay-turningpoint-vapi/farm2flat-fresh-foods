import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  CreditCard,
  Banknote,
  Download,
  Copy,
  Check,
} from "lucide-react";
import { CartItem } from "@/types/product";
import upiQR from "@/assets/upi-qr.jpeg";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: CartItem[];
  onPlaceOrder: (paymentMethod: "cod" | "online", address: string) => void;
}

const UPI_ID = "sunil.dabholakar91-1@oksbi";

const PaymentModal = ({
  open,
  onOpenChange,
  cartItems,
  onPlaceOrder,
}: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");
  const [copied, setCopied] = useState(false);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const qrRef = useRef<HTMLImageElement | null>(null);
  const [highlightQR, setHighlightQR] = useState(false);

  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("f2f_address_v1");
      if (saved) setAddress(saved);
    } catch (e) {}
  }, []);

  const saveAddress = (addr: string) => {
    setAddress(addr);
    try {
      localStorage.setItem("f2f_address_v1", addr);
    } catch (e) {}
  };

  const handlePlaceOrder = () => {
    if (!address || address.trim().length === 0) {
      alert("Please enter your delivery address before placing the order.");
      return;
    }

    onPlaceOrder(paymentMethod, address);
    onOpenChange(false);
  };

  const handleCopyUPI = () => {
    // Create a temporary textarea element for copying
    const textArea = document.createElement("textarea");
    textArea.value = UPI_ID;
    textArea.style.position = "fixed";
    textArea.style.left = "-99999999px";
    textArea.style.top = "-99999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback: try clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
          .writeText(UPI_ID)
          .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          })
          .catch(() => {
            alert("Failed to copy. Please copy manually: " + UPI_ID);
          });
      } else {
        alert("Failed to copy. Please copy manually: " + UPI_ID);
      }
    }

    document.body.removeChild(textArea);
  };

  const handleDownloadQR = () => {
    const link = document.createElement("a");
    link.href = upiQR;
    link.download = "farm2flat-upi-qr.jpeg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // When online payment is selected on small screens, scroll modal to bottom
  useEffect(() => {
    if (paymentMethod !== "online") return;
    if (typeof window === "undefined") return;
    if (window.innerWidth >= 640) return;

    const t = setTimeout(() => {
      try {
        const el = dialogRef.current;
        if (el) {
          el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
        }

        const q = qrRef.current;
        if (q) {
          q.scrollIntoView({ behavior: "smooth", block: "center" });
          setHighlightQR(true);
          setTimeout(() => setHighlightQR(false), 1600);
        }
      } catch (e) {
        /* ignore */
      }
    }, 120);

    return () => clearTimeout(t);
  }, [paymentMethod]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent ref={dialogRef} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Choose Payment Method
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {/* Order Summary */}
          <div className="bg-secondary/50 rounded-xl p-4">
            <h4 className="font-semibold text-foreground mb-2">
              Order Summary
            </h4>
            <div className="space-y-1 text-sm">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-muted-foreground"
                >
                  <span>
                    {item.name} × {item.quantity} {item.unit}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-2 pt-2 flex justify-between font-bold text-foreground">
              <span>Total</span>
              <span className="text-primary">₹{totalPrice}</span>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-secondary/50 rounded-xl p-4">
            <h4 className="font-semibold text-foreground mb-2">
              Delivery Address
            </h4>
            <textarea
              value={address}
              onChange={(e) => saveAddress(e.target.value)}
              placeholder="Enter delivery address (house, street, city, pincode)"
              className="w-full p-2 rounded border resize-none h-20 mb-2"
            />
            <p className="text-xs text-muted-foreground">
              Address is saved to your device and will be included in the
              WhatsApp message.
            </p>
          </div>

          {/* Payment Options */}
          <div className="space-y-3">
            <button
              onClick={() => setPaymentMethod("cod")}
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                paymentMethod === "cod"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <Banknote className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">
                  Cash on Delivery
                </p>
                <p className="text-sm text-muted-foreground">
                  Pay when you receive
                </p>
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod("online")}
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                paymentMethod === "online"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">
                  Online Payment (UPI)
                </p>
                <p className="text-sm text-muted-foreground">
                  Pay via UPI/GPay/PhonePe
                </p>
              </div>
            </button>
          </div>

          {/* UPI QR Code - shown when online payment selected */}
          {paymentMethod === "online" && (
            <div className="bg-card border border-border rounded-xl p-4 text-center animate-fade-in">
              <p className="text-sm text-muted-foreground mb-3">
                Scan QR code or use UPI ID to pay ₹{totalPrice}
              </p>
              <img
                ref={qrRef}
                src={upiQR}
                alt="UPI Payment QR Code"
                className={`w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-lg border border-border transition-shadow duration-300 ${
                  highlightQR ? "ring-4 ring-primary/60 shadow-lg" : ""
                }`}
              />

              {/* Action Buttons */}
              <div className="flex gap-2 justify-center mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadQR}
                  className="flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download QR
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyUPI}
                  className="flex items-center gap-1.5"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy UPI ID
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-3 bg-secondary/50 rounded-lg p-2">
                <p className="text-xs text-muted-foreground">UPI ID</p>
                <p className="font-semibold text-primary text-sm">{UPI_ID}</p>
              </div>
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs text-amber-800">
                  <strong>Disclaimer:</strong> After payment, share the
                  screenshot on <strong>+91 98921 62899</strong> to confirm your
                  order.
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                After sharing screenshot, click below to confirm order on
                WhatsApp
              </p>
            </div>
          )}

          <Button
            variant="whatsapp"
            size="lg"
            className="w-full"
            onClick={handlePlaceOrder}
            disabled={!address || address.trim().length === 0}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {paymentMethod === "online"
              ? "Confirm & Send Order"
              : "Place Order on WhatsApp"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
