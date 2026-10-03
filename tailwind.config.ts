import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", sm: "1.5rem" }, screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        ink: { DEFAULT: "#050507", 900: "#08080d", 800: "#0D0D12", 700: "#13131a", 600: "#1b1b26" },
        violet: { DEFAULT: "#7C3AED", 300: "#c4b5fd", 400: "#a78bfa", 500: "#8b5cf6", 600: "#7C3AED" },
        indigo: { DEFAULT: "#4F46E5", 400: "#818cf8" },
        cyan: { DEFAULT: "#06B6D4", 200: "#a5f3fc", 300: "#67e8f9", 400: "#22d3ee", 500: "#06B6D4" },
        mute: { DEFAULT: "#94A3B8", 2: "#64748b", 3: "#475569" }
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #7C3AED 0%, #4F46E5 45%, #06B6D4 100%)",
        "text-gradient": "linear-gradient(100deg, #c4b5fd 0%, #a78bfa 30%, #67e8f9 75%, #06B6D4 100%)"
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        sweep: { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
        ping2: { "0%": { transform: "scale(.6)", opacity: ".9" }, "100%": { transform: "scale(2.6)", opacity: "0" } },
        shimmer: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
        "border-spin": { to: { "--angle": "360deg" } }
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        sweep: "sweep 4s linear infinite",
        ping2: "ping2 2.2s cubic-bezier(0,0,.2,1) infinite",
        shimmer: "shimmer 6s linear infinite",
        float: "float 6s ease-in-out infinite",
        blink: "blink 1s step-end infinite"
      }
    }
  },
  plugins: []
};
export default config;
