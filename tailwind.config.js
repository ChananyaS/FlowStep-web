/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // FlowStep brand palette (sampled from the product designs)
        flow: {
          bg: "#e9f1f3", // app background (soft blue-grey)
          ink: "#1d2733", // primary text
          slate: "#5b6b7b", // secondary text
          muted: "#8a99a8", // tertiary / hint text
          primary: "#4d7494", // brand steel-blue (buttons)
          primaryDark: "#2f4d63",
          accent: "#2b6cb8", // logo blue
          success: "#52a07b", // green check / continue
          danger: "#e2574c", // forget device / reset
          orange: "#e8623a", // waveform accent
          card: "#ffffff",
          field: "#eef3f5",
          track: "#d5dee4", // slider track
        },
      },
      fontFamily: {
        sans: [
          "Nunito",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 6px 20px -8px rgba(29, 39, 51, 0.18)",
        soft: "0 2px 10px -4px rgba(29, 39, 51, 0.15)",
        phone: "0 30px 80px -20px rgba(29, 39, 51, 0.45)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
