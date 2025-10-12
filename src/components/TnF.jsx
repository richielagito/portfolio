import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toolsData from "../json/toolsData.json";
import { faReact, faJs, faHtml5, faCss3Alt, faFigma, faGitAlt, faNodeJs, faVuejs, faAngular, faPython, faBootstrap, faFlutter } from "@fortawesome/free-brands-svg-icons";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
    faReact,
    faJs,
    faHtml5,
    faCss3Alt,
    faFigma,
    faGitAlt,
    faNodeJs,
    faVuejs,
    faAngular,
    faDatabase,
    faPython,
    faBootstrap,
    faFlutter,
};

const ToolsAndFrameworks = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animasi untuk setiap grup kategori
            gsap.utils.toArray(".tool-category").forEach((category) => {
                const icons = category.querySelectorAll(".tool-icon-item");

                gsap.fromTo(
                    icons,
                    {
                        opacity: 0,
                        y: 50,
                        scale: 0.9,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: category,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="tools-section" className="mb-40" ref={sectionRef}>
            <h2 className="text-3xl font-bold text-center mb-16 text-white">Tools & Frameworks</h2>

            <div className="flex flex-col gap-12">
                {toolsData.map((categoryData) => (
                    <div key={categoryData.category} className="tool-category">
                        <h3 className="text-xl font-semibold text-white/80 mb-6 text-center md:text-left">{categoryData.category}</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 place-items-center">
                            {categoryData.tools.map((tool) => (
                                <div key={tool.name} className="tool-icon-item flex flex-col items-center justify-center p-4 rounded-xl transform transition-all duration-300 hover:bg-white/20 hover:scale-110 cursor-pointer">
                                    <FontAwesomeIcon icon={iconMap[tool.icon]} size="3x" style={{ color: tool.color }} />
                                    <span className="mt-3 text-white text-sm font-semibold text-center">{tool.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ToolsAndFrameworks;
