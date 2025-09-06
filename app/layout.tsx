import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import { Anonymous_Pro, Artifika } from "next/font/google";

const anonymousPro = Anonymous_Pro({
  subsets: ["latin"],
  variable: "--font-tertiary",
  display: "swap",
  weight: "400",
});

const artifica = Artifika({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-primary",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Stars Travel - Intergalactic Space Travel",
    template: "%s | Stars Travel",
  },
  description:
    "Book your next intergalactic journey with Stars Travel. Explore planets, fly in style with our starships, and experience the galaxy like never before.",
  keywords: [
    "space travel",
    "intergalactic",
    "starships",
    "planets",
    "Star Wars",
    "galaxy",
    "travel",
    "adventure",
  ],
  authors: [{ name: "Stars Travel Team" }],
  creator: "Mariia Ganza",
  publisher: "Stars Travel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Stars Travel - Intergalactic Space Travel",
    description:
      "Book your next intergalactic journey with Stars Travel. Explore planets, fly in style with our starships, and experience the galaxy like never before.",
    siteName: "Stars Travel",
    images: [
      {
        url: "/img/logo.png",
        width: 1200,
        height: 630,
        alt: "Stars Travel - Intergalactic Space Travel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stars Travel - Intergalactic Space Travel",
    description:
      "Book your next intergalactic journey with Stars Travel. Explore planets, fly in style with our starships, and experience the galaxy like never before.",
    images: ["/img/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anonymousPro.variable} ${artifica.variable}`}>
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
