import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: " Abonnement | Phillips Hue"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="fixed h-12 w-full t-0 bg-midnightBlue lg:px-6 flex lg:justify-center items-center z-50">
          <Image className="relative mx-6 -mb-8" src="/logo.svg" alt="logo" width={103} height={78} />
          <p className="hidden ml-16 lg:block text-white">Abonnement</p>
          <div className="hidden lg:block w-[400px] xl:w-[800px]"></div>
        </nav>
        {children}
      </body>
    </html>
  );
}
