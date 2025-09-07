"use client";

import Header from "@/components/Header/Header";
import "./globals.css";
import Assistant from "@/components/Assistant/Assistant";

import { useRef } from "react";
import ScrollProgressor from "@/components/ScrollProgressor/ScrollProgressor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mainRef = useRef<HTMLDivElement | null>(null);

  return (
    <html lang="en">
      <body
        className="bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-9.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="h-screen flex flex-col">
          <Header />

          <ScrollProgressor mainRef={mainRef} />

          <main
            ref={mainRef}
            className="flex-1 overflow-y-auto px-6- py-8- flex items-center- justify-center "
          >
            {children}
          </main>

          <Assistant />
        </div>
      </body>
    </html>
  );
}
