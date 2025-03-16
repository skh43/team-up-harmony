
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
				serif: ['Georgia', 'serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				cream: 'hsl(36, 33%, 94%)',
				'team-red': 'hsl(var(--team-red))',
				'team-blue': 'hsl(var(--team-blue))',
				'team-orange': 'hsl(var(--team-orange))',
				'team-green': 'hsl(var(--team-green))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'fade-out': {
					from: { opacity: '1' },
					to: { opacity: '0' }
				},
				'slide-up': {
					from: { transform: 'translateY(20px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-down': {
					from: { transform: 'translateY(-20px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-in-right': {
					from: { transform: 'translateX(100%)', opacity: '0' },
					to: { transform: 'translateX(0)', opacity: '1' }
				},
				'slide-in-left': {
					from: { transform: 'translateX(-100%)', opacity: '0' },
					to: { transform: 'translateX(0)', opacity: '1' }
				},
				'scale-in': {
					from: { transform: 'scale(0.95)', opacity: '0' },
					to: { transform: 'scale(1)', opacity: '1' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 5px rgba(0, 123, 255, 0.5)' },
					'50%': { boxShadow: '0 0 20px rgba(0, 123, 255, 0.8)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'slide-up': 'slide-up 0.5s ease-out',
				'slide-down': 'slide-down 0.5s ease-out',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'slide-in-left': 'slide-in-left 0.5s ease-out',
				'scale-in': 'scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
				'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'float': 'float 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-subtle': 'linear-gradient(to right, var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-futuristic': 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
			},
			boxShadow: {
				'subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
				'soft': '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
				'elegant': '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.01)',
				'neon': '0 0 10px rgba(14, 165, 233, 0.7), 0 0 20px rgba(14, 165, 233, 0.4)'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addComponents }) {
			addComponents({
				'.glass-panel': {
					backgroundColor: 'rgba(248, 243, 233, 0.1)',
					backdropFilter: 'blur(10px)',
					borderRadius: '0.75rem',
					boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)'
				},
				'.glass-card': {
					backgroundColor: 'rgba(255, 255, 255, 0.05)',
					backdropFilter: 'blur(7px)',
					borderRadius: '0.75rem',
					border: '1px solid rgba(255, 255, 255, 0.1)',
					boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)'
				},
				'.futuristic-panel': {
					backgroundColor: 'rgba(3, 7, 18, 0.7)',
					backdropFilter: 'blur(12px)',
					borderRadius: '1rem',
					border: '1px solid rgba(59, 130, 246, 0.2)',
					boxShadow: '0 0 20px rgba(59, 130, 246, 0.15)'
				},
				'.neon-border': {
					border: '1px solid rgba(59, 130, 246, 0.5)',
					boxShadow: '0 0 8px rgba(59, 130, 246, 0.5), inset 0 0 8px rgba(59, 130, 246, 0.2)'
				},
				'.neon-glow': {
					textShadow: '0 0 5px rgba(59, 130, 246, 0.7), 0 0 10px rgba(59, 130, 246, 0.5)'
				}
			});
		}
	],
} satisfies Config;
