import Button from "./Button";
import FooterVideo from "./FooterVideo";
import { linkIcons, Mail } from "./icons";
import profile from "@/lib/data/profile.json";

export default function Footer() {
    return (
        <footer id="contact" className="mt-16 pb-10 sm:mt-20">
            <FooterVideo />

            <h2 className="mt-10 max-w-[20ch] text-[clamp(1.625rem,1.2rem+1.6vw,2.125rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                Got something that needs to ship?
            </h2>
            <p className="mt-3 text-ink-2">
                Based in {profile.location} ({profile.timezone}).
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Button href={`mailto:${profile.email}`} variant="primary">
                    <Mail aria-hidden="true" />
                    Get in touch
                </Button>
                <a href={`mailto:${profile.email}`} className="text-sm text-ink-2 underline decoration-line-2 transition-colors hover:text-ink hover:decoration-ink-3">
                    {profile.email}
                </a>
            </div>

            <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm text-ink-3">
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
