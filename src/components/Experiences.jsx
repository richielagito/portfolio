import { useState, useEffect, useRef } from "react";
import experiencesData from "../json/experiencesData.json";

const Experiences = () => {
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const timelineRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!timelineRef.current) return;

            const element = timelineRef.current;
            const { top, height } = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const startPoint = top - windowHeight * 0.9;
            const scrollableDistance = height + windowHeight * 0.1;

            const progress = (-startPoint / scrollableDistance) * 100;
            const clampedProgress = Math.min(Math.max(progress, 0), 100);

            setScrollPercentage(clampedProgress);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section id="experiences" className="mb-40">
            <h2 className="text-3xl font-bold text-center mb-16 text-white">Experience</h2>

            <div ref={timelineRef} className="relative container mx-auto px-6 flex flex-col space-y-12">
                <div className="absolute z-0 w-1 left-4 md:left-1/2 -translate-x-1/2 top-2 bottom-2">
                    <div className="h-full w-full bg-white/10 rounded-full"></div>
                    <div
                        className="absolute top-0 w-full bg-gradient-to-b from-indigo-400 to-purple-500 rounded-full"
                        style={{
                            height: `${scrollPercentage}%`,
                            boxShadow: "0 0 10px rgba(129, 140, 248, 0.7)",
                        }}
                    ></div>
                </div>

                {experiencesData.map((exp, index) => (
                    <div key={exp.id} className="relative z-10" data-aos="fade-up">
                        <div className="timeline-dot absolute w-4 h-4 bg-gray-800 rounded-full mt-1.5 left-4 md:left-1/2 -translate-x-1/2 border-2 border-indigo-400"></div>

                        <div
                            className={`timeline-content w-full 
                                        pl-10 md:w-5/12 
                                        ${index % 2 === 0 ? "md:ml-auto md:pl-12" : "md:mr-auto md:pr-12 md:pl-0 md:text-right"}`}
                        >
                            <p className="text-indigo-300 text-sm font-semibold">{exp.date}</p>
                            <h3 className="text-xl font-bold text-white mt-1">{exp.role}</h3>
                            <p className="text-white/80 text-md mb-3">{exp.company}</p>
                            <ul
                                className={`list-disc list-inside text-white/70 
                                            ${index % 2 === 0 ? "text-left" : "md:text-right md:list-none"}`}
                            >
                                {exp.description.map((desc, i) => (
                                    <li key={i} className="mb-2">
                                        {desc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experiences;
