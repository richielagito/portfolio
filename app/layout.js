import { Schibsted_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Background from "@/components/Background";
import TopBar from "@/components/TopBar";
import profile from "@/lib/data/profile.json";

const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-schibsted",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

const title = `${profile.name} - ${profile.role}`;
const description = `${profile.headline} ${profile.bio}`;

export const metadata = {
  title: {
    template: "%s | Richie Lagito",
    default: title,
  },
  description,
  metadataBase: new URL("https://www.richielagito.com"),
  keywords: ["Fullstack Developer", "Web Developer", "Richie Lagito", "Portfolio", "Next.js", "React"],
  authors: [{ name: "Richie Lagito", url: "https://www.richielagito.com" }],
  openGraph: {
    title,
    description,
    url: "https://www.richielagito.com",
    siteName: "Richie Lagito",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Richie Lagito" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image.png"],
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
};

export const viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="relative min-h-dvh antialiased">
        <Background fontFamily={mono.style.fontFamily} />
        <div className="relative z-10 mx-auto min-h-dvh max-w-[40rem] px-5 sm:px-8 lg:border-x lg:border-line lg:bg-slab">
          <TopBar />
          {children}
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
