"use client";

import { motion } from "motion/react";
import experiencesData from "../json/experiencesData.json";

const ExperienceItem = ({ exp, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 md:pl-0 border-l border-neutral-800 md:border-none pb-12 last:pb-0"
        >
            {/* Timeline Dot (Mobile & Desktop) */}
            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-neutral-600 md:hidden" />

            <div className="md:flex md:gap-12 md:items-start">
                {/* Date - Left Side on Desktop */}
                <div className="md:w-1/3 md:text-right mb-2 md:mb-0">
                    <span className="text-sm font-medium text-neutral-500 uppercase tracking-widest">{exp.date}</span>
                </div>

                {/* Content - Right Side on Desktop */}
                <div className="md:w-2/3 relative md:border-l md:border-neutral-800 md:pl-12 md:pb-12">
                    {/* Timeline Dot (Desktop) */}
                    <div className="hidden md:block absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-neutral-600 outline outline-4 outline-background" />

                    <h3 className="text-2xl font-medium text-foreground mb-1">{exp.role}</h3>
                    <p className="text-neutral-400 text-lg mb-4">{exp.company}</p>
                    <p className="text-neutral-500 font-normal leading-relaxed max-w-xl">{exp.description}</p>
                </div>
            </div>
        </motion.div>
    );
};

const Experiences = () => {
    return (
        <section id="experiences" className="py-24">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 md:pl-[33.33%] md:pl-12">
                <h2 className="text-sm font-medium tracking-widest uppercase text-neutral-500 mb-2">Experience</h2>
                <p className="text-3xl md:text-4xl font-light text-foreground">My professional journey.</p>
            </motion.div>

            <div className="flex flex-col">
                {experiencesData.map((exp, index) => (
                    <ExperienceItem key={exp.id} exp={exp} index={index} />
                ))}
            </div>
        </section>
    );
};

export default Experiences;
