import Link from "next/link";
import Image from "next/image";

export default function TopBar() {
    return (
        <nav aria-label="Primary" className="flex h-16 items-center justify-between">
            <Link href="/" aria-label="Richie Lagito, home" className="-m-2 p-2">
                <Image src="/logoRL.svg" alt="" width={28} height={28} className="h-7 w-7" priority />
            </Link>
            <div className="flex items-center gap-5 text-sm text-ink-2">
                <Link href="/work" className="transition-colors hover:text-ink">
                    Work
                </Link>
                <a href="#contact" className="transition-colors hover:text-ink">
                    Contact
                </a>
            </div>
        </nav>
    );
}
