import Image from "next/image";

// A shared stage keeps differently sized screenshots inside the same silhouette.
export default function ProjectImage({ src, alt = "", sizes, priority = false, className = "" }) {
    return (
        <div className={`group/project-image relative aspect-[8/5] overflow-hidden rounded-[10px] bg-[#15231e] ring-1 ring-line-2 ${className}`}>
            <Image
                src="/projects/project-backdrop.webp"
                alt=""
                fill
                sizes={sizes}
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-[5%] flex items-center justify-center">
                <Image
                    src={src}
                    alt={alt}
                    width={1280}
                    height={800}
                    sizes={sizes}
                    priority={priority}
                    className="h-auto max-h-full w-auto max-w-full rounded-[6px] transition-transform duration-300 ease-out motion-safe:group-hover/project-image:scale-[1.03] motion-safe:group-hover:scale-[1.03] motion-safe:group-focus-within:scale-[1.03] motion-reduce:transition-none"
                />
            </div>
        </div>
    );
}
