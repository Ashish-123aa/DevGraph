/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B0E14",
        surface: "#11151D",
        "surface-hover": "#161B26",
        border: "#1E2430",
        "text-primary": "#E6E8EB",
        "text-muted": "#8A93A6",
        accent: "#4FD1C5",
        "accent-hover": "#3FC0B3",
        // Ontology colors - one per node type, used consistently in nav, badges, graph, and charts.
        node: {
          skill: "#4FD1C5",
          technology: "#7C9EFF",
          project: "#F6A65B",
          jobrole: "#F27878",
          company: "#B989F5",
          developer: "#6FCF97",
          resource: "#E8D170",
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ["'Inter'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "10px",
      },
    },
  },
  plugins: [],
};
