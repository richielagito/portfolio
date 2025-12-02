// app/layout.jsx
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
    subsets: ["latin"],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata = {
    title: "Richie Lagito",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.variable} font-sans`}>{children}</body>
        </html>
    );
}
