"use client";

import { motion } from "motion/react";
import Image from "next/image";

// Horizontal layout positions — images spread across the row
const SHOWCASE_POSITIONS = [
    { x: 5, y: 15 },
    { x: 30, y: 30 },
    { x: 55, y: 10 },
    { x: 78, y: 25 },
    { x: 18, y: 55 },
    { x: 65, y: 55 },
];

// Each image gets unique float parameters for organic, space-like drift
const FLOAT_CONFIGS = [
    { driftX: 8, driftY: 12, duration: 6, rotate: 3, delay: 0 },
    { driftX: 10, driftY: 8, duration: 7.5, rotate: -4, delay: 0.3 },
    { driftX: 6, driftY: 10, duration: 8, rotate: 2, delay: 0.6 },
    { driftX: 9, driftY: 7, duration: 5.5, rotate: -3, delay: 0.9 },
    { driftX: 7, driftY: 11, duration: 9, rotate: 4, delay: 0.4 },
    { driftX: 8, driftY: 6, duration: 6.5, rotate: -2, delay: 0.7 },
];

function ShowcaseImage({ src, alt, index, imageSize = 100 }) {
    const layout = SHOWCASE_POSITIONS[index % SHOWCASE_POSITIONS.length];
    const config = FLOAT_CONFIGS[index % FLOAT_CONFIGS.length];

    return (
        <motion.div
            className="absolute select-none pointer-events-none"
            style={{
                left: `${layout.x}%`,
                top: `${layout.y}%`,
            }}
            initial={{ opacity: 0, scale: 0.3, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
                delay: config.delay + 0.2,
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9],
            }}
        >
            {/* Floating drift animation */}
            <motion.div
                animate={{
                    y: [0, -config.driftY, 0, config.driftY * 0.6, 0],
                    x: [0, config.driftX * 0.5, 0, -config.driftX * 0.5, 0],
                    rotate: [0, config.rotate, 0, -config.rotate, 0],
                }}
                transition={{
                    duration: config.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                {/* Image card with glow */}
                <div
                    className="relative rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm"
                    style={{
                        width: imageSize,
                        height: imageSize,
                        boxShadow: "0 0 20px rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.4)",
                    }}
                >
                    {/* Inner gradient overlay */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/5 via-transparent to-black/20 pointer-events-none" />

                    <Image src={src} alt={alt} fill className="object-cover" sizes="150px" draggable={false} />
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function FloatingShowcase({ images = [], imageSize = 100 }) {
    if (!images || images.length === 0) return null;

    return (
        <div className="relative w-full h-[160px] md:h-[180px] mt-6">
            {images.map((src, index) => (
                <ShowcaseImage key={`${src}-${index}`} src={src} alt={`showcase-${index}`} index={index} imageSize={imageSize} />
            ))}
        </div>
    );
}
