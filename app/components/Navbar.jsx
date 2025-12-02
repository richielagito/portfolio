"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Kita masih mendaftarkan plugin GSAP, tapi HANYA untuk fungsi scrollToSection
gsap.registerPlugin(ScrollToPlugin);

// Data navigasi tetap sama
const navItems = [
    { label: "About Me", href: "#about" },
    { label: "Experience", href: "#experiences" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Efek deteksi scroll (Ini sudah benar, biarkan saja)
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // HAPUS: useEffect() yang lama untuk animasi menu GSAP

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const scrollToSection = (event, targetId) => {
        event.preventDefault();
        const offsetValue = 100;
        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: targetId,
                offsetY: offsetValue,
            },
            ease: "power2.inOut",
        });
        if (isMenuOpen) {
            toggleMenu();
        }
    };

    return (
        <>
            <nav
                className={`fixed top-4 left-1/2 -translate-x-1/2 
                            flex items-center justify-between 
                            w-[90%] max-w-5xl px-5 py-3 border border-white/0
                            z-50 transition-colors duration-300 ease-in-out rounded-2xl md:rounded-full
                            ${scrolled || isMenuOpen ? "backdrop-blur-md border border-white/20 bg-white/10 shadow-lg" : "border-transparent"}`}
            >
                {/* ... (Isi <nav> lainnya tetap sama) ... */}
                <div className="container mx-auto flex justify-between items-center">
                    <a href="#" className="text-xl font-bold" onClick={(e) => scrollToSection(e, "#header-content")}>
                        <Image src="/logoRL.svg" width={30} height={30} alt="logo" />
                    </a>
                    <div className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <a key={item.label} href={item.href} className="hover:opacity-100 text-white opacity-70 transition-opacity" onClick={(e) => scrollToSection(e, item.href)}>
                                {item.label}
                            </a>
                        ))}
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-white focus:outline-none p-2 -mr-2" aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
                            <div className="w-6 h-6 flex flex-col justify-around items-center relative">
                                <span className={`block w-full h-0.5 bg-white transform transition duration-300 ease-in-out origin-center ${isMenuOpen ? "rotate-45 translate-y-[6px]" : ""}`}></span>
                                <span className={`block w-full h-0.5 bg-white transform transition duration-300 ease-in-out origin-center ${isMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`}></span>
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Menu Dropdown untuk Mobile */}
            <div
                // HAPUS: style={{ display: "none" }}
                // GANTI: className
                className={`
                    mobile-menu fixed top-[90px] left-0 right-0 w-[90%] max-w-5xl mx-auto 
                    bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 z-40 
                    border border-white/20
                    transition-all duration-300 ease-in-out
                    ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none"}
                `}
            >
                <div className="flex flex-col items-center space-y-6 text-center">
                    {navItems.map((item) => (
                        <a key={item.label} href={item.href} onClick={(e) => scrollToSection(e, item.href)} className="text-white text-lg w-full py-2 hover:opacity-75 transition-opacity">
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Navbar;
