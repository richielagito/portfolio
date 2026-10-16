"use client";

import { useEffect, useRef, useState } from "react";

const POSTER = "/videos/ascii-poster.webp";

// Decorative loop. Nothing (not even the poster) loads until the footer is within 300px;
// it plays only while actually on screen, and shows the poster only under reduced motion.
export default function FooterVideo() {
    const ref = useRef(null);
    const [near, setNear] = useState(false);
    const [still, setStill] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
        const box = ref.current;
        const load = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setNear(true);
                load.disconnect();
            },
            { rootMargin: "300px 0px" }
        );
        const play = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
        load.observe(box);
        play.observe(box);
        return () => {
            load.disconnect();
            play.disconnect();
        };
    }, []);

    useEffect(() => {
        const video = ref.current.querySelector("video");
        if (!video) return;
        if (visible) video.play().catch(() => {});
        else video.pause();
    }, [near, visible]);

    return (
        <div
            ref={ref}
            aria-hidden="true"
            className="-mx-5 aspect-[1280/712] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_28%)] sm:-mx-8"
        >
            {near && still && <img src={POSTER} alt="" className="h-full w-full object-cover" />}
            {near && !still && (
                <video muted loop playsInline preload="none" poster={POSTER} className="h-full w-full object-cover">
                    <source src="/videos/ascii.webm" type="video/webm" />
                    <source src="/videos/ascii.mp4" type="video/mp4" />
                </video>
            )}
        </div>
    );
}
