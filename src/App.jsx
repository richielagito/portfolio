import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Header from "./components/Header.jsx";
import Projects from "./components/Projects.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ToolsAndFrameworks from "./components/TnF.jsx";
import Experiences from "./components/Experiences.jsx";
import "./fontawesome.js";

function App() {
    const items = [
        {
            label: "About",
            bgColor: "#0D0716",
            textColor: "#fff",
            links: [
                { label: "Company", ariaLabel: "About Company" },
                { label: "Careers", ariaLabel: "About Careers" },
            ],
        },
        {
            label: "Projects",
            bgColor: "#170D27",
            textColor: "#fff",
            links: [
                { label: "Featured", ariaLabel: "Featured Projects" },
                { label: "Case Studies", ariaLabel: "Project Case Studies" },
            ],
        },
        {
            label: "Contact",
            bgColor: "#271E37",
            textColor: "#fff",
            links: [
                { label: "Email", ariaLabel: "Email us" },
                { label: "Twitter", ariaLabel: "Twitter" },
                { label: "LinkedIn", ariaLabel: "LinkedIn" },
            ],
        },
    ];

    useEffect(() => {
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

                <div className="bg-black text-gray-800">
                    <main className="container mx-auto px-6 py-20 w-[90%] max-w-5xl">
                        <About />
                        <Experiences />
                        <ToolsAndFrameworks />
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
