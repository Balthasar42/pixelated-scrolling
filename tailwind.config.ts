import type { Config } from "tailwindcss"
import theme from "tailwindcss/defaultTheme"

export default <Partial<Config>>{
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ...theme.fontFamily,
        serif: ["Neuton", ...theme.fontFamily.serif],
        sans: ["Outfit", ...theme.fontFamily.sans],
        body: ["Outfit", ...theme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
