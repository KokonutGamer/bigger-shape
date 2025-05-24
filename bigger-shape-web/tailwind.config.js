/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  safelist: [
    "bg-gradient-to-br from-blue-200 to-blue-500",
    "bg-gradient-to-br from-gray-100 to-gray-100",
    "min-w-[1rem]",
    "min-w-[20rem]",
    "min-w-[25rem]",
    "min-w-[30rem]",
    "min-w-[50rem]",
    "p-[3vh]",
    "sm:p-[4vh]",
    "md:p-[5vh]",
    "p-[5vh]",
    "sm:p-[6vh]",
    "md:p-[7vh]",
    "md:p-[35vh]",
    "md:p-[38vh]",
    "md:p-[39vh]",
    "md:p-[40vh]",
    "flex flex-row space-x-4",
  ],
  plugins: [],
};
