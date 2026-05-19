"use client";

import { useEffect } from "react";
import { m } from "motion/react";
import { FlipWords } from "./ui/FlipWords";

const Header = ({ onLoaded, startAnimation }) => {
    const words = ["Design", "Challenge", "Concept", "Ideas"];

    useEffect(() => {
        // Trigger load completion after a short delay
        const timer = setTimeout(() => {
            if (onLoaded) onLoaded();
        }, 500);
        return () => clearTimeout(timer);
    }, [onLoaded]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9],
            },
        },
    };

    return (
        <header className="relative w-full h-screen flex flex-col items-center md:items-start justify-center overflow-hidden container mx-auto px-6">
            <m.div className="relative z-10 text-center md:text-left" variants={containerVariants} initial="hidden" animate={startAnimation ? "visible" : "hidden"}>
                {/* Greeting */}
                <m.div variants={itemVariants} className="mb-8 flex items-center justify-center md:justify-start gap-3">
                    <span className="relative flex size-3">
                        <span className="animate-ping absolute inline-flex size-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full size-3 bg-green-500"></span>
                    </span>
                    <span className="text-sm font-medium tracking-widest uppercase text-neutral-400">Available for work</span>
                </m.div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-foreground mb-8 leading-[1]">
                    You bring the <br className="block md:hidden" />
                    <FlipWords words={words} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] px-0" /> <br />I handle the rest.
                </h1>

                {/* Subheading */}
                <m.p variants={itemVariants} className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto md:mx-0 mb-12 font-light leading-relaxed">
                    I'm Richie, a developer who can bring your wildest ideas into reality. <br />
                    Scroll down to see what i can do.
                </m.p>
            </m.div>

            {/* Scroll Indicator - Emphasized */}
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="absolute bottom-12 left-8 text-neutral-300 flex items-center gap-6">
                <div className="w-[2px] h-32 bg-neutral-800 overflow-hidden rounded-full">
                    <m.div className="w-full h-1/3 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" animate={{ y: ["-100%", "300%"] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} />
                </div>
                <span className="text-xs font-medium uppercase tracking-[0.2em] -rotate-90 origin-left translate-x-4">Scroll</span>
            </m.div>
        </header>
    );
};

export default Header;
