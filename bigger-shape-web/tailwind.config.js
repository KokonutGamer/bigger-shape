/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  safelist: [
    "min-w-[20rem]",
    "min-w-[25rem]",
    "min-w-[30rem]",
    "p-[3vh]",
    "sm:p-[4vh]",
    "md:p-[5vh]",
    "p-[5vh]",
    "sm:p-[6vh]",
    "md:p-[7vh]",
  ],
  plugins: [],
};
