/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    fontFamily: {
      'raleway': ['Raleway'],
      'comfortaa': ['Comfortaa']
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        danger: "#DB0600",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        'text-color': 'var(--text-color)',
        'text-normal': 'var(--color-text)',
        'gray-accent-4': 'var(--gray-accent-4)',
        primary: {
          DEFAULT: "var(--color-primary)",
          gradient: "var(--color-primary-gradient)",
          '20': "var(--color-primary-20)",
          foreground: "hsl(var(--primary-foreground))",
          '50': '#fffeea',
          '100': '#fff8c5',
          '200': '#fff285',
          '300': '#ffe446',
          '400': '#ffd41b',
          '500': '#ffb60b',
          '600': '#e28800',
          '700': '#bb5f02',
          '800': '#984908',
          '900': '#7c3c0b',
          '950': '#481e00',
        },
        'barley-white': {
          '50': '#fff9ed',
          '100': '#ffefcf',
          '200': '#fedfaa',
          '300': '#fdc774',
          '400': '#fba43c',
          '500': '#f98916',
          '600': '#ea6d0c',
          '700': '#c2520c',
          '800': '#9a4112',
          '900': '#7c3712',
          '950': '#431a07',
        },
        'pattens-blue': {
          '50': '#eff6ff',
          '100': '#d3e5ff',
          '200': '#bddaff',
          '300': '#90c3ff',
          '400': '#5ca2fe',
          '500': '#367dfb',
          '600': '#1f5df1',
          '700': '#1847dd',
          '800': '#1a3bb3',
          '900': '#1b378d',
          '950': '#152356',
        },
        'we-peep': {
          '50': '#fcf4f4',
          '100': '#fae6e7',
          '200': '#f7d4d6',
          '300': '#f0b1b5',
          '400': '#e5848a',
          '500': '#d65d64',
          '600': '#c24047',
          '700': '#a23339',
          '800': '#872d32',
          '900': '#712b2f',
          '950': '#3d1214',
        },
        tetiary: {
          DEFAULT: 'var(--color-tetiary)'
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      background: {
        danger: "#DB0600"
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}