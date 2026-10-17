import Image from "next/image";
import Button from "./Button";
import { linkIcons, Mail, FileText } from "./icons";

export default function Head({ profile }) {
    return (
        <header data-arc-head className="pt-8 sm:pt-12 lg:min-h-[calc(var(--arc-top)-4rem)] lg:[text-shadow:0_1px_2px_rgb(0_0_0/0.6),0_0_18px_rgb(10_10_10/0.9)]">
            <div className="flex items-center gap-4">
                <Image
                    src={profile.avatar}
                    alt={`Portrait of ${profile.name}`}
                    width={56}
                    height={56}
                    priority
                    className="h-14 w-14 rounded-full object-cover ring-1 ring-line-2"
                />
                <div className="min-w-0">
                    <h1 className="text-[1.0625rem] font-semibold leading-tight">{profile.name}</h1>
                    <p className="mt-1 text-sm text-ink-2">
                        {profile.role} · {profile.location}
                    </p>
                    {profile.available && (
                        <p className="mt-1 inline-flex items-center gap-1.5 text-sm">
                            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ink" />
                            Open to work
                        </p>
                    )}
                </div>
            </div>

            <p className="mt-9 max-w-[20ch] text-[clamp(2rem,1.5rem+1.8vw,2.5rem)] font-medium leading-[1.04] tracking-[-0.035em]">
                {profile.headline}
            </p>
            <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-2">{profile.bio}</p>

            <div className="mt-8 flex flex-wrap gap-2">
                <Button href={`mailto:${profile.email}`} variant="primary">
                    <Mail aria-hidden="true" />
                    Email me
                </Button>
                {profile.cvUrl && (
                    <Button href={profile.cvUrl} external>
                        <FileText aria-hidden="true" />
                        CV
                    </Button>
                )}
                {profile.links.filter(({ label }) => label !== "Instagram").map(({ label, href }) => {
                    const Icon = linkIcons[label];
                    return (
                        <Button key={label} href={href} external>
                            {Icon && <Icon aria-hidden="true" />}
                            {label}
                        </Button>
                    );
                })}
            </div>
        </header>
    );
}
