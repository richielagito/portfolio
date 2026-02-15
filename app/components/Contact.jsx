"use client";

import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { ArrowUpRight } from "lucide-react";

const Contact = () => {
    return (
        <section id="contact" className="py-32 flex flex-col items-center justify-center text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="flex flex-col items-center">
                <h2 className="text-6xl md:text-9xl font-semibold tracking-tighter text-foreground mb-8">Let's Talk</h2>
                <p className="text-xl md:text-2xl text-neutral-500 font-light max-w-2xl mb-12">Have a project in mind? Let's turn your ideas into reality.</p>

                <a href="mailto:richielagito1@gmail.com" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-foreground text-black rounded-full overflow-hidden transition-transform hover:scale-105">
                    <span className="relative z-10 text-lg font-medium">Get in touch</span>
                    <ArrowUpRight className="relative z-10 transition-transform group-hover:translate-x-1" />
                </a>

                <div className="flex gap-8 mt-16">
                    {[
                        { icon: faGithub, link: "https://www.github.com/richielagito" },
                        { icon: faLinkedin, link: "https://www.linkedin.com/in/richie-lagito-8769bb226" },
                        { icon: faInstagram, link: "https://www.instagram.com/richielagito_/" },
                    ].map((social, i) => (
                        <motion.a key={i} href={social.link} target="_blank" rel="noopener noreferrer" whileHover={{ y: -5 }} className="text-neutral-500 hover:text-foreground transition-colors text-2xl">
                            <FontAwesomeIcon icon={social.icon} />
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;
