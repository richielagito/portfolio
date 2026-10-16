import projects from "@/lib/data/projectData.json";

const base = "https://www.richielagito.com";

export default function sitemap() {
    const lastModified = new Date();
    return [
        { url: base, lastModified, changeFrequency: "monthly", priority: 1 },
        { url: `${base}/work`, lastModified, changeFrequency: "monthly", priority: 0.8 },
        ...projects.map(({ slug }) => ({
            url: `${base}/work/${slug}`,
            lastModified,
            changeFrequency: "yearly",
            priority: 0.6,
        })),
    ];
}
