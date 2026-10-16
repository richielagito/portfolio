"use client";

import { useEffect, useRef, useState } from "react";

const POSTER = "/videos/ascii-poster.webp";

// Decorative loop: no preload, plays only while on screen, poster only under reduced motion.
export default function FooterVideo() {
    const ref = useRef(null);
    const [still, setStill] = useState(false);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setStill(true);
            return;
        }
        const video = ref.current;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) video.play().catch(() => {});
            else video.pause();
        });
        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    const className = "aspect-[1280/712] w-full rounded-xl object-cover ring-1 ring-line-2";

    if (still) return <img src={POSTER} alt="" aria-hidden="true" loading="lazy" className={className} />;

    return (
        <video ref={ref} muted loop playsInline preload="none" poster={POSTER} aria-hidden="true" className={className}>
            <source src="/videos/ascii.webm" type="video/webm" />
            <source src="/videos/ascii.mp4" type="video/mp4" />
        </video>
    );
}
