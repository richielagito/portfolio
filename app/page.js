import Projects from "@/components/Projects.jsx";
import About from "@/components/About.jsx";
import Contact from "@/components/Contact.jsx";
import Footer from "@/components/Footer.jsx";
import ToolsAndFrameworks from "@/components/Toolbox.jsx";
import GithubGallery from "@/components/GithubGallery.jsx";
import Experiences from "@/components/Experiences.jsx";
import HomeClientWrapper from "@/components/HomeClientWrapper.jsx";

export default function Home() {
  return (
    <HomeClientWrapper>
      <main className="container mx-auto w-[90%] max-w-5xl relative z-10">
        <About />
        <Experiences />
        <Projects />
        <section className="py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start relative z-10">
          <ToolsAndFrameworks />
          <GithubGallery />
        </section>
        <Contact />
      </main>
      <Footer />
    </HomeClientWrapper>
  );
}
