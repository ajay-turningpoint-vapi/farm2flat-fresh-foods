import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        whatsapp:
          "bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 hover:shadow-lg active:scale-[0.98]",
        accent:
          "bg-accent text-accent-foreground hover:bg-accent/90 active:scale-[0.98]",
        quantity:
          "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground h-8 w-8 p-0",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** show a small notification when the button is clicked */
  notify?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, notify = true, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    // wrap onClick to show a small notification
    const { onClick } = props as ButtonProps;
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      try {
        if (notify) {
          const label =
            (props as any)["aria-label"] ||
            (props as any).title ||
            (typeof props.children === "string" ? props.children : "Action");
          // toast(`${label}` || "Action");
        }
      } catch (err) {
        // ignore
      }
      if (onClick) onClick(e);
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        onClick={handleClick}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
