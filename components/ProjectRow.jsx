import Link from "next/link";
import Image from "next/image";

// One shipped entry. On xl screens the screenshot floats in the right gutter on hover/focus.
export default function ProjectRow({ project }) {
    const { slug, title, description, year, status, tech, imageUrl } = project;
    return (
        <li className="group relative border-t border-line first:border-t-0">
            <Link
                href={`/work/${slug}`}
                className="-mx-3 flex gap-4 rounded-lg px-3 py-4 transition-colors duration-200 hover:bg-white/[0.025] focus-visible:bg-white/[0.025]"
            >
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt=""
                        width={72}
                        height={48}
                        sizes="72px"
                        className="mt-0.5 h-12 w-[4.5rem] flex-none rounded-md object-cover object-top ring-1 ring-line-2 xl:hidden"
                    />
                )}
                <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-medium">{title}</h3>
                        <span className="flex-none font-mono text-xs text-ink-3 tabular-nums">{year}</span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-ink-2">{description}</p>
                    <p className="mt-2 flex flex-wrap items-center gap-x-2 font-mono text-xs text-ink-3">
                        <span className={status === "live" ? "text-ink-2" : undefined}>{status}</span>
                        <span aria-hidden="true">/</span>
                        <span>{tech.join(", ")}</span>
                    </p>
                </div>
            </Link>
            {imageUrl && (
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-[calc(100%+3rem)] hidden w-72 -translate-y-1/2 [clip-path:inset(0_0_100%_0_round_10px)] opacity-0 transition-[clip-path,opacity] duration-500 ease-out group-focus-within:[clip-path:inset(0_0_0_0_round_10px)] group-focus-within:opacity-100 group-hover:[clip-path:inset(0_0_0_0_round_10px)] group-hover:opacity-100 motion-reduce:transition-none xl:block"
                >
                    <Image
                        src={imageUrl}
                        alt=""
                        width={576}
                        height={360}
                        sizes="288px"
                        className="aspect-[8/5] w-full rounded-[10px] object-cover object-top ring-1 ring-line-2"
                    />
                </div>
            )}
        </li>
    );
}
