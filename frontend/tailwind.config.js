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
        "chinese-white":"#E0E0E0",
				"granite-gray": "#676767",
				"purple-X11":"#BB2BFFCC", //dark
				"ultramarine-blue":"#2B59FFCC",
				"ultramarine-light":"#305DFE1A",
				"philippine-silver":"#B7B7B7",
				"black-coral":"#565976",
				"fluorescent-blue":"#30FEFE1A",
				"purple-x11":"#BE3AFC1A", // light
				"blueberry":"#5277F91A",
				"palatinate-blue":"#3430FE1A",
				"yellow-orange":"#FBA43F1A",
				"royal-blue":"#407CE8",
				"deep-fuchsia":"#BD58C0",
				"dark-gunmetal":"#20242c",
				"cadet-gray":"#8F9BB7",
				"charleston-green":"#252835",
				"aryldine-yellow":"#EBC871",
				"cadmium-orange":"#ED8526"
      }
    },
  },
  plugins: [],
}