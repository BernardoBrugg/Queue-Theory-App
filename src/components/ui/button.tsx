import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--border-radius)] text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--input-focus)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--button-bg)] text-[var(--button-text)] hover:bg-[var(--button-hover)] shadow-lg hover:shadow-xl hover:transform hover:-translate-y-0.5",
        destructive:
          "bg-[var(--button-danger)] text-[var(--button-text)] hover:bg-[var(--button-danger-hover)] shadow-lg hover:shadow-xl hover:transform hover:-translate-y-0.5",
        outline:
          "border-2 border-[var(--element-border)] bg-[var(--element-bg)] text-[var(--text-primary)] hover:bg-[var(--accent-light)] hover:text-[var(--button-bg)]",
        secondary:
          "bg-[var(--text-muted)] text-[var(--button-text)] hover:bg-[var(--text-secondary)]",
        ghost: "hover:bg-[var(--accent-light)] hover:text-[var(--button-bg)] text-[var(--text-primary)]",
        link: "text-[var(--button-bg)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
