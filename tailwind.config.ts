import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    function ({addUtilities}: {addUtilities:any}){
      const newUtilities = {
      ".scrollbar-ms" :{
        scrollbarWidth: "thin",
        scrollbarColor: "rgb(55, 54, 66) white",
        
      },
      ".scrollbar-webkit":{
        "&::-webkit-scrollbar":{
          width: "8px",
         
        },
        "&::-webkit-scrollbar-track":{
          background: "white",
          borderRadius: "20px",
        },
        "&::-webkit-scrollbar-thumb":{
          background: "rgb(55, 54, 66)",
          borderRadius: "20px",
          border: "1px solid white"
        },
      },
      '.capitalize-first:first-letter': {
        textTransform: 'uppercase',
      },
    }
    addUtilities(newUtilities, ["responsive", "hover"])
    }
  ],
  darkMode: 'class',
};
export default config;
