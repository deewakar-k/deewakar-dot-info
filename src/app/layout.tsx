import type { Metadata } from "next";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Databuddy } from "@databuddy/sdk/react";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const diaType = localFont({
  src: [
    {
      path: "../../public/fonts/ABCDiatype-Light-Trial.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/ABCDiatype-Regular-Trial.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ABCDiatype-Medium-Trial.woff",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-diatype",
});

const ppModwest = localFont({
  src: [
    {
      path: "../../public/fonts/PPMondwest-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-ppModwest",
});

export const metadata: Metadata = {
  title: "Deewakar Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://deewakar.info",
    title: "Deewakar Kumar",
    siteName: "Deewakar Kumar",
    images: ["https://deewakar.info/og-mysite.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deewakar Kumar",
    creator: "@deewakar01",
    images: ["https://deewakar.info/og-mysite.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${diaType.variable} ${ppModwest.variable} ${jetBrainsMono.variable} antialiased`}
      >
        {children}
        <Databuddy clientId="NObFtXZL8_iHWP8vjYLux" enableBatching={true} />
      </body>
    </html>
  );
}
