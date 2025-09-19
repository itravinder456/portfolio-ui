"use client";

import Header from "@/components/Header/Header";
import "./globals.css";
import Assistant from "@/components/Assistant/Assistant";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import ScrollProgressor from "@/components/ScrollProgressor/ScrollProgressor";
import Providers from "@/lib/utils/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  // ✅ Lighter overlay on home, darker on other pages
  const overlayClass = pathname === "/" ? "bg-black/60" : "bg-black/90";

  return (
    <html lang="en">
      <body
        className="bg-cover bg-center relative"
        style={{ backgroundImage: "url('/bg-9.jpg')" }}
      >
        <Providers>
          {/* Overlay with smooth transition */}
          <div
            className={`absolute inset-0 transition-colors duration-700 ease-in-out ${overlayClass}`}
          />

          <div className="h-screen flex flex-col relative z-10">
            <Header />

            <ScrollProgressor mainRef={mainRef} />

            <main
              ref={mainRef}
              className="flex-1 overflow-y-auto px-6 py-8 flex items-center- justify-center"
            >
              {children}
            </main>

            <Assistant />
          </div>
        </Providers>
      </body>
    </html>
  );
}
