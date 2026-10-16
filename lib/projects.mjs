// Pure helpers over project data. No Next or data imports, so next.config.mjs and node:test can use them.

// Top-level paths this site owns. A project slug here would shadow (or be shadowed by) a real route or file.
export const RESERVED_SLUGS = [
    "work",
    "api",
    "_next",
    "projects",
    "videos",
    "avatar.webp",
    "sitemap.xml",
    "robots.txt",
    "favicon.ico",
    "opengraph-image.png",
];

const SLUG = /^[a-z0-9-]+$/;

export function assertSlugs(projects, reserved = RESERVED_SLUGS) {
    const seen = new Set();
    for (const { slug } of projects) {
        if (!slug) throw new Error("Project is missing a slug");
        if (!SLUG.test(slug)) throw new Error(`Project slug "${slug}" must match ${SLUG}`);
        if (reserved.includes(slug)) throw new Error(`Project slug "${slug}" is reserved`);
        if (seen.has(slug)) throw new Error(`Project slug "${slug}" is duplicated`);
        seen.add(slug);
    }
}

export function buildRewrites(projects) {
    return projects
        .filter((p) => p.demo)
        .flatMap(({ slug, demo }) => {
            const origin = demo.replace(/\/+$/, "");
            return [
                { source: `/${slug}`, destination: `${origin}/${slug}` },
                { source: `/${slug}/:path*`, destination: `${origin}/${slug}/:path*` },
            ];
        });
}

export function demoHref(project) {
    if (project.demo) return `/${project.slug}`;
    return project.demoUrl ?? null;
}

export function getFeatured(projects, max = 4) {
    const featured = projects.filter((p) => p.featured);
    return (featured.length ? featured : projects).slice(0, max);
}

export function getProject(projects, slug) {
    return projects.find((p) => p.slug === slug);
}

export function getNextProject(projects, slug) {
    const i = projects.findIndex((p) => p.slug === slug);
    return projects[(i + 1) % projects.length];
}
