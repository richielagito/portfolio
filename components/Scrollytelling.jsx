"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

const TOTAL_HEIGHT_VH = 400;

const CHAPTER_RANGES = [
    { start: 0.22, end: 0.46 },
    { start: 0.43, end: 0.69 },
    { start: 0.66, end: 0.95 },
];

const projects = [
    {
        category: "Scrolly-telling Landing Page",
        title: "Kopi Kenangan",
        image: "/kopi-kenangan.png",
        tagline: "A modern, interactive landing page for Kopi Kenangan, showcasing their brand and products through engaging storytelling.",
    },
    {
        category: "SaaS Dashboard",
        title: "Planty",
        image: "/planty.png",
        tagline: "Data-rich dashboards designed with clarity and delight.",
    },
    {
        category: "NLP · Web App",
        title: "UploadItIn",
        image: "/uploaditin.png",
        tagline: "Intelligent web apps powered by natural language processing.",
    },
];

/* ─── Single Chapter (snappy transitions) ─── */
const Chapter = ({ project, index, scrollYProgress }) => {
    const { start, end } = CHAPTER_RANGES[index];
    const duration = end - start;

    // Balanced snap: moderate fade-in/out (12-18%), generous hold
    const snapIn = start + duration * 0.12;
    const holdStart = start + duration * 0.18;
    const holdEnd = end - duration * 0.18;
    const snapOut = end - duration * 0.12;

    const opacity = useTransform(scrollYProgress, [start, snapIn, holdStart, holdEnd, snapOut, end], [0, 0.6, 1, 1, 0.6, 0]);

    const blurValue = useTransform(scrollYProgress, [start, holdStart, holdEnd, end], [5, 0, 0, 5]);
    const blurFilter = useTransform(blurValue, (v) => `blur(${v}px)`);

    const imgScale = useTransform(scrollYProgress, [start, holdStart, holdEnd, end], [0.94, 1, 1, 1.02]);
    const imgOpacity = useTransform(scrollYProgress, [start, snapIn, holdStart, holdEnd, snapOut, end], [0, 0.4, 1, 1, 0.4, 0]);

    // Smooth snap into position
    const textY = useTransform(scrollYProgress, [start, holdStart, holdEnd, end], [40, 0, 0, -40]);

    // Tagline follows shortly after
    const tagStart = start + duration * 0.14;
    const tagVisible = start + duration * 0.24;
    const taglineOpacity = useTransform(scrollYProgress, [tagStart, tagVisible, holdEnd, snapOut, end], [0, 1, 1, 0.5, 0]);
    const taglineY = useTransform(scrollYProgress, [tagStart, tagVisible, holdEnd, end], [20, 0, 0, -20]);

    return (
        <motion.div className="absolute inset-0 flex items-center justify-center px-6 md:px-16 pointer-events-none" style={{ opacity }}>
            <motion.div className="flex flex-col md:flex-row md:items-center md:gap-12 lg:gap-20 items-center justify-center w-full max-w-6xl" style={{ filter: blurFilter }}>
                {/* Text side — left on desktop */}
                <div className="flex flex-col items-center md:items-start md:w-[40%] shrink-0">
                    <motion.span className="text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-neutral-500 mb-4" style={{ y: textY }}>
                        {project.category}
                    </motion.span>

                    <motion.h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-semibold tracking-tighter text-foreground mb-6 md:mb-8 text-center md:text-left leading-[1]" style={{ y: textY }}>
                        {project.title}
                    </motion.h2>

                    <motion.p className="text-base md:text-lg text-neutral-400 font-light text-center md:text-left max-w-md" style={{ opacity: taglineOpacity, y: taglineY }}>
                        {project.tagline}
                    </motion.p>
                </div>

                {/* Image side — right on desktop */}
                <motion.div className="relative w-[85vw] md:w-[55%] max-w-2xl aspect-video rounded-xl overflow-hidden scrollytelling-glow mt-8 md:mt-0" style={{ scale: imgScale, opacity: imgOpacity }}>
                    <Image src={project.image} alt={project.title} fill className="object-cover" sizes="(max-width: 768px) 85vw, 55vw" priority={index === 0} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

/* ─── Main Scrollytelling Section ─── */
const Scrollytelling = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // 0 -> 0.12: Intro visible but static
    // 0.12 -> 1: Animation plays (remapped to 0->1)
    const animatedProgress = useTransform(scrollYProgress, [0, 0.12, 1], [0, 0, 1]);

    // Section visibility: fades in immediately upon entering viewport
    const sectionOpacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="relative" style={{ height: `${TOTAL_HEIGHT_VH}vh` }}>
            <motion.div className="sticky top-0 h-screen w-full overflow-hidden" style={{ opacity: sectionOpacity }}>
                <IntroOverlay scrollYProgress={animatedProgress} />

                {projects.map((project, index) => (
                    <Chapter key={index} project={project} index={index} scrollYProgress={animatedProgress} />
                ))}

                <ProgressDots scrollYProgress={animatedProgress} />
            </motion.div>
        </section>
    );
};

/* ─── Intro Overlay ─── */
const IntroOverlay = ({ scrollYProgress }) => {
    const opacity = useTransform(scrollYProgress, [0, 0.08, 0.17, 0.24], [1, 1, 0.6, 0]);
    const y = useTransform(scrollYProgress, [0, 0.24], [0, -80]);
    const blurValue = useTransform(scrollYProgress, [0.12, 0.24], [0, 10]);
    const blurFilter = useTransform(blurValue, (v) => `blur(${v}px)`);
    const scale = useTransform(scrollYProgress, [0, 0.24], [1, 0.94]);

    return (
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 pointer-events-none" style={{ opacity, y, scale, filter: blurFilter }}>
            <span className="text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-neutral-500 mb-4">What I Can Do</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-light tracking-tighter text-foreground text-center leading-[1.1]">
                Crafting Digital <br />
                <span className="font-semibold">Experiences</span>
            </h2>
        </motion.div>
    );
};

/* ─── Progress Dots ─── */
const ProgressDots = ({ scrollYProgress }) => {
    const firstStart = CHAPTER_RANGES[0].start;
    const lastEnd = CHAPTER_RANGES[CHAPTER_RANGES.length - 1].end;

    const dotsOpacity = useTransform(scrollYProgress, [firstStart - 0.03, firstStart + 0.03, lastEnd - 0.03, lastEnd], [0, 1, 1, 0]);
    const progressHeight = useTransform(scrollYProgress, [firstStart, lastEnd], ["0%", "100%"]);

    return (
        <motion.div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 z-20" style={{ opacity: dotsOpacity }}>
            <div className="relative w-px h-20 bg-neutral-800 rounded-full overflow-hidden">
                <motion.div className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-neutral-400 rounded-full" style={{ height: progressHeight }} />
            </div>

            <div className="flex flex-col gap-2 items-center">
                {CHAPTER_RANGES.map((range, i) => {
                    const chapterMid = (range.start + range.end) / 2;
                    const chapterSize = range.end - range.start;
                    return <DotIndicator key={i} scrollYProgress={scrollYProgress} chapterMid={chapterMid} chapterSize={chapterSize} />;
                })}
            </div>
        </motion.div>
    );
};

/* ─── Individual Dot ─── */
const DotIndicator = ({ scrollYProgress, chapterMid, chapterSize }) => {
    const dotOpacity = useTransform(scrollYProgress, [chapterMid - chapterSize * 0.35, chapterMid - chapterSize * 0.15, chapterMid + chapterSize * 0.15, chapterMid + chapterSize * 0.35], [0.3, 1, 1, 0.3]);
    const dotScale = useTransform(scrollYProgress, [chapterMid - chapterSize * 0.35, chapterMid - chapterSize * 0.15, chapterMid + chapterSize * 0.15, chapterMid + chapterSize * 0.35], [1, 1.8, 1.8, 1]);

    return <motion.div className="w-1.5 h-1.5 rounded-full bg-white" style={{ opacity: dotOpacity, scale: dotScale }} />;
};

export default Scrollytelling;
