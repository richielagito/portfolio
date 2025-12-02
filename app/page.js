"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Header from "./components/Header.jsx";
import Projects from "./components/Projects.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ToolsAndFrameworks from "./components/TnF.jsx";
import Experiences from "./components/Experiences.jsx";


export default function Home() {
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

    return (
        <>
            <div className="overflow-x-hidden">
                <Navbar />
                <Header />

                <div className="bg-black text-gray-800">
                    <main className="container mx-auto py-20 w-[90%] max-w-5xl">
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
