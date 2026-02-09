"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar.jsx";
import Header from "./components/Header.jsx";
import Projects from "./components/Projects.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ToolsAndFrameworks from "./components/TnF.jsx";
import Experiences from "./components/Experiences.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoadComplete = () => {
        setIsLoading(false);
    };

    return (
        <>
            <AnimatePresence mode="wait">{isLoading && <LoadingScreen key="loading-screen" onComplete={handleLoadComplete} />}</AnimatePresence>

            <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-neutral-800 selection:text-white">
                <Navbar />
                <Header onLoaded={handleLoadComplete} startAnimation={!isLoading} />

                <main className="container mx-auto w-[90%] max-w-5xl relative z-10">
                    <About />
                    <Experiences />
                    <ToolsAndFrameworks />
                    <Projects />
                    <Contact />
                </main>
                <Footer />
            </div>
        </>
    );
}
