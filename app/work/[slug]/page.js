import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/Button";
import { linkIcons } from "@/components/icons";
import projects from "@/lib/data/projectData.json";
import { demoHref, getNextProject, getProject } from "@/lib/projects.mjs";

export const dynamicParams = false;

export function generateStaticParams() {
    return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const project = getProject(projects, slug);
    if (!project) return {};
    return { title: project.title, description: project.description };
}

function Block({ title, children }) {
    return (
        <section className="mt-12">
            <h2 className="text-[0.9375rem] font-semibold">{title}</h2>
            <div className="mt-3 leading-relaxed text-ink-2">{children}</div>
        </section>
    );
}

export default async function ProjectPage({ params }) {
    const { slug } = await params;
    const project = getProject(projects, slug);
    if (!project) notFound();

    const demo = demoHref(project);
    const next = getNextProject(projects, slug);
    const Github = linkIcons.GitHub;
    const meta = [
        ["Year", project.year],
        ["Role", project.role],
        ["Stack", project.tech.join(", ")],
        ["Status", project.status === "live" ? "Live" : "Archived"],
    ];

    return (
        <main className="pt-8 sm:pt-12">
            <Link href="/work" className="text-sm text-ink-2 transition-colors hover:text-ink">
                ← All work
            </Link>

            <h1 className="mt-6 text-[clamp(2rem,1.4rem+2.4vw,2.75rem)] font-medium leading-[1.04] tracking-[-0.035em]">
                {project.title}
            </h1>
            <p className="mt-3 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-2">{project.description}</p>

            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-4">
                {meta.map(([label, value]) => (
                    <div key={label} className="bg-bg px-4 py-3">
                        <dt className="text-xs text-ink-3">{label}</dt>
                        <dd className="mt-1 text-sm">{value}</dd>
                    </div>
                ))}
            </dl>

            {(demo || project.githubUrl) && (
                <div className="mt-6 flex flex-wrap gap-2">
                    {demo && (
                        <Button href={demo} external={demo.startsWith("http")}>
                            Live demo
                            <ArrowUpRight aria-hidden="true" />
                        </Button>
                    )}
                    {project.githubUrl && (
                        <Button href={project.githubUrl} external>
                            <Github aria-hidden="true" />
                            Code
                        </Button>
                    )}
                </div>
            )}

            {project.imageUrl && (
                <Image
                    src={project.imageUrl}
                    alt={`Screenshot of ${project.title}`}
                    width={1280}
                    height={800}
                    sizes="(min-width: 40rem) 36rem, 100vw"
                    priority
                    className="mt-10 aspect-[8/5] w-full rounded-xl object-cover object-top ring-1 ring-line-2"
                />
            )}

            {project.problem && (
                <Block title="Problem">
                    <p>{project.problem}</p>
                </Block>
            )}
            {project.whatIDid?.length > 0 && (
                <Block title="What I did">
                    <ul className="list-disc space-y-2 pl-5 marker:text-ink-3">
                        {project.whatIDid.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </Block>
            )}
            {project.result && (
                <Block title="Result">
                    <p>{project.result}</p>
                </Block>
            )}

            <Link
                href={`/work/${next.slug}`}
                className="group mt-16 flex items-baseline justify-between gap-4 border-y border-line py-5"
            >
                <span className="text-sm text-ink-3">Next project</span>
                <span className="font-medium transition-transform duration-300 ease-out group-hover:-translate-x-1">
                    {next.title} →
                </span>
            </Link>
        </main>
    );
}
