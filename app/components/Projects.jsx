"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import projectData from "../json/projectData.json";

const ProjectCard = ({ project, index }) => {
    const cardRef = useRef(null);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="group relative flex flex-col gap-6"
        >
            {/* Image Container */}
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg bg-neutral-900 cursor-pointer">
                <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-105">
                    <Image src={project.imageUrl} alt={project.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-medium text-foreground group-hover:underline underline-offset-4 decoration-neutral-500 transition-all font-display">{project.title}</h3>
                    <span className="text-sm font-mono text-neutral-500">{project.year || "2024"}</span>
                </div>
                <p className="text-neutral-400 font-normal line-clamp-2 md:text-sm leading-relaxed">{project.description}</p>
                <div className="flex gap-2 flex-wrap mb-2">
                    {project.tech?.slice(0, 3).map((t, i) => (
                        <span key={i} className="text-xs border border-neutral-800 px-2 py-1 rounded-full text-neutral-500 font-sans">
                            {t}
                        </span>
                    ))}
                </div>
                <div className="flex gap-4 text-sm font-medium">
                    {project.webUrl && (
                        <a href={project.webUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition-colors flex items-center gap-1">
                            Live Site <ArrowUpRight className="w-3 h-3" />
                        </a>
                    )}
                    {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition-colors flex items-center gap-1">
                            GitHub <ArrowUpRight className="w-3 h-3" />
                        </a>
                    )}
                </div>
            </div>

            <div className="w-full h-[1px] bg-neutral-900 mt-12" />
        </motion.div>
    );
};

const Projects = () => {
    const [showAll, setShowAll] = useState(false);
    const visibleProjects = showAll ? projectData : projectData.slice(0, 4);

    return (
        <section id="projects" className="py-24 relative">
            <div className="flex flex-col items-start mb-20">
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-6xl md:text-8xl font-light tracking-tighter text-foreground mb-6">
                    Selected Work
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="text-xl text-neutral-500 max-w-2xl font-light">
                    A collection of projects exploring the boundaries of design and technology.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                {visibleProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>

            {projectData.length > 4 && (
                <div className="mt-20 flex justify-center">
                    <button onClick={() => setShowAll(!showAll)} className="group flex flex-col items-center gap-2 text-sm font-medium text-neutral-400 hover:text-foreground transition-colors">
                        <span className="uppercase tracking-widest">{showAll ? "Show Less" : "View All Projects"}</span>
                        <div className={`p-3 rounded-full transition-transform duration-500 ${showAll ? "rotate-180" : "group-hover:translate-y-2"}`}>
                            <ArrowDown size={20} />
                        </div>
                    </button>
                </div>
            )}
        </section>
    );
};

export default Projects;
