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
        sans: ["'Circular'", "'Cereal'", "'Helvetica Neue'", ...fontFamily.sans],
        serif: ["'Georgia'", "serif"],
        heading: ["'Circular'", "'Cereal'", "sans-serif"],
        montserrat: ["'Montserrat'", "sans-serif"],
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "subtle-bounce": "subtle-bounce 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite linear",
        "glow": "glow 2s ease-in-out infinite alternate",
        "fade-in": "fade-in 0.5s ease-out",
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
            boxShadow: "0 5px 15px 0px rgba(0,0,0,0.05)"
          },
          "25%": { 
            transform: "translateY(-10px) rotate(1deg)",
            boxShadow: "0 15px 15px 0px rgba(0,0,0,0.025)"
          },
          "50%": { 
            transform: "translateY(-20px) rotate(-1deg)",
            boxShadow: "0 25px 15px 0px rgba(0,0,0,0.0125)"
          },
          "75%": { 
            transform: "translateY(-10px) rotate(1deg)",
            boxShadow: "0 15px 15px 0px rgba(0,0,0,0.025)"
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
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)"
          },
          "100%": {
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.2), 0 0 30px rgba(0, 0, 0, 0.1)"
          }
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
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
        airbnb: {
          red: "#00A4D4",
          pink: "#00A4D4",
          darkpink: "#0080A8",
          purple: "#3A6EA5",
          navy: "#004E64",
          teal: "#00A699",
          green: "#008489",
          yellow: "#FCB017",
          orange: "#FC642D",
          light: "#E8F5F9",
          dark: "#222222",
          gray: "#717171",
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
        elegant: {
          DEFAULT: "#1D1D1F",
          50: "#F5F5F7",
          100: "#E8E8ED",
          200: "#D2D2D7",
          300: "#AEAEB2",
          400: "#8E8E93",
          500: "#636366",
          600: "#48484A",
          700: "#363638",
          800: "#2C2C2E",
          900: "#1D1D1F",
          950: "#000000",
        },
        apple: {
          DEFAULT: "#FF5A5F",
          light: "#FF385C",
          dark: "#D93B30",
        },
        rolex: {
          DEFAULT: "#006039",
          gold: "#A37E2C",
          silver: "#E0E0E0",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "sm": "0 1px 2px rgba(0, 0, 0, 0.05)",
        "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "card-hover": "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        "airbnb": "0 6px 16px rgba(0, 0, 0, 0.12)",
        "airbnb-hover": "0 6px 20px rgba(0, 0, 0, 0.2)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-shine": "linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.3) 50%, transparent 75%)",
        "gradient-apple": "linear-gradient(180deg, #42a1ec 0%, #0070c9 100%)",
        "gradient-rolex": "linear-gradient(to right, #006039, #004C2C)",
        "gradient-airbnb": "linear-gradient(to right, #FF385C, #D93B30)",
      },
    },
  },
  plugins: [animatePlugin],
} satisfies Config

export default config
