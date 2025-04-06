import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        gold: "bg-gold-500 text-black-900 border-gold-600",
        goldOutline: "bg-transparent text-gold-500 border-gold-500",
        goldGlass: "bg-black-800/80 backdrop-blur-md border-gold-500/30 text-gold-500",
        blackGold: "bg-black-800 text-gold-500 border-gold-500/50",
        basic: "bg-blue-100 text-blue-700 border-blue-200",
        comfort: "bg-purple-100 text-purple-700 border-purple-200",
        elite: "bg-amber-100 text-amber-700 border-amber-200",
        gradient: "border-transparent bg-gradient-to-r from-blue-600 to-indigo-600 text-white",
        gradientPurple: "border-transparent bg-gradient-to-r from-purple-600 to-pink-600 text-white",
        gradientGreen: "border-transparent bg-gradient-to-r from-green-600 to-emerald-600 text-white",
        gradientGold: "border-transparent bg-gradient-to-r from-amber-500 to-yellow-500 text-white",
        purple: "border-transparent bg-purple-500 text-white hover:bg-purple-600",
        blue: "border-transparent bg-blue-500 text-white hover:bg-blue-600",
        green: "border-transparent bg-green-500 text-white hover:bg-green-600",
        amber: "border-transparent bg-amber-500 text-white hover:bg-amber-600",
        pink: "border-transparent bg-pink-500 text-white hover:bg-pink-600",
        cyan: "border-transparent bg-cyan-500 text-white hover:bg-cyan-600",
        softPurple: "bg-purple-100 text-purple-700 border-purple-200",
        softBlue: "bg-blue-100 text-blue-700 border-blue-200",
        softGreen: "bg-green-100 text-green-700 border-green-200",
        softAmber: "bg-amber-100 text-amber-700 border-amber-200",
        softPink: "bg-pink-100 text-pink-700 border-pink-200",
        softCyan: "bg-cyan-100 text-cyan-700 border-cyan-200",
        goldGradient: "border-transparent bg-gradient-to-r from-gold-400 to-gold-600 text-black-900",
        softGold: "bg-gold-100 text-gold-700 border-gold-200",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        glow: "shadow-glow-sm",
        shimmer: "animate-shimmer bg-gradient-shine bg-[length:400%_100%]",
        goldGlow: "shadow-gold-sm",
        goldShimmer: "gold-shimmer"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none"
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, animation, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, animation }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
