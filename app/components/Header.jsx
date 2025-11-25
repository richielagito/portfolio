"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Beams from "./Beams.jsx";
import RotatingText from "./RotatingText.jsx";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const overlayRef = useRef(null);
    const staticHeadingRef = useRef(null);
    const rotatingTextContainerRef = useRef(null); // Ref untuk motion.h1
    const paragraphRef = useRef(null);
    const buttonRef = useRef(null);
    const scrollDownRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // 1. Background Fade Out (Overlay Hitam Menghilang)
            tl.to(overlayRef.current, {
                opacity: 0,
                duration: 1.5, // Durasi fade
                delay: 0.2, // Sedikit jeda sebelum mulai
                onComplete: () => {
                    gsap.set(overlayRef.current, { display: "none" });
                },
            });

            // 2. Animasi Teks & Tombol (Blur-in dan Slide-up) - Dimulai setelah background mulai fade
            tl.fromTo(
                [staticHeadingRef.current, rotatingTextContainerRef.current], // Animasikan kedua H1 bersamaan
                { opacity: 0, y: 30, filter: "blur(8px)" },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 1,
                    stagger: 0.2, // Beri sedikit jeda antara H1 pertama dan kedua
                },
                "-=1.0" // Mulai 1 detik sebelum animasi overlay selesai
            )
                .fromTo(
                    paragraphRef.current,
                    { opacity: 0, y: 30, filter: "blur(8px)" },
                    { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 },
                    "-=0.7" // Mulai sedikit setelah H1
                )
                .fromTo(
                    buttonRef.current,
                    { opacity: 0, y: 30 }, // Tombol tidak perlu blur
                    { opacity: 1, y: 0, duration: 0.8 },
                    "-=0.7" // Mulai bersamaan dengan paragraf
                )
                .fromTo(
                    scrollDownRef.current, // Animasi panah scroll down
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5 },
                    "-=0.5" // Muncul terakhir
                );
        });

        return () => ctx.revert();
    }, []);

    return (
        <header className="relative w-full h-screen flex items-center justify-center text-start overflow-hidden bg-gray-100">
            {/* Overlay Hitam untuk Efek Fade */}
            <div ref={overlayRef} className="absolute inset-0 bg-black z-50"></div>

            <div style={{ width: "100%", height: "100vh", position: "absolute", zIndex: 1 }}>
                <Beams beamWidth={3} beamHeight={30} beamNumber={20} lightColor="#ffffff" speed={2} noiseIntensity={1.75} scale={0.2} rotation={30} />
            </div>

            {/* Konten Header */}
            <div id="header-content" className="relative z-10 p-5 w-[90%] max-w-5xl flex flex-col items-center md:items-start justify-center">
                <div className="mb-3 flex flex-col justify-start md:flex-row items-center gap-4 mb-6">
                    <h1 ref={staticHeadingRef} className="text-center text-4xl md:text-4xl lg:text-5xl font-bold text-white opacity-0" style={{ textShadow: "0px 0px 10px rgba(0,0,0,0.5)", willChange: "filter, opacity, transform" }}>
                        Websites Should Be {""}
                    </h1>
                    <motion.h1
                        ref={rotatingTextContainerRef}
                        layout
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="text-4xl md:text-4xl lg:text-5xl font-bold text-white opacity-0"
                        style={{ textShadow: "0px 0px 10px rgba(0,0,0,0.5)", willChange: "filter, opacity, transform" }}
                    >
                        <RotatingText
                            texts={["Simple.", "Responsive.", "Cool!"]}
                            mainClassName="px-3 sm:px-3 md:px-4 backdrop-blur-md border border-white/20 bg-white/15 shadow-lg text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-full"
                            staggerFrom={"last"}
                            initial={{ y: "1.2em" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-1.2em" }}
                            staggerDuration={0.025}
                            splitLevelClassName="inline-block overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={2000}
                        />
                    </motion.h1>
                </div>
                <p
                    ref={paragraphRef}
                    className="text-md md:text-md lg:text-lg text-white text-center md:text-start max-w-lg lg:max-w-xl opacity-0"
                    style={{ textShadow: "0px 0px 10px rgba(0,0,0,0.5)", willChange: "filter, opacity, transform" }}
                >
                    I'm a Front-end Web Developer passionate about creating functional and visually beautiful experiences.
                </p>
                <div ref={buttonRef} className="mt-8 opacity-0">
                    <a href="#about" className="inline-flex items-center bg-white text-black font-semibold py-3 px-6 rounded-full shadow-lg group transition-transform duration-300 ease-in-out hover:scale-105">
                        Know Me More
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-2 transition-transform duration-300 ease-in-out group-hover:rotate-45" />
                    </a>
                </div>
            </div>
            <a ref={scrollDownRef} href="#about" aria-label="Scroll down" className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 cursor-pointer opacity-0">
                <div className="w-10 h-10 text-gray-700 animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-full h-full">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </a>

            {/* Fade Overlay Bottom */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
        </header>
    );
};

export default Header;
