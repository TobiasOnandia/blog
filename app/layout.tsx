import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";
import TRPCProvider from "@/utils/Provider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

const geistSans = Courier_Prime({
  weight: ["400", "700"],
  variable: "--font-courier-prime",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog by Tobias Onandia",
  keywords: ["Blog", "Tobias Onandia", "Next.js", "React", "Typescript"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} antialiased `}>
        <TRPCProvider>
          {/* <Header /> */}
          {children}
          {/* <Footer /> */}
        </TRPCProvider>
      </body>
    </html>
  );
}
