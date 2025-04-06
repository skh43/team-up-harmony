
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg",
        gradientPurple: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-md hover:shadow-lg",
        gradientGreen: "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-lg",
        gradientGold: "bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:from-amber-600 hover:to-yellow-600 shadow-md hover:shadow-lg",
        shine: "btn-shine bg-primary text-primary-foreground hover:bg-primary/90",
        glass: "bg-white/20 backdrop-blur-md border border-white/30 text-primary hover:bg-white/30 shadow-sm hover:shadow-md",
        // Airbnb-inspired theme variants but with new colors
        airbnb: "bg-airbnb-red text-white hover:bg-airbnb-darkpink shadow-sm rounded-lg",
        airbnbOutline: "bg-transparent text-airbnb-red border border-airbnb-red hover:bg-airbnb-red/5 rounded-lg",
        airbnbGradient: "bg-gradient-airbnb text-white hover:shadow-airbnb-hover rounded-lg",
        // Maintain old variants with new names for compatibility
        apple: "bg-airbnb-red text-white hover:bg-airbnb-darkpink shadow-sm rounded-lg",
        appleOutline: "bg-transparent text-airbnb-red border border-airbnb-red hover:bg-airbnb-red/5 rounded-lg",
        appleGradient: "bg-gradient-airbnb text-white hover:shadow-airbnb-hover rounded-lg",
        modern: "bg-elegant-900 text-white hover:bg-elegant-800 shadow-md",
        minimal: "bg-white border border-elegant-200 text-elegant-900 hover:bg-elegant-50",
        premium: "bg-white shadow-sm border border-elegant-200 text-elegant-900 hover:shadow-md hover:bg-elegant-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 text-base rounded-md px-10 py-3",
        icon: "h-10 w-10",
      },
      radius: {
        default: "rounded-md",
        none: "rounded-none",
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full"
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "hover:animate-subtle-bounce",
        scale: "transition-transform hover:scale-105 active:scale-95",
        shine: "btn-shine",
        glow: "hover:shadow-md transition-shadow duration-300",
        subtle: "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
        shimmer: "shimmer-effect"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "default",
      animation: "none"
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, radius, animation, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, radius, animation, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
