import Link from "next/link";
import ProjectRow from "@/components/ProjectRow";
import projects from "@/lib/data/projectData.json";

export const metadata = {
    title: "Work",
    description: "Every project Richie Lagito has built.",
};

export default function WorkIndex() {
    return (
        <main className="pt-8 sm:pt-12">
            <Link href="/" className="text-sm text-ink-2 transition-colors hover:text-ink">
                ← Home
            </Link>
            <h1 className="mt-6 text-[clamp(2rem,1.4rem+2.4vw,2.75rem)] font-medium leading-[1.04] tracking-[-0.035em]">Work</h1>
            <p className="mt-3 text-ink-2">
                {projects.length} projects. Open any of them for the role, the stack, and a demo.
            </p>
            <ul className="mt-8">
                {projects.map((project) => (
                    <ProjectRow key={project.slug} project={project} />
                ))}
            </ul>
        </main>
    );
}
