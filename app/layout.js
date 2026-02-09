import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import GlobalBackground from "./components/GlobalBackground";

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
    title: "Richie Lagito",
    description: "Creative Developer Portfolio",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${outfit.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}>
                <SmoothScroll>
                    <GlobalBackground />
                    {children}
                </SmoothScroll>
            </body>
        </html>
    );
}
