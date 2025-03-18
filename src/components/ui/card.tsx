
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-card border-border",
        glass: "glass-card backdrop-blur-sm border-white/20",
        elevated: "bg-white shadow-lg hover:shadow-xl transition-shadow duration-300",
        outline: "bg-transparent border border-border shadow-none",
        gradient: "bg-gradient-to-br from-white to-gray-50 border-white/40",
        royal: "bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-100",
        primary: "bg-primary/10 border-primary/20",
        destructive: "bg-destructive/10 border-destructive/20",
      },
      padding: {
        default: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
        none: "p-0"
      },
      radius: {
        default: "rounded-lg",
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        xl: "rounded-2xl",
        full: "rounded-3xl"
      },
      animation: {
        none: "",
        hover: "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        scale: "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
        glow: "hover:shadow-glow-sm transition-shadow duration-300"
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "default", 
      radius: "default",
      animation: "none"
    }
  }
)

export interface CardProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<
  HTMLDivElement,
  CardProps
>(({ className, variant, padding, radius, animation, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardVariants({ variant, padding, radius, animation, className }))}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
