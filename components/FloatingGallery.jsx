"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate } from "motion/react";
import Image from "next/image";

// Predefined layout positions (percentage-based) for up to 6 images
// Spread around the container so they don't overlap too much
const LAYOUT_POSITIONS = [
    { x: 15, y: 20 },
    { x: 60, y: 10 },
    { x: 75, y: 55 },
    { x: 10, y: 65 },
    { x: 45, y: 70 },
    { x: 40, y: 30 },
];

// Each image gets its own float parameters for organic motion
const FLOAT_CONFIGS = [
    { driftX: 12, driftY: 18, duration: 6, rotate: 3, delay: 0 },
    { driftX: 15, driftY: 10, duration: 7, rotate: -4, delay: 0.5 },
    { driftX: 10, driftY: 14, duration: 8, rotate: 2, delay: 1.0 },
    { driftX: 14, driftY: 12, duration: 5.5, rotate: -3, delay: 1.5 },
    { driftX: 8, driftY: 16, duration: 9, rotate: 5, delay: 0.8 },
    { driftX: 11, driftY: 9, duration: 6.5, rotate: -2, delay: 0.3 },
];

function FloatingImage({ src, alt, index, containerRef, imageSize = 140 }) {
    const dragX = useMotionValue(0);
    const dragY = useMotionValue(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const layout = LAYOUT_POSITIONS[index % LAYOUT_POSITIONS.length];
    const config = FLOAT_CONFIGS[index % FLOAT_CONFIGS.length];

    // Smooth spring for scale on hover/drag
    const scale = useSpring(1, { stiffness: 300, damping: 25 });

    useEffect(() => {
        if (isDragging) {
            scale.set(1.1);
        } else if (isHovered) {
            scale.set(1.08);
        } else {
            scale.set(1);
        }
    }, [isDragging, isHovered, scale]);

    // Subtle glow intensity tied to hover
    const glowOpacity = useSpring(0, { stiffness: 200, damping: 30 });
    useEffect(() => {
        glowOpacity.set(isHovered || isDragging ? 0.6 : 0.15);
    }, [isHovered, isDragging, glowOpacity]);

    const glowShadow = useTransform(glowOpacity, (v) => `0 0 ${20 + v * 30}px rgba(255,255,255,${v * 0.35}), 0 8px 32px rgba(0,0,0,0.5)`);

    return (
        <motion.div
            className="absolute cursor-grab active:cursor-grabbing select-none"
            style={{
                left: `${layout.x}%`,
                top: `${layout.y}%`,
                x: dragX,
                y: dragY,
                scale,
                zIndex: isDragging ? 50 : isHovered ? 40 : 10 + index,
            }}
            drag
            dragConstraints={containerRef}
            dragElastic={0.15}
            dragMomentum={true}
            dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
            initial={{ opacity: 0, scale: 0.3, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{
                delay: config.delay + 0.2,
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9],
            }}
        >
            {/* Floating drift animation wrapper */}
            <motion.div
                animate={
                    isDragging
                        ? {}
                        : {
                              y: [0, -config.driftY, 0, config.driftY * 0.6, 0],
                              x: [0, config.driftX * 0.5, 0, -config.driftX * 0.5, 0],
                              rotate: [0, config.rotate, 0, -config.rotate, 0],
                          }
                }
                transition={
                    isDragging
                        ? {}
                        : {
                              duration: config.duration,
                              repeat: Infinity,
                              ease: "easeInOut",
                          }
                }
            >
                {/* The actual image card — glow applied directly */}
                <motion.div
                    className="relative rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm"
                    style={{
                        width: imageSize,
                        height: imageSize,
                        boxShadow: glowShadow,
                    }}
                >
                    {/* Subtle inner gradient overlay */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/5 via-transparent to-black/20 pointer-events-none" />

                    <Image src={src} alt={alt} fill className="object-cover pointer-events-none" sizes="200px" draggable={false} />

                    {/* Reflective shine on hover */}
                    <motion.div
                        className="absolute inset-0 z-20 pointer-events-none"
                        style={{
                            background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, transparent 100%)",
                        }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default function FloatingGallery({ images = [], imageSize = 140 }) {
    const containerRef = useRef(null);

    const defaultImages = [
        { id: 1, img: "/fotosplit.jpg" },
        { id: 2, img: "/fotobadminton.jpg" },
        { id: 3, img: "/fotomakanan1.jpg" },
        { id: 4, img: "/fotomakanan2.jpg" },
    ];

    const items = images.length > 0 ? images : defaultImages;

    return (
        <div ref={containerRef} className="relative w-full h-full min-h-[350px] md:min-h-[450px]">
            {/* Subtle ambient glow in the center of the gallery */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div
                    className="w-48 h-48 rounded-full opacity-[0.04]"
                    style={{
                        background: "radial-gradient(circle, rgba(255,255,255,1) 0%, transparent 70%)",
                    }}
                />
            </div>

            {items.map((item, index) => (
                <FloatingImage key={item.id} src={item.img} alt={`floating-${item.id}`} index={index} containerRef={containerRef} imageSize={imageSize} />
            ))}

            {/* Instructional hint */}
            <motion.p
                className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] text-neutral-600 tracking-wider uppercase select-none pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                drag to explore
            </motion.p>
        </div>
    );
}
