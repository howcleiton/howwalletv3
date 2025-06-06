
/** @type {import("tailwindcss").Config} */
const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
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
      padding: "1rem", // Adjusted padding for mobile-first
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    extend: {
      colors: {
        // Define precise colors based on reference images (approximated here)
        // Dark Mode Palette (Inspired by manus*.png)
        dark: {
          background: "#161620", // Very dark background
          card: "#1F1F2B",       // Slightly lighter card/input background
          primary: "#7B61FF",    // Vibrant purple for buttons/accents
          secondary: "#2A2A4D",  // Secondary elements background
          text: "#FFFFFF",       // Primary text (white)
          muted: "#A0A0B0",     // Muted text (light gray)
          border: "#3A3A59",     // Subtle borders
          accent: "#937EFF",     // Lighter purple accent
        },
        // Light Mode Palette (Inverted/Adjusted)
        light: {
          background: "#F9F9F9", // Light background
          card: "#FFFFFF",       // White card/input background
          primary: "#7B61FF",    // Vibrant purple (consistent)
          secondary: "#F0F0F0",  // Secondary elements background (light gray)
          text: "#161620",       // Primary text (dark)
          muted: "#6B7280",     // Muted text (medium gray)
          border: "#E5E7EB",     // Subtle borders (light gray)
          accent: "#6A5ACD",     // Slightly darker purple accent for contrast
        },
        // Shadcn UI variables mapped to our theme (Optional but good practice)
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
      },
      borderRadius: {
        // Consistent border radius from references
        xl: "1rem", // Larger radius for main containers/buttons
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      fontFamily: {
        // Add Inter font (assuming it will be imported via CSS)
        sans: ["'Inter'", ...fontFamily.sans],
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

