import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"
import animatePlugin from "tailwindcss-animate"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["'Inter'", ...fontFamily.sans],
        montserrat: ["'Montserrat'", "sans-serif"],
        heading: ["'Montserrat'", "sans-serif"],
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "subtle-bounce": "subtle-bounce 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite linear",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "subtle-bounce": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10%)",
          },
        },
        "float": {
          "0%, 100%": { 
            transform: "translateY(0) rotate(0deg)",
            boxShadow: "0 5px 15px 0px rgba(0,0,0,0.1)"
          },
          "25%": { 
            transform: "translateY(-10px) rotate(1deg)",
            boxShadow: "0 15px 15px 0px rgba(0,0,0,0.05)"
          },
          "50%": { 
            transform: "translateY(-20px) rotate(-1deg)",
            boxShadow: "0 25px 15px 0px rgba(0,0,0,0.025)"
          },
          "75%": { 
            transform: "translateY(-10px) rotate(1deg)",
            boxShadow: "0 15px 15px 0px rgba(0,0,0,0.05)"
          }
        },
        "shimmer": {
          from: {
            backgroundPosition: "0% 0%",
          },
          to: {
            backgroundPosition: "-200% 0%",
          },
        },
        "glow": {
          "0%": {
            boxShadow: "0 0 5px rgba(124, 58, 237, 0.5)"
          },
          "100%": {
            boxShadow: "0 0 20px rgba(124, 58, 237, 0.8), 0 0 30px rgba(167, 139, 250, 0.6)"
          }
        }
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        vibrant: {
          purple: "#9b87f5",
          pink: "#D946EF",
          blue: "#0EA5E9",
          cyan: "#06B6D4",
          orange: "#F97316",
          red: "#EF4444",
          green: "#10B981",
          yellow: "#F59E0B",
        },
        soft: {
          purple: "#E5DEFF",
          pink: "#FFDEE2",
          blue: "#D3E4FD",
          green: "#F2FCE2",
          yellow: "#FEF7CD",
          orange: "#FDE1D3",
          gray: "#F1F0FB",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "glow-sm": "0 0 10px rgba(124, 58, 237, 0.5)",
        "glow-md": "0 0 15px rgba(124, 58, 237, 0.6)",
        "glow-lg": "0 0 20px rgba(124, 58, 237, 0.7), 0 0 30px rgba(167, 139, 250, 0.5)",
        "card-hover": "0 10px 25px -5px rgba(124, 58, 237, 0.3)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-shine": "linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.3) 50%, transparent 75%)",
      },
    },
  },
  plugins: [animatePlugin],
} satisfies Config

export default config
