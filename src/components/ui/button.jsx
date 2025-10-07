import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98] shadow-md hover:shadow-lg [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-border text-foreground bg-transparent hover:bg-muted/20",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline underline-offset-4 hover:opacity-80",
        gradientDuoTone:
          "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 shadow-lg hover:shadow-xl hover:brightness-110 border-none",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-8 px-3 text-xs rounded-md",
        lg: "h-11 px-8 text-base rounded-lg",
        icon: "h-10 w-10 p-2",
      },
      outline: {
        true: "border-2 border-current bg-transparent hover:bg-opacity-10 hover:shadow-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      outline: false,
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, outline, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, outline, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
