"use client";

import { useEffect, useState } from "react";
import Particles from "./Particles";

const GlobalBackground = () => {
    // Lock height to initial viewport height to prevent resize stutters on mobile
    const [style, setStyle] = useState({ position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: 0, backgroundColor: "black" });

    useEffect(() => {
        // Use a small delay to ensure viewport is stable, or just grab immediately
        const height = window.innerHeight;
        setStyle((prev) => ({ ...prev, height: `${height}px` }));

        // Optional: handle orientation changes if needed, but for "stutter" fix, 
        // we mostly care about the address bar which doesn't trigger orientationchange.
        const handleResize = () => {
            // We only update if the width changes significantly (orientation change)
            // but ignore small height changes (address bar)
            if (window.innerWidth !== parseInt(style.width)) {
                setStyle((prev) => ({ ...prev, width: "100vw", height: `${window.innerHeight}px` }));
            }
        };

        window.addEventListener("orientationchange", handleResize);
        return () => window.removeEventListener("orientationchange", handleResize);
    }, [style.width]);

    return (
        <div style={style}>
            {/* Particles Background */}
            <div className="absolute inset-0 w-full h-full">
                <Particles
                    particleColors={["#ffffff", "#ffffff", "#ffffff"]}
                    particleCount={100}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={false}
                    alphaParticles={true}
                    disableRotation={false}
                    pixelRatio={1}
                />
            </div>
        </div>
    );
};

export default GlobalBackground;
