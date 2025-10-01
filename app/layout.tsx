import type { Metadata } from "next";
import { Montserrat, Raleway } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["cyrillic"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  title: "Tariffs",
  description: "Subscription tariffs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${montserrat.variable} ${raleway.variable} antialiased text-sm`}
      >
        {children}
      </body>
    </html>
  );
}
