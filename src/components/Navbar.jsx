import React, { useState, useEffect } from "react";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-4 left-1/2 -translate-x-1/2 
                    flex items-center justify-between 
                    w-[90%] max-w-5xl px-6 py-3 border border-white/0
                    z-50 transition-all duration-300 p-4 ${scrolled ? "backdrop-blur-md border border-white/20 bg-white/10 rounded-full shadow-lg" : ""}`}
        >
            <div className="container mx-auto flex justify-between items-center">
                <a href="#" className="text-xl font-bold">
                    <img src="logoRL.svg" width="30" height="30" alt="logo" />
                </a>
                <div className="hidden md:flex space-x-8">
                    <a href="#proyek" className="hover:opacity-100 text-white opacity-70 transition-opacity">
                        Proyek
                    </a>
                    <a href="#tentang" className="hover:opacity-100 text-white opacity-70 transition-opacity">
                        Tentang Saya
                    </a>
                    <a href="#kontak" className="hover:opacity-100 text-white opacity-70 transition-opacity">
                        Kontak
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
