import type { Metadata } from "next";
import "./globals.css";

import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${diaType.variable} ${ppModwest.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
