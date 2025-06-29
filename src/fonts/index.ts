import localFont from "next/font/local";
export const inter = localFont({
  src: [
    {
      path: "./inter/Inter-VariableFont_opsz,wght.ttf",
      style: "normal",
    },
    {
      path: "./inter/Inter-Italic-VariableFont_opsz,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});
