import Stack from "./Stack";

const About = () => {
    const images = [
        { id: 1, img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format" },
        { id: 2, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format" },
        { id: 3, img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format" },
        { id: 4, img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format" },
    ];

    return (
        <section id="tentang" className="mb-40 mt-20">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
                <div data-aos="fade-right" className="md:col-span-2">
                    <Stack randomRotation={true} sensitivity={180} sendToBackOnClick={false} cardDimensions={{ width: 300, height: 300 }} cardsData={images} />
                </div>
                <div data-aos="fade-left" className="md:col-span-3">
                    <h2 className="text-3xl font-bold mb-4 text-white">About Me</h2>
                    <p className="text-white/80 mb-4 leading-relaxed">
                        Hi! I'm Richie, an IT Student at Universitas Tarumanagara. I have a passion for solving complex problems and turning them into beautiful and engaging experiences for users.
                    </p>
                    <p className="text-white/80 mb-6 leading-relaxed">My expertise includes UI design, front-end web development, and programming. I believe that good collaboration is key to producing outstanding products.</p>
                    <div className="flex flex-wrap gap-2">
                        {["Front-end", "React", "Figma", "JavaScript", "HTML & CSS"].map((skill) => (
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
