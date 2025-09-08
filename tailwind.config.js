/** @type {import('tailwindcss').Config} */
const { Color } = require('./constants/theme/color');
const { BorderRadius } = require("./constants/theme/border-radius");
const { BorderWidth } = require("./constants/theme/border-width");
const { FontSize, FontWeight, FontFamily } = require("./constants/theme/font");
const { LayoutSize } = require("./constants/theme/layout-size");

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    borderRadius: BorderRadius,
    borderWidth: BorderWidth,
    fontSize: FontSize,
    fontWeight: FontWeight,
    fontFamily: FontFamily,
    colors: Color,
    extend: {
      spacing: LayoutSize,
    }
  },
  plugins: [],
}