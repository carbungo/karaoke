import type { Metadata } from "next";
import { Inter, Noto_Color_Emoji, Playfair_Display, Fira_Code } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const emoji = Noto_Color_Emoji({ subsets: ["emoji"], weight: "400", variable: "--font-emoji" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-chorus" });
const fira = Fira_Code({ subsets: ["latin"], variable: "--font-crab" });

export const metadata: Metadata = {
  title: "\u{1F980} All Star Karaoke \u2014 RSC Edition",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${emoji.variable} ${playfair.variable} ${fira.variable}`}>
      <body>{children}</body>
    </html>
  );
}
