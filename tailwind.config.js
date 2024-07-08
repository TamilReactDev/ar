/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(61,224,248,1) 19%, rgba(85,90,236,1) 54%, rgba(241,70,252,1) 92%)',
      },
      boxShadow: {
        'gradient': '0 -5px 30px rgba(61,224,248,0.5), 0 6px 20px rgba(61,224,248,0.5), 0 8px 30px rgba(61,224,248,0.5)',
      },
      fontFamily: {
        Font: ['Bratome','Inter'],
        Inter:['Inter']
      },
      colors: {
        "primary": '#002c8d',
        "secondary": '#4143FF',
        'blue-light': '#3de0f8',
        'blue-dark': '#002c8d',
        'purple-light': '#f146fc',
        'custom-gradient-start': '#56EDE8',
        'custom-gradient-end': '#AB41F8',
        
      },
      fontSize: {
        'base': '16px',
        'lg': '17px',
        'sm':'18px',
        'xl': '24px',
        '2xl': '30px',
        '3xl': '36px',
      },
    },
  },
  plugins: [],
}

