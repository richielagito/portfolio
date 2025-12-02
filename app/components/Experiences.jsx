"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import experiencesData from "../json/experiencesData.json";

gsap.registerPlugin(ScrollTrigger);

const Experiences = () => {
    const timelineRef = useRef(null);
    const sectionRef = useRef(null);
    const progressBarRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate timeline progress bar
            gsap.fromTo(
                progressBarRef.current,
                { height: "0%" },
                {
                    height: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: "top 80%",
                        end: "bottom 80%",
                        scrub: 0.5,
                    },
                }
            );

            gsap.utils.toArray(".experience-item").forEach((item) => {
                gsap.fromTo(
                    item,
                    { opacity: 0, y: 50, filter: "blur(8px)" },
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 90%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="experiences" className="mb-40" ref={sectionRef}>
            <h2 className="text-3xl font-bold text-center mb-16 text-white">Experience</h2>
            <div ref={timelineRef} className="relative container mx-auto px-6 flex flex-col space-y-12">
                <div className="absolute z-0 w-1 left-4 md:left-1/2 -translate-x-1/2 top-2 bottom-2">
                    <div className="h-full w-full bg-white/10 rounded-full"></div>
                    <div
                        ref={progressBarRef}
                        className="absolute top-0 w-full bg-gradient-to-b from-gray-50 to-zinc-500 rounded-full"
                        style={{
                            boxShadow: "0 0 10px rgba(129, 140, 248, 0.7)",
                        }}
                    ></div>
                </div>

                {experiencesData.map((exp, index) => (
                    <div key={exp.id} className="relative z-10 experience-item">
                        <div className="timeline-dot absolute w-4 h-4 bg-gray-800 rounded-full mt-1.5 -left-2 md:left-1/2 -translate-x-1/2 border-2 border-gray-50"></div>

                        <div
                            className={`timeline-content w-full 
                                        pl-10 md:w-5/12 
                                        ${index % 2 === 0 ? "md:ml-auto md:pl-12" : "md:mr-auto md:pr-12 md:pl-0 md:text-right"}`}
                        >
                            <span className="text-sm font-semibold bg-gradient-to-r from-gray-50 to-zinc-400 bg-clip-text text-transparent">{exp.date}</span>
                            <h3 className="text-xl font-bold text-white mt-1">{exp.role}</h3>
                            <p className="text-white/80 text-md mb-3">{exp.company}</p>
                            <ul
                                className={`list-disc list-inside text-white/70 
                                            ${index % 2 === 0 ? "text-left" : "md:text-right md:list-none"}`}
                            >
                                <span className="mb-2">{exp.description}</span>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experiences;
