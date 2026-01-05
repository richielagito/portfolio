"use client"; // Pastikan "use client" ada di atas

import Image from "next/image";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import projectData from "../json/projectData.json";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const [showAll, setShowAll] = useState(false);
    const visibleProjects = showAll ? projectData : projectData.slice(0, 4);

    useEffect(() => {
        // Animasi untuk 4 project pertama saat load awal
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".project-card:nth-child(-n+4)",
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.3,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: "#projects",
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none",
                    },
                }
            );
        });
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        // Animasi untuk project tambahan saat "Show More" diklik
        if (showAll) {
            const ctx = gsap.context(() => {
                gsap.fromTo(
                    ".project-card:nth-child(n+5)",
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.3,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: ".project-card:nth-child(5)",
                            start: "top 90%",
                            end: "bottom 20%",
                            toggleActions: "play none",
                        },
                    }
                );
            });
            return () => ctx.revert();
        }
    }, [showAll]);

    return (
        <section id="projects" className="mb-40 mt-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-white"> Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-12">
                {visibleProjects.map((project) => (
                    <div key={project.id} className="project-card">
                        <div className="bg-white/15 rounded-lg shadow-lg overflow-hidden group relative h-60 w-full">
                            <Image src={project.imageUrl} alt={project.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
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

            {projectData.length > 4 && (
                <div className="mt-12 flex justify-center">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="px-8 py-3 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm font-medium flex items-center gap-2"
                    >
                        {showAll ? (
                            <>
                                Show Less <ChevronUp className="w-5 h-5" />
                            </>
                        ) : (
                            <>
                                Show More <ChevronDown className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </div>
            )}
        </section>
    );
};

export default Projects;
