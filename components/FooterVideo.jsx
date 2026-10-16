"use client";

import { useEffect, useRef, useState } from "react";

const POSTER = "/videos/ascii-poster.webp";

// Decorative loop. Nothing (not even the poster) loads until the footer nears the viewport;
// it plays only while on screen, and shows the poster only under reduced motion.
export default function FooterVideo() {
    const ref = useRef(null);
    const [near, setNear] = useState(false);
    const [still, setStill] = useState(false);

    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setStill(reduce);
        const box = ref.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setNear(true);
                const video = box.querySelector("video");
                if (!video) return;
                if (entry.isIntersecting) video.play().catch(() => {});
                else video.pause();
            },
            { rootMargin: "300px 0px" }
        );
        observer.observe(box);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} aria-hidden="true" className="aspect-[1280/712] w-full overflow-hidden rounded-xl bg-white/[0.02] ring-1 ring-line-2">
            {near && still && <img src={POSTER} alt="" className="h-full w-full object-cover" />}
            {near && !still && (
                <video muted loop playsInline autoPlay preload="none" poster={POSTER} className="h-full w-full object-cover">
                    <source src="/videos/ascii.webm" type="video/webm" />
                    <source src="/videos/ascii.mp4" type="video/mp4" />
                </video>
            )}
        </div>
    );
}
