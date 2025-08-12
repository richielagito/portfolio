import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const projectData = [
        { id: 1, title: "Outfitology", category: "Web Development, Outfit Inspiration", imageUrl: "https://placehold.co/600x400/E2E8F0/4A5568?text=Project+1" },
        { id: 2, title: "UploadItIn", category: "Web Application, Essay Grading System", imageUrl: "https://placehold.co/600x400/CBD5E0/2D3748?text=Project+2" },
        { id: 3, title: "Project Three", category: "Data Visualization", imageUrl: "https://placehold.co/600x400/BEE3F8/1A202C?text=Project+3" },
    ];

    useEffect(() => {
        gsap.fromTo(
            ".project-card",
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".project-card",
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none",
                },
            }
        );
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section id="proyek" className="mb-40 mt-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectData.map((project) => (
                    <div key={project.id} className="project-card bg-white/15 rounded-lg shadow-lg overflow-hidden group">
                        <a href="#">
                            <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                                <p className="text-white/70">{project.category}</p>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
