import type { Metadata } from "next";
import { Atma, Funnel_Sans, Roboto_Condensed } from "next/font/google";
import "./globals.css";


export const funnel = Funnel_Sans({
  weight: "400",
  variable: '--font-funnel',
  subsets: ["latin"],
  display: "swap",
});

export const atma = Atma({
  weight: "400",
  variable: '--font-atma',
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={funnel.className}>
      <body className={`${funnel.variable}`}>{children}</body>
    </html>
  );
}
