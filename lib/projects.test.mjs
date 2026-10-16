import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
    assertSlugs,
    buildRewrites,
    demoHref,
    getFeatured,
    getNextProject,
} from "./projects.mjs";

const make = (n, featured = () => false) =>
    Array.from({ length: n }, (_, i) => ({ slug: `p${i}`, featured: featured(i) }));

test("assertSlugs rejects reserved, duplicate, malformed and missing slugs", () => {
    assert.throws(() => assertSlugs([{ slug: "work" }]), /work/);
    assert.throws(() => assertSlugs([{ slug: "a" }, { slug: "a" }]), /a/);
    assert.throws(() => assertSlugs([{ slug: "Bad Slug" }]), /Bad Slug/);
    assert.throws(() => assertSlugs([{}]));
    assert.doesNotThrow(() => assertSlugs([{ slug: "aether-lens" }]));
});

test("buildRewrites keeps the slug prefix and strips a trailing slash", () => {
    assert.deepEqual(buildRewrites([{ slug: "aether-lens", demo: "https://x.vercel.app/" }]), [
        { source: "/aether-lens", destination: "https://x.vercel.app/aether-lens" },
        { source: "/aether-lens/:path*", destination: "https://x.vercel.app/aether-lens/:path*" },
    ]);
    assert.deepEqual(buildRewrites([{ slug: "a" }]), []);
});

test("demoHref prefers the sub-path, then the external URL, else null", () => {
    assert.equal(demoHref({ slug: "a", demo: "https://x" }), "/a");
    assert.equal(demoHref({ slug: "a", demoUrl: "https://y" }), "https://y");
    assert.equal(demoHref({ slug: "a" }), null);
});

test("getFeatured returns featured in order, capped, with fallback", () => {
    assert.deepEqual(getFeatured(make(5, (i) => i === 1 || i === 3)).map((p) => p.slug), ["p1", "p3"]);
    assert.deepEqual(getFeatured(make(6)).map((p) => p.slug), ["p0", "p1", "p2", "p3"]);
    assert.equal(getFeatured(make(6, () => true)).length, 4);
});

test("getNextProject wraps around", () => {
    assert.equal(getNextProject(make(3), "p2").slug, "p0");
    assert.equal(getNextProject(make(3), "p0").slug, "p1");
});

test("real project data has valid slugs", () => {
    const projects = JSON.parse(readFileSync(new URL("./data/projectData.json", import.meta.url), "utf8"));
    assert.doesNotThrow(() => assertSlugs(projects));
});
