import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import GlobalBackground from "./components/GlobalBackground";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const outfit = Outfit({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-outfit",
});

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata = {
    title: {
        template: "%s | Richie Lagito",
        default: "Richie Lagito - Creative Developer",
    },
    description: "Portfolio of Richie Lagito, a creative developer crafting digital experiences with Next.js, React, and Tailwind CSS.",
    metadataBase: new URL("https://www.richielagito.com"),
    keywords: ["Creative Developer", "Frontend Engineer", "Richie Lagito", "Portfolio", "Next.js", "React", "Three.js"],
    authors: [{ name: "Richie Lagito", url: "https://www.richielagito.com" }],
    openGraph: {
        title: "Richie Lagito - Creative Developer",
        description: "Portfolio of Richie Lagito, a creative developer crafting digital experiences.",
        url: "https://www.richielagito.com",
        siteName: "Richie Lagito Portfolio",
        images: [
            {
                url: "/opengraph-image.png",
                width: 1200,
                height: 630,
                alt: "Richie Lagito Portfolio",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Richie Lagito - Creative Developer",
        description: "Portfolio of Richie Lagito, a creative developer crafting digital experiences.",
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

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${outfit.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}>
                <SmoothScroll>
                    <GlobalBackground />
                    {children}
                </SmoothScroll>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
