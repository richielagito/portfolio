"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import experiencesData from "@/lib/data/experiencesData.json";
import FloatingShowcase from "./FloatingShowcase";

const ExperienceItem = ({ exp, index, total }) => {
  const isLast = index === total - 1;

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.2, 0.65, 0.3, 0.9],
      }}
      className={`relative ${isLast ? "" : "pb-16"}`}
    >
      <div className="md:flex md:gap-12 md:items-start">
        {/* Date — Left Side on Desktop */}
        <div className="md:w-1/3 md:text-right mb-2 md:mb-0">
          <span className="text-sm font-medium text-neutral-500 uppercase tracking-widest">
            {exp.date}
          </span>
        </div>

        {/* Content — Right Side on Desktop */}
        <div className="md:w-2/3 md:pl-12">
          <h3 className="text-2xl font-medium text-foreground mb-1">
            {exp.role}
          </h3>
          <p className="text-neutral-400 text-lg mb-4">{exp.company}</p>
          <p className="text-neutral-500 font-normal leading-relaxed max-w-xl">
            {exp.description}
          </p>

          {/* Experience images */}
          {exp.images && exp.images.length > 0 && (
            <FloatingShowcase
              images={exp.images}
              imageWidth={130}
              imageHeight={90}
            />
          )}
        </div>
      </div>
    </m.div>
  );
};

const Experiences = () => {
  const timelineRef = useRef(null);

  // Track scroll progress through the timeline section
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"],
  });

  // The line draws from 0% to 100% height as user scrolls
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experiences" className="py-24">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20 md:pl-[calc(33.33%+3rem)]"
      >
        <h2 className="text-sm font-medium tracking-widest uppercase text-neutral-500 mb-2">
          Experience
        </h2>
        <p className="text-3xl md:text-4xl font-light text-foreground">
          My professional journey.
        </p>
      </m.div>

      {/* Timeline container */}
      <div ref={timelineRef} className="relative">
        {/* ── Continuous timeline line (Desktop) ── */}
        <div className="hidden md:block absolute left-1/3 top-0 bottom-0 w-px">
          {/* Background track */}
          <div className="absolute inset-0 bg-neutral-800/50" />
          {/* Animated fill */}
          <m.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-neutral-500 via-neutral-600 to-transparent"
            style={{ height: lineHeight }}
          />
        </div>

        {/* ── Continuous timeline line (Mobile) ── */}
        <div className="md:hidden absolute left-[11px] top-0 bottom-0 w-px">
          {/* Background track */}
          <div className="absolute inset-0 bg-neutral-800/50" />
          {/* Animated fill */}
          <m.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-neutral-500 via-neutral-600 to-transparent"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Experience items */}
        <div className="flex flex-col pl-8 md:pl-0">
          {experiencesData.map((exp, index) => (
            <div key={exp.id} className="relative">
              {/* Timeline Dot — Desktop */}
              <m.div
                className="hidden md:block absolute top-[8px] size-3 rounded-full border-2 border-neutral-500 bg-neutral-950 z-10"
                style={{ left: "calc(33.33% - 6px)" }}
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: index * 0.15 + 0.2,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              />

              {/* Timeline Dot — Mobile */}
              <m.div
                className="md:hidden absolute left-[calc(7px_-_2rem)] top-[9px] size-[9px] rounded-full bg-neutral-500 z-20"
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15 + 0.2,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              />

              <ExperienceItem
                exp={exp}
                index={index}
                total={experiencesData.length}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
