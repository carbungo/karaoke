import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "\u{1F980} All Star Karaoke \u2014 RSC Edition",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
