import type { Metadata } from "next";
import Image from "next/image";
import localFont from "next/font/local";
import "./globals.css";

const centraleSans = localFont({
  src: [
    {
      path: "./fonts/CentraleSans-Hairline.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/CentraleSans-HairlineItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "./fonts/CentraleSans-Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/CentraleSans-ThinItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./fonts/CentraleSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/CentraleSans-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/CentraleSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/CentraleSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/CentraleSans-Book.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/CentraleSans-BookItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/CentraleSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/CentraleSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },

    {
      path: "./fonts/CentraleSans-XBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/CentraleSans-XBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-centrale-sans",
});

export const metadata: Metadata = {
  title: " Abonnement | Phillips Hue",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={centraleSans.variable}>
        <nav className="fixed h-12 w-full t-0 bg-midnightBlue lg:px-6 flex lg:justify-center items-center z-50">
          <Image
            className="relative mx-6 -mb-8"
            src="/logo.svg"
            alt="logo"
            width={103}
            height={78}
          />
          <p className="hidden ml-16 lg:block text-white">Abonnement</p>
          <div className="hidden lg:block w-[400px] xl:w-[800px]"></div>
        </nav>
        {children}
      </body>
    </html>
  );
}
