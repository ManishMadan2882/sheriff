/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'silver': '#c4c4c4',
        'rainy-gray': '#a4a4a4',
        'raisin-black':'#222327',
        'chinese-black':'#161616',
        'chinese-silver':'#CDCDCD',
        'dark-charcoal':'#2F3036',
        'bright-gray':'#ECECF1',
        'outer-space':'#444654',
        'gun-metal':'#2E303E',
      }
    },
  },
  plugins: [],
}