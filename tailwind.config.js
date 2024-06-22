/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sblack: "#011627",
        swhite: "#FDFFFC",
        syellow: "#FAC40F",
        sgreen: "#62C370",
        sred: "#D35269",
        // bg: {
        //   sblack: "#011627",
        //   swhite: "#FDFFFC",
        //   syellow: "#FAC40F",
        //   sgreen: "#62C370",
        //   sred: "#D35269",
        // },
        // tx: {
        //   sblack: "#011627",
        //   swhite: "#FDFFFC",
        //   syellow: "#FAC40F",
        //   sgreen: "#62C370",
        //   sred: "#D35269",
        // },
        // btn: {
        //   sblack: "#011627",
        //   swhite: "#FDFFFC",
        //   syellow: "#FAC40F",
        //   sgreen: "#62C370",
        //   sred: "#D35269",
        // },
      },
    },
  },
  plugins: [require("daisyui")],
};
