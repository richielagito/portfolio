"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useScroll, useTransform, useSpring } from "motion/react";

import Header from "@/components/Header.jsx";

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
    // 5 snap points total: 0: Header, 1: Intro, 2: Proj 0, 3: Proj 1, 4: Proj 2
    // scrollYProgress: 0.0 -> 0.25 -> 0.5 -> 0.75 -> 1.0
    const snapPoint = (index + 2) / 4;
    const step = 0.25;
    const start = snapPoint - step * 0.5;
    const end = snapPoint + step * 0.5;

    // Balanced snap: crisper fade-in/out
    const opacity = useTransform(scrollYProgress, [start, snapPoint - step * 0.15, snapPoint + step * 0.15, end], [0, 1, 1, 0]);

    const imgScale = useTransform(scrollYProgress, [start, snapPoint, end], [0.98, 1, 1.02]);
    const imgOpacity = useTransform(scrollYProgress, [start, snapPoint - step * 0.15, snapPoint + step * 0.15, end], [0, 1, 1, 0]);

    // Smooth snap into position
    const textY = useTransform(scrollYProgress, [start, snapPoint, end], [20, 0, -20]);

    // Tagline follows shortly after
    const taglineOpacity = useTransform(scrollYProgress, [start + 0.1, snapPoint, snapPoint + 0.1, end], [0, 1, 1, 0]);
    const taglineY = useTransform(scrollYProgress, [start + 0.1, snapPoint, end], [10, 0, -10]);

    return (
        <m.div className="absolute inset-0 flex items-center justify-center px-6 md:px-16 pointer-events-none" style={{ opacity }}>
            <m.div className="flex flex-col md:flex-row md:items-center md:gap-12 lg:gap-20 items-center justify-center w-full max-w-6xl">
                {/* Text side — left on desktop */}
                <div className="flex flex-col items-center md:items-start md:w-[40%] shrink-0">
                    <m.span className="text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-neutral-500 mb-4" style={{ y: textY }}>
                        {project.category}
                    </m.span>

                    <m.h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-semibold tracking-tighter text-foreground mb-6 md:mb-8 text-center md:text-left leading-[1]" style={{ y: textY }}>
                        {project.title}
                    </m.h2>

                    <m.p className="text-base md:text-lg text-neutral-400 font-light text-center md:text-left max-w-md" style={{ opacity: taglineOpacity, y: taglineY }}>
                        {project.tagline}
                    </m.p>
                </div>

                {/* Image side — right on desktop */}
                <m.div className="relative w-[85vw] md:w-[55%] max-w-2xl aspect-video rounded-xl overflow-hidden scrollytelling-glow mt-8 md:mt-0" style={{ scale: imgScale, opacity: imgOpacity }}>
                    <Image src={project.image} alt={project.title} fill className="object-cover" sizes="(max-width: 768px) 85vw, 55vw" priority={index === 0} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                </m.div>
            </m.div>
        </m.div>
    );
};

/* ─── Main Scrollytelling Section ─── */
const Scrollytelling = ({ onLoaded, startAnimation }) => {
    const scrollContainerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        container: scrollContainerRef,
    });

    // Create a smoothed spring-based progress for all animations
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 180, // High stiffness for instant response
        damping: 50,    // High damping to eliminate all bounce/oscillation
        mass: 0.5,      // Reduced mass for less inertia
        restDelta: 0.001
    });

    // Animate Header separately
    const headerOpacity = useTransform(smoothProgress, [0, 0.12, 0.2], [1, 1, 0]);
    const headerY = useTransform(smoothProgress, [0, 0.25], [0, -40]);
    const headerScale = useTransform(smoothProgress, [0, 0.25], [1, 0.98]);

    return (
        <section className="relative h-screen w-full">
            <div
                ref={scrollContainerRef}
                className="absolute inset-0 h-full w-full overflow-y-auto snap-y snap-mandatory no-scrollbar scroll-smooth"
                data-lenis-prevent="true"
            >
                {/* Sticky Content Layer MUST be first in DOM so it starts at top:0 */}
                <div className="sticky top-0 left-0 h-0 w-full z-10 pointer-events-none overflow-visible">
                    <div className="h-screen w-full relative">
                        {/* Header Snap Point 0.0 */}
                        <m.div className="absolute inset-0" style={{ opacity: headerOpacity, y: headerY, scale: headerScale }}>
                            <Header onLoaded={onLoaded} startAnimation={startAnimation} />
                        </m.div>

                        <IntroOverlay scrollYProgress={smoothProgress} />

                        {projects.map((project, index) => (
                            <Chapter key={project.title} project={project} index={index} scrollYProgress={smoothProgress} />
                        ))}

                        <ProgressDots scrollYProgress={smoothProgress} />
                    </div>
                </div>

                {/* Snap Targets (5 steps total) */}
                <div className="h-screen w-full snap-start snap-always shrink-0" /> {/* 0.0: Header */}
                <div className="h-screen w-full snap-start snap-always shrink-0" /> {/* 0.25: Intro Overlay */}
                <div className="h-screen w-full snap-start snap-always shrink-0" /> {/* 0.5: Project 1 */}
                <div className="h-screen w-full snap-start snap-always shrink-0" /> {/* 0.75: Project 2 */}
                <div className="h-screen w-full snap-start snap-always shrink-0" /> {/* 1.0: Project 3 */}
            </div>
        </section>
    );
};

/* ─── Intro Overlay ─── */
const IntroOverlay = ({ scrollYProgress }) => {
    // Snap point at 0.25. Fades in as we leave Header (0.0), fades out as we move toward Proj 1 (0.5)
    const opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.3, 0.4], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.25, 0.5], [40, 0, -40]);
    const scale = useTransform(scrollYProgress, [0, 0.25, 0.5], [0.98, 1, 0.98]);

    return (
        <m.div className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 pointer-events-none" style={{ opacity, y, scale }}>
            <span className="text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-neutral-500 mb-4">The good stuff</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-light tracking-tighter text-foreground text-center leading-[1.1]">
                Things I've <br />
                <span className="font-semibold">Recently Built</span>
            </h2>
        </m.div>
    );
};

/* ─── Progress Dots ─── */
const ProgressDots = ({ scrollYProgress }) => {
    const dotsOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [1, 1, 1, 1]); // Always visible
    const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <m.div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 z-20" style={{ opacity: dotsOpacity }}>
            <div className="relative w-px h-20 bg-neutral-800 rounded-full overflow-hidden">
                <m.div className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-neutral-400 rounded-full" style={{ height: progressHeight }} />
            </div>

            <div className="flex flex-col gap-2 items-center">
                {[0, 0.25, 0.5, 0.75, 1].map((mid) => (
                    <DotIndicator key={mid} scrollYProgress={scrollYProgress} chapterMid={mid} />
                ))}
            </div>
        </m.div>
    );
};

/* ─── Individual Dot ─── */
const DotIndicator = ({ scrollYProgress, chapterMid }) => {
    const step = 0.25;
    const dotOpacity = useTransform(scrollYProgress, [chapterMid - step * 0.5, chapterMid, chapterMid + step * 0.5], [0.3, 1, 0.3]);
    const dotScale = useTransform(scrollYProgress, [chapterMid - step * 0.5, chapterMid, chapterMid + step * 0.5], [1, 1.8, 1]);

    return <m.div className="size-1.5 rounded-full bg-white" style={{ opacity: dotOpacity, scale: dotScale }} />;
};

export default Scrollytelling;
