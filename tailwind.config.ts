import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-alt": "var(--bg-alt)",
        "bg-elevated": "var(--bg-elevated)",
        surface: "var(--surface)",
        border: "var(--border)",
        "border-light": "var(--border-light)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        amber: "var(--amber)",
        "amber-dark": "var(--amber-dark)",
        "amber-dim": "var(--amber-dim)",
        "amber-glow": "var(--amber-glow)",
        green: "var(--green)",
        "fb-blue": "var(--fb-blue)",
      },
      fontFamily: {
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
};
export default config;
