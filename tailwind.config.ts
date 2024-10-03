import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontWeight: {
      extrabold: "800",
      bold: "700",
      medium: "500",
      regular: "400",
      thin: "300",
    },
    fontFamily: {
      kanit: "Kanit"
    },
    colors: {
      "primary-1": "#FFCE82",
      "primary-2": "#9967AC",
      "primary-3": "#632169",
      "secondary-1": "#FFE2BD",
      "secondary-2": "#FE9F67",
      "secondary-3": "A34053",
      "title-1": "#323130",
      "title-2": "#605E5C",
      "title-3": "#A19F9D",
      "system-white": "#FCFCFC",
      "system-light-gray": "#EDEDED",
      "system-gray": "#D9D9D9",
      "system-success": "#64E39E",
      "system-success-light": "#E1FFE5",
      "system-error": "#FA8585",
      "system-error-light": "#FFDEDE",
    }
  },
  plugins: [],
};
export default config;
