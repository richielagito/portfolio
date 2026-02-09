"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    };

    const navLinks = [
        { title: "Home", href: "#" },
        { title: "About", href: "#about" },
        { title: "Projects", href: "#projects" },
        { title: "Contact", href: "#contact" },
    ];

    const socialLinks = [
        { icon: faGithub, link: "https://www.github.com/richielagito" },
        { icon: faLinkedin, link: "https://www.linkedin.com/in/richielagito" },
        { icon: faInstagram, link: "https://www.instagram.com/richielagito_/" },
    ];

    const menuVariants = {
        closed: {
            y: "-100%",
            transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
            },
        },
        open: {
            y: "0%",
            transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
            },
        },
    };

    const linkContainerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const linkVariants = {
        hidden: { y: 100, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    };

    return (
        <>
            {/* Top Bar */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center transition-colors duration-300 ${scrolled ? "mix-blend-difference text-white" : ""}`}
            >
                <div className="relative w-12 h-12">
                    <Image src="/logoRL.svg" alt="Richie Lagito" fill className="object-contain" priority />
                </div>

                <button onClick={toggleMenu} className="group flex flex-col gap-1.5 w-8 items-end cursor-pointer mix-blend-difference z-50 focus:outline-none" aria-label="Toggle Menu">
                    <span className={`block h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "w-8 rotate-45 translate-y-2" : "w-8"}`}></span>
                    <span className={`block h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : "w-6 group-hover:w-8"}`}></span>
                    <span className={`block h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "w-8 -rotate-45 -translate-y-2" : "w-4 group-hover:w-8"}`}></span>
                </button>
            </motion.nav>

            {/* Fullscreen Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div variants={menuVariants} initial="closed" animate="open" exit="closed" className="fixed inset-0 bg-neutral-950 z-40 flex flex-col justify-center items-center">
                        <div className="container mx-auto px-6 h-full flex flex-col md:flex-row">
                            {/* Left: Contact Info (Desktop) */}
                            <div className="hidden md:flex flex-col justify-end pb-20 w-1/3">
                                <h3 className="text-neutral-500 uppercase text-sm tracking-widest mb-6">Contact</h3>
                                <a href="mailto:richielagito1@gmail.com" className="text-xl text-neutral-300 hover:text-white transition-colors mb-2">
                                    richielagito1@gmail.com
                                </a>
                                <p className="text-neutral-400">Jakarta, Indonesia</p>

                                <div className="flex gap-6 mt-8">
                                    {socialLinks.map((social, i) => (
                                        <a key={i} href={social.link} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-white transition-colors text-xl">
                                            <FontAwesomeIcon icon={social.icon} />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Navigation Links */}
                            <div className="flex-1 flex flex-col justify-center items-start md:items-end w-full">
                                <motion.div variants={linkContainerVariants} initial="hidden" animate="show" className="flex flex-col gap-2 md:gap-4">
                                    {navLinks.map((link, index) => (
                                        <motion.div key={index} variants={linkVariants} className="overflow-visible">
                                            <Link href={link.href} onClick={toggleMenu} className="block text-5xl md:text-8xl font-black text-neutral-400 hover:text-white transition-colors tracking-tighter group relative">
                                                {link.title}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Mobile Contact Info (Bottom) */}
                            <div className="md:hidden mt-auto mb-10 w-full border-t border-neutral-800 pt-8">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-6">
                                        {socialLinks.map((social, i) => (
                                            <a key={i} href={social.link} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-white transition-colors text-xl">
                                                <FontAwesomeIcon icon={social.icon} />
                                            </a>
                                        ))}
                                    </div>
                                    <span className="text-neutral-600 text-sm">© {new Date().getFullYear()}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
