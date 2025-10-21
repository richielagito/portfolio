import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Stack from "./Stack";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const images = [
        { id: 4, img: "fotomakanan2.jpg" },
        { id: 3, img: "fotomakanan1.jpg" },
        { id: 2, img: "fotobadminton.jpg" },
        { id: 1, img: "fotosplit.jpg" },
    ];

    const leftColRef = useRef(null);
    const rightColRef = useRef(null);

    useEffect(() => {
        const leftEl = leftColRef.current;
        const rightEl = rightColRef.current;

        // Animasi untuk kolom kiri (gambar)
        gsap.fromTo(
            leftEl,
            { opacity: 0, filter: "blur(8px)" },
            {
                opacity: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: leftEl,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            }
        );

        gsap.fromTo(
            rightEl,
            { opacity: 0, x: 100, filter: "blur(8px)" },
            {
                opacity: 1,
                filter: "blur(0px)",
                x: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: rightEl,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section id="about" className="mb-40 mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 items-center">
                <div ref={leftColRef} className="md:col-span-2 mx-auto">
                    <Stack randomRotation={true} sensitivity={180} sendToBackOnClick={false} cardDimensions={{ width: 300, height: 300 }} cardsData={images} />
                </div>
                <div ref={rightColRef} className="md:col-span-3">
                    <h2 className="text-3xl font-bold mb-4 text-white">About Me</h2>
                    <p className="text-white/80 mb-4 leading-relaxed">
                        Hi! I'm Richie, an Undergraduate IT Student at Universitas Tarumanagara. I have a passion for solving complex problems and turning them into beautiful and engaging experiences for users. Other than the geek stuff, I
                        absolutely love to play badminton, and nonetheless, culinary.
                    </p>
                    <p className="text-white/80 mb-6 leading-relaxed">My expertise includes UI design, front-end web development, and problem solving. I believe that good collaboration is key to producing outstanding products.</p>
                    <div className="flex flex-wrap gap-2">
                        {["Front-end", "React", "JavaScript", "HTML & CSS", "etc."].map((skill) => (
                            <span key={skill} className="bg-indigo-200 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
