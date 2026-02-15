"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "motion/react";
import toolsData from "../json/toolsData.json";
import { faReact, faJs, faHtml5, faCss3Alt, faFigma, faGitAlt, faNodeJs, faVuejs, faAngular, faPython, faBootstrap, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";

// Map icons (handling potential missing icons gracefully)
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
    faYoutube,
};

const ToolItem = ({ tool }) => (
    <div className="flex flex-col items-center justify-center mx-8 group cursor-default">
        <div className="text-neutral-600 transition-colors duration-300 group-hover:text-foreground text-4xl md:text-5xl mb-4">
            <FontAwesomeIcon icon={iconMap[tool.icon] || faDatabase} />
        </div>
        <span className="text-xs font-medium text-neutral-600 group-hover:text-foreground transition-colors uppercase tracking-wider opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            {tool.name}
        </span>
    </div>
);

const MarqueeRow = ({ tools, reverse = false }) => (
    <div className="flex overflow-hidden py-6 select-none relative mask-linear-fade">
        <motion.div className="flex flex-shrink-0" initial={{ x: reverse ? "-100%" : "0%" }} animate={{ x: reverse ? "0%" : "-100%" }} transition={{ duration: 40, ease: "linear", repeat: Infinity }}>
            {tools.map((tool, i) => (
                <ToolItem key={i} tool={tool} />
            ))}
            {tools.map((tool, i) => (
                <ToolItem key={`dup-${i}`} tool={tool} />
            ))}
            {tools.map((tool, i) => (
                <ToolItem key={`dup2-${i}`} tool={tool} />
            ))}
        </motion.div>

        <motion.div className="flex flex-shrink-0" initial={{ x: reverse ? "-100%" : "0%" }} animate={{ x: reverse ? "0%" : "-100%" }} transition={{ duration: 40, ease: "linear", repeat: Infinity }}>
            {tools.map((tool, i) => (
                <ToolItem key={`2-${i}`} tool={tool} />
            ))}
            {tools.map((tool, i) => (
                <ToolItem key={`2-dup-${i}`} tool={tool} />
            ))}
            {tools.map((tool, i) => (
                <ToolItem key={`2-dup2-${i}`} tool={tool} />
            ))}
        </motion.div>
    </div>
);

const ToolsAndFrameworks = () => {
    const allTools = toolsData.flatMap((cat) => cat.tools);
    const half = Math.ceil(allTools.length / 2);
    const row1 = allTools.slice(0, half);
    const row2 = allTools.slice(half);

    return (
        <div className="h-full flex flex-col justify-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
                <h2 className="text-sm font-medium tracking-widest uppercase text-neutral-500 mb-2">My Toolbox</h2>
            </motion.div>

            <div className="flex flex-col gap-8">
                <MarqueeRow tools={row1} />
                <MarqueeRow tools={row2} reverse={true} />
            </div>
        </div>
    );
};

export default ToolsAndFrameworks;
