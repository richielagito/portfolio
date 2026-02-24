"use client";

import React, { useEffect, useState } from "react"; // Explicitly import React
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Simulate progress slowly initially
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) {
                    clearInterval(timer); // Pause at 90% until fully loaded
                    return 90;
                }
                const increment = Math.random() * 5 + 1; // Random increment between 1 and 6
                return Math.min(prev + increment, 90);
            });
        }, 150);

        return () => clearInterval(timer);
    }, []);

    // Function to be called when the app reports it's ready
    useEffect(() => {
        if (onComplete) {
            // When parent says "complete" (assets loaded), we quickly finish the bar
            // We can't really "listen" to a prop change to trigger function from parent easily without a prop change
            // The usage in parent will be: <LoadingScreen onComplete={handleFinish} /> ? No.
            // The usage is: Parent tracks real load. Parent unmounts LoadingScreen.
            // But we want an exit animation.
        }
    }, [onComplete]);

    return (
        <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
            <div className="relative w-8 h-8 md:w-12 md:h-12 mb-8">
                {/* Logo */}
                <Image src="/logoRL.svg" alt="Logo" width={100} height={100} className="object-contain" priority />
            </div>

            {/* Progress Bar Container */}
            <div className="w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden relative">
                {/* Progress Bar */}
                <motion.div className="absolute top-0 left-0 h-full bg-white rounded-full" initial={{ width: "0%" }} animate={{ width: `${progress}%` }} transition={{ ease: "linear", duration: 0.2 }} />
            </div>

            <motion.p className="mt-4 text-white text-sm font-mono opacity-70" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                {Math.round(progress)}%
            </motion.p>
        </motion.div>
    );
};

export default LoadingScreen;
