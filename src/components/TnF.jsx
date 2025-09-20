import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toolsData from "../json/toolsData.json";
import { faReact, faJs, faHtml5, faCss3Alt, faFigma, faGitAlt, faNodeJs, faVuejs, faAngular, faPython, faBootstrap } from "@fortawesome/free-brands-svg-icons";
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
};

const ToolsAndFrameworks = () => {
    useEffect(() => {
        gsap.fromTo(
            ".tool-icon-item",
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#tools-section",
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none none",
                },
            }
        );
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section id="tools-section" className="mb-40">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Tools & Frameworks</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-6 place-items-center">
                {toolsData.map((tool) => (
                    <div key={tool.name} className="tool-icon-item flex flex-col items-center justify-center p-4 hover:bg-white/20 rounded-xl shadow-lg transition-color duration-300 transform cursor-pointer">
                        <FontAwesomeIcon icon={iconMap[tool.icon]} size="3x" style={{ color: tool.color }} />
                        <span className="mt-2 text-white text-md font-semibold">{tool.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ToolsAndFrameworks;
