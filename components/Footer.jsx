import Button from "./Button";
import FooterVideo from "./FooterVideo";
import { linkIcons, Mail } from "./icons";
import profile from "@/lib/data/profile.json";

export default function Footer() {
    return (
        <footer id="contact" className="mt-16 pb-10 sm:mt-20">
            <div className="relative -mx-5 flex min-h-[25rem] flex-col justify-end overflow-hidden sm:-mx-8 sm:aspect-[1280/712] sm:min-h-0">
                <FooterVideo />
                {/* Scrim: darkens only the lower band the copy sits on. */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(10_10_10/0.82)_0%,rgb(10_10_10/0.5)_38%,transparent_70%)]"
                />

                <div className="relative px-5 pb-7 [text-shadow:0_1px_2px_rgb(0_0_0/0.5),0_2px_16px_rgb(0_0_0/0.35)] sm:px-8 sm:pb-9">
                    <h2 className="max-w-[20ch] text-[clamp(1.625rem,1.2rem+1.6vw,2.125rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                        Got something that needs to ship?
                    </h2>
                    <p className="mt-2 text-ink/80">
                        Based in {profile.location} ({profile.timezone}).
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                        <Button href={`mailto:${profile.email}`} variant="primary" className="[text-shadow:none]">
                            <Mail aria-hidden="true" />
                            Get in touch
                        </Button>
                        <a
                            href={`mailto:${profile.email}`}
                            className="text-sm text-ink underline decoration-white/40 transition-colors hover:decoration-white"
                        >
                            {profile.email}
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm text-ink-3">
                <p>© {new Date().getFullYear()} {profile.name}</p>
                <ul className="flex items-center gap-1">
                    {profile.links.map(({ label, href }) => {
                        const Icon = linkIcons[label];
                        return (
                            <li key={label}>
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="grid h-9 w-9 place-items-center rounded-lg transition-colors hover:bg-white/5 hover:text-ink"
                                >
                                    {Icon ? <Icon aria-hidden="true" className="h-4 w-4" /> : label}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </footer>
    );
}
