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
        orange: '#cb5b1a',
        success: '#00381f'
      },
      colors: {
        dark: '#1D1D1D',
        lightGrey: "rgba(255, 255, 255, 0.8)",
        darkGrey: "rgba(163, 160, 160, 0.8)",
        yellow: "#D9EC00",
        orange: '#cb5b1a',
        darkTransparent: "#4F4F4F",
        success: '#00381f'
      },
      borderColor: {
        yellow: '#D9EC00',
        orange: '#cb5b1a'
      },
      boxShadow: {
        shadow: "0 0 10px hsla(0,0%,50%,.5)",
        hoverShadow: '0 0 10px #D9EC00',
      },
      screens: {
        'md': '992px', 
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
export default config
