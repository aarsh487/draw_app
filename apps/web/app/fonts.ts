import { Atma, Funnel_Display } from "next/font/google";

export const funnel: ReturnType<typeof Funnel_Display> = Funnel_Display({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
  });
  
  export const atma: ReturnType<typeof Atma> = Atma({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
  });