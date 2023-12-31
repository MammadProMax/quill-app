import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import "./globals.css";
import { cn, constructMetaData } from "@/lib/utils";

import Providers from "@/components/providers/index";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

import Navbar from "@/components/global/Navbar";
import { Toaster } from "@/components/ui/toaster";

export const fontSans = FontSans({
   subsets: ["latin"],
   variable: "--font-sans",
});
// export const fontVazir = Vazirmatn({
//    subsets: ["latin"],
//    variable: "--font-vazir",
// });

export const metadata: Metadata = constructMetaData({});

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <Providers>
         <html lang="en" dir="rtl" suppressHydrationWarning>
            <body
               className={cn(
                  "min-h-screen font-vazir antialiased",
                  fontSans.variable
                  // fontVazir.variable
               )}
            >
               <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
               >
                  <Toaster />
                  <Navbar />
                  {children}
               </ThemeProvider>
            </body>
         </html>
      </Providers>
   );
}
