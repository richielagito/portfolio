"use client";

import { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { m } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const GithubGallery = () => {
    // Custom theme to match the website's dark aesthetic
    // Using neutral gray scale from the design system
    const theme = {
        dark: ["#262626", "#404040", "#737373", "#a3a3a3", "#ededed"],
        // Corresponds roughly to: neutral-800, neutral-700, neutral-500, neutral-400, foreground
    };

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // Or a loading skeleton if preferred, but null prevents flash of unstyled content during hydration
    }

    return (
        <div className="h-full flex flex-col justify-between">
            <m.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
                <h2 className="text-sm font-medium tracking-widest uppercase text-neutral-500 mb-2">Code Activity</h2>
                <div className="flex items-center justify-center gap-2">
                    <a href="https://github.com/richielagito" target="_blank" rel="noopener noreferrer" className="text-2xl md:text-3xl font-light text-foreground hover:text-neutral-300 transition-colors flex items-center gap-2 group">
                        GitHub Contributions
                        <ArrowUpRight className="size-5 opacity-0 hidden md:block group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                </div>
            </m.div>

            <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex justify-center w-full">
                <div className="p-4 border border-neutral-800 rounded-2xl bg-black/20 hover:border-neutral-700 transition-colors duration-500 backdrop-blur-sm w-full max-w-full overflow-hidden">
                    <div className="overflow-x-auto pb-2 -mb-2 styled-scrollbar">
                        <div className="min-w-full w-full">
                            <GitHubCalendar username="richielagito" colorScheme="dark" theme={theme} fontSize={10} blockSize={10} blockMargin={4} />
                        </div>
                    </div>
                </div>
            </m.div>

            <div className="flex justify-center mt-6">
                <a
                    href="https://github.com/richielagito?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-500 hover:text-foreground text-xs font-medium transition-colors border-b border-transparent hover:border-neutral-500 pb-0.5"
                >
                    View all repositories
                </a>
            </div>
        </div>
    );
};

export default GithubGallery;
