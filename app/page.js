import Link from "next/link";
import Head from "@/components/Head";
import Section from "@/components/Section";
import ProjectRow from "@/components/ProjectRow";
import profile from "@/lib/data/profile.json";
import projects from "@/lib/data/projectData.json";
import experiences from "@/lib/data/experiencesData.json";
import { getFeatured } from "@/lib/projects.mjs";

export default function Home() {
    return (
        <main>
            <Head profile={profile} />

            <Section
                id="work"
                title="Selected work"
                aside={
                    <Link href="/work" className="text-sm text-ink-2 transition-colors hover:text-ink">
                        All projects ({projects.length}) →
                    </Link>
                }
            >
                <ul>
                    {getFeatured(projects).map((project) => (
                        <ProjectRow key={project.slug} project={project} />
                    ))}
                </ul>
            </Section>

            <Section id="experience" title="Experience">
                <ul>
                    {experiences.map((e) => (
                        <li key={e.id} className="flex items-baseline justify-between gap-4 border-t border-line py-3.5 first:border-t-0">
                            <p className="min-w-0">
                                <span className="font-medium">{e.role}</span>
                                <span className="text-ink-2"> · {e.company}</span>
                            </p>
                            <span className="flex-none font-mono text-xs text-ink-3 tabular-nums">{e.date}</span>
                        </li>
                    ))}
                </ul>
            </Section>

            <Section id="stack" title="Stack">
                <p className="text-sm leading-relaxed text-ink-2">{profile.stack.join(" · ")}</p>
            </Section>
        </main>
    );
}
