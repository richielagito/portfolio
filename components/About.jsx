"use client";

import { useRef } from "react";
import { m, useInView } from "motion/react";
import FloatingGallery from "./FloatingGallery";

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const images = [
        { id: 4, img: "/fotomakanan2.jpg" },
        { id: 3, img: "/fotomakanan1.jpg" },
        { id: 2, img: "/fotobadminton.jpg" },
        { id: 1, img: "/fotosplit.jpg" },
    ];

    return (
        <section id="about" className="py-24 md:py-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
                {/* Floating Gallery */}
                <m.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="order-2 md:order-1 flex justify-center">
                    <div className="relative w-full aspect-square">
                        <FloatingGallery images={images} imageSize={130} />
                    </div>
                </m.div>

                {/* Content */}
                <m.div
                    ref={ref}
                    className="order-1 md:order-2 flex flex-col items-start text-left"
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2 className="text-sm font-medium tracking-widest uppercase text-neutral-500 mb-6">About Me</h2>
                    <p className="text-3xl md:text-4xl leading-tight font-light text-foreground mb-8 text-left">
                        I'm Richie<span className="text-neutral-500">, a developer with a passion for</span> solving complex problems <span className="text-neutral-500">and creating</span> beautiful experiences.
                    </p>
                    <p className="text-neutral-400 leading-relaxed mb-8 text-lg font-light text-left">Currently an Undergraduate IT Student at Universitas Tarumanagara. Beyond code, I find joy in badminton and culinary adventures.</p>

                    <div className="flex flex-wrap gap-3">
                        {["Front-end", "React", "Next.js", "Motion", "UI/UX"].map((skill, i) => (
                            <m.span
                                key={skill}
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                className="px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-300 text-sm"
                            >
                                {skill}
                            </m.span>
                        ))}
                    </div>
                </m.div>
            </div>
        </section>
    );
};

export default About;
