// Section with a plain heading row; `aside` sits on the right of the heading.
export default function Section({ id, title, aside, children }) {
    return (
        <section id={id} aria-labelledby={`${id}-title`} className="mt-14 sm:mt-16">
            <div className="mb-2 flex items-baseline justify-between gap-4">
                <h2 id={`${id}-title`} className="text-[0.9375rem] font-semibold">
                    {title}
                </h2>
                {aside}
            </div>
            {children}
        </section>
    );
}
