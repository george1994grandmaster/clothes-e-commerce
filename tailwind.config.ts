import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        lightGrey: "rgba(255, 255, 255, 0.8)",
        dark: '#1D1D1D',
        yellow: '#D9EC00',
      },
      colors: {
        dark: "#1D1D1D",
        lightGrey: "rgba(255, 255, 255, 0.8)",
        yellow: "#D9EC00",
      },
      borderColor: {
        yellow: '#D9EC00',
      },
      height: {
       layout: "35vw",
       promo: "20vw",
       bannerHeight: '480px'
      },
      boxShadow: {
        shadow: "0 0 10px hsla(0,0%,50%,.5)",
        hoverShadow: '0 0 10px #D9EC00',
      },
      screens: {
          
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
export default config
