"use client"; // Pastikan "use client" ada di atas

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import projectData from "../json/projectData.json";

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-12">
                {projectData.map((project) => (
                    <div key={project.id} className="project-card">
                        <div className="bg-white/15 rounded-lg shadow-lg overflow-hidden group">
                            <img src={project.imageUrl} alt={project.title} className="w-full h-full max-h-60 object-cover" />
                        </div>

                        <div className="mt-4 flex flex-col">
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                                <p className="text-white/70 mb-4">{project.description}</p>

                                <div className="flex flex-wrap gap-2 ">
                                    {project.stack &&
                                        project.stack.map((tech) => (
                                            <span key={tech} className="backdrop-blur-md border border-white/20 bg-white/15 text-white text-sm font-medium px-3 py-1 rounded-full">
                                                {tech}
                                            </span>
                                        ))}
                                </div>
                            </div>

                            <div className="mt-2">
                                <span className="text-white mr-2">View on:</span>

                                {project.githubUrl && (
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-300 underline decoration-white hover:text-white transition-colors duration-300 mr-3">
                                        Github <ArrowUpRight className="inline-block ml-1 mb-0.5" size={14} />
                                    </a>
                                )}

                                {project.webUrl && (
                                    <a href={project.webUrl} target="_blank" rel="noopener noreferrer" className="text-gray-300 underline decoration-white hover:text-white transition-colors duration-300">
                                        Live Preview <ArrowUpRight className="inline-block ml-1 mb-0.5" size={14} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
