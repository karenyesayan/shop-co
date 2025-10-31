"use client";

import React from "react";

import { cn } from "@/app/lib/utils";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const buttonVariants = {
      variant: {
        default:
          "bg-[hsl(0_0%_9%)] text-[hsl(0_0%_98%)] shadow hover:bg-[hsl(0_0%_9%)]/90",
        destructive:
          "bg-[hsl(0_84.2%_60.2%%)] text-[hsl(0_0%_98%)] shadow-sm hover:bg-[hsl(0_84.2%_60.2%%)]/90",
        outline:
          "border border-[hsl(0_0%_89.8%)] bg-[hsl(0_0%_100%)] shadow-sm hover:bg-[hsl(0_0%_96.1%)] hover:text-[hsl(0_0%_9%)]",
        secondary:
          "bg-[hsl(0_0%_96.1%)] text-[hsl(0_0%_9%)] shadow-sm hover:bg-[hsl(0_0%_96.1%)]/80",
        ghost: "hover:bg-[hsl(0_0%_96.1%)] hover:text-[hsl(0_0%_9%)]",
        link: "text-[hsl(0_0%_9%)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:ring-[hsl(0_0%_3.9%)] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };
