import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Header from "./components/Header.jsx";
import Projects from "./components/Projects.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

function App() {
    useEffect(() => {
        // --- Memuat dan Menginisialisasi AOS dari CDN ---

        // 1. Memuat file CSS AOS
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/aos@2.3.1/dist/aos.css";
        document.head.appendChild(link);

        // 2. Memuat file JavaScript AOS
        const script = document.createElement("script");
        script.src = "https://unpkg.com/aos@2.3.1/dist/aos.js";
        script.async = true;

        // 3. Menginisialisasi AOS setelah script berhasil dimuat
        script.onload = () => {
            if (window.AOS) {
                window.AOS.init({
                    duration: 800,
                    once: true,
                });
            }
        };

        document.body.appendChild(script);

        // 4. Fungsi cleanup untuk menghapus script dan link saat komponen tidak lagi digunakan
        return () => {
            if (document.head.contains(link)) {
                document.head.removeChild(link);
            }
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <>
            <div>
                <Navbar />
                <Header />

                {/* Wrapper untuk section dengan background gelap, ini akan full-width */}
                <div className="bg-black text-gray-800">
                    {/* Container ini memusatkan semua konten di dalamnya */}
                    <main className="container mx-auto px-6 py-20 max-w-5xl">
                        <About />
                        <Projects />
                        <Contact />
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default App;
