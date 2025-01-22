"use client"
import type { Metadata } from "next";
import { Roboto, Ropa_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import Mailer from "@/components/Mailer";
import { Suspense, useState } from "react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-roboto", // Optional for CSS variable
});

const ropaSans = Ropa_Sans({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-ropa-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isExpand, setIsExpand] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="en" className={`${ropaSans.variable} bg-dark-purple-100`}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/tag.png" type="image/x-icon" sizes="200x256" />
        <link rel="apple-touch-icon" href="/tag.png" />
        <title>soogle</title>

        <meta property="og:title" content="soogle" />
        <meta property="og:image" content="https://res.cloudinary.com/dz41q2wez/image/upload/v1737544981/bg-photo_nuemvq.jpg" />
        <meta property="og:url" content="https://saurabh-jaiswar.netlify.app/" />
        <meta property="og:type" content="website" />
      </head>

      <body className="flex flex-col min-h-screen relative">
        <Suspense fallback={<div>Loading Header...</div>}>
          <Header setShowMailer={setIsOpen} />
        </Suspense>

        <main className="flex-grow flex">
          <div className="w-full">
            <Suspense fallback={<div>Loading Body...</div>}>
              {children}
            </Suspense>
          </div>
        </main>

        {isOpen && (
          <Suspense fallback={<div>Loading Mailer...</div>}>
            <div
              className={`${isExpand
                  ? "fixed inset-0 bg-gray-900 bg-opacity-70 z-40 flex items-center justify-center"
                  : "fixed inset-0 bg-gray-900 bg-opacity-7 flex items-center justify-center md:block  md:bg-transparent md:inset-auto md:bottom-0 md:right-0 shadow-2xl"
                } `}
              style={{ zIndex: 100 }}
            >
              <Mailer
                isExpand={isExpand}
                isOpen={isOpen}
                setIsExpand={setIsExpand}
                setIsOpen={setIsOpen}
              />
            </div>
          </Suspense>
        )}

        <Footer />
      </body>
    </html>
  );
}
