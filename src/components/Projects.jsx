import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectData from "../json/projectData.json";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    useEffect(() => {
        gsap.fromTo(
            ".project-card",
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".project-card",
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none",
                },
            }
        );
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section id="projects" className="mb-40 mt-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {projectData.map((project) => (
                    <div key={project.id} className="project-card bg-white/15 rounded-lg shadow-lg overflow-hidden group flex flex-col">
                        <a href={project.webUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full">
                            <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
                            <div className="p-6 flex flex-col justify-between flex-grow">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                                    <p className="text-white/70 mb-4">{project.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {project.stack &&
                                            project.stack.map((tech) => (
                                                <span key={tech} className="backdrop-blur-md border border-white/20 bg-white/15 text-white text-sm font-medium px-3 py-1 rounded-full">
                                                    {tech}
                                                </span>
                                            ))}
                                    </div>
                                </div>

                                <span className="text-white/70 transition-color group-hover:text-white duration-400 mt-auto">
                                    Check It Out <FontAwesomeIcon icon={faArrowRight} className="transform transition-transform duration-300 group-hover:translate-x-2" />
                                </span>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
