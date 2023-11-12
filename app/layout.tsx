import type { Metadata } from "next";
import { Inter as FontSans, Vazirmatn } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";

export const fontSans = FontSans({
   subsets: ["latin"],
   variable: "--font-sans",
});
export const fontVazir = Vazirmatn({
   subsets: ["latin"],
   variable: "--font-vazir",
});

export const metadata: Metadata = {
   title: "Create Next App",
   description: "Generated by create next app",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en" dir="rtl" className="dark">
         <body
            className={cn(
               "min-h-screen font-vazir antialiased",
               fontSans.variable,
               fontVazir.variable
            )}
         >
            {children}
         </body>
      </html>
   );
}
