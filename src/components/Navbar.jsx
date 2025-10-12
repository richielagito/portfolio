import { useState, useEffect } from "react";
import { gsap } from "gsap";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            gsap.to(".mobile-menu", {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
                display: "block",
            });
        } else {
            gsap.to(".mobile-menu", {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    gsap.set(".mobile-menu", { display: "none" });
                },
            });
        }
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav
                className={`fixed top-4 left-1/2 -translate-x-1/2 
                        flex items-center justify-between 
                        w-[90%] max-w-5xl px-6 py-3 border border-white/0
                        z-50 transition-all duration-300 p-4 
                        ${scrolled || isMenuOpen ? "backdrop-blur-md border border-white/20 bg-white/10 rounded-full shadow-lg" : "border-transparent"}`}
            >
                <div className="container mx-auto flex justify-between items-center">
                    <a href="#" className="text-xl font-bold">
                        <img src="logoRL.svg" width="30" height="30" alt="logo" />
                    </a>

                    {/* Navigasi untuk Desktop */}
                    <div className="hidden md:flex space-x-8">
                        <a href="#projects" className="hover:opacity-100 text-white opacity-70 transition-opacity">
                            Projects
                        </a>
                        <a href="#experiences" className="hover:opacity-100 text-white opacity-70 transition-opacity">
                            Experience
                        </a>
                        <a href="#about" className="hover:opacity-100 text-white opacity-70 transition-opacity">
                            About Me
                        </a>
                        <a href="#contact" className="hover:opacity-100 text-white opacity-70 transition-opacity">
                            Contact
                        </a>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-white focus:outline-none" aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
                            <div className="w-6 h-6 flex flex-col justify-around items-center">
                                <span className={`block w-full h-0.5 bg-white transform transition duration-300 ease-in-out ${isMenuOpen ? "rotate-45 translate-y-[6px]" : ""}`}></span>
                                <span className={`block w-full h-0.5 bg-white transform transition duration-300 ease-in-out ${isMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`}></span>
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            <div
                className="mobile-menu hidden fixed top-[80px] left-0 right-0 w-[90%] max-w-5xl mx-auto 
                        bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 z-40 
                        opacity-0 -translate-y-5 border border-white/20"
            >
                <div className="flex flex-col items-center space-y-6 text-center">
                    <a href="#projects" onClick={toggleMenu} className="text-white text-lg w-full py-2 hover:opacity-75 transition-opacity">
                        Projects
                    </a>
                    <a href="#experiences" onClick={toggleMenu} className="text-white text-lg w-full py-2 hover:opacity-75 transition-opacity">
                        Experience
                    </a>
                    <a href="#about" onClick={toggleMenu} className="text-white text-lg w-full py-2 hover:opacity-75 transition-opacity">
                        About Me
                    </a>
                    <a href="#contact" onClick={toggleMenu} className="text-white text-lg w-full py-2 hover:opacity-75 transition-opacity">
                        Contact
                    </a>
                </div>
            </div>
        </>
    );
};

export default Navbar;
