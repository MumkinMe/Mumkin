import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import { googleFontsHref } from "./languages";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500"],
  variable: "--font-plex-arabic",
  display: "swap",
});

const DESCRIPTION = "Taking you from mish mumkin to mumkin.";

export const metadata: Metadata = {
  metadataBase: new URL("https://mumkin.me"),
  title: "Mumkin",
  description: DESCRIPTION,
  openGraph: {
    title: "Mumkin",
    description: DESCRIPTION,
    url: "https://mumkin.me",
    siteName: "Mumkin",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mumkin",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0d9444",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} ${plexArabic.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Subsetted faces for the marquee scripts; see googleFontsHref(). */}
        <link rel="stylesheet" href={googleFontsHref()} />
      </head>
      <body>{children}</body>
    </html>
  );
}
