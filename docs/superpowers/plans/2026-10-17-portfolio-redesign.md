# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio as a light, dark-monochrome, single-column site with a home page, `/work`, `/work/[slug]` detail pages, a GradientASCII background, an ASCII video footer, and JSON-driven sub-path rewrites for project demos.

**Architecture:** All pages are server components rendered statically from hand-edited JSON in `lib/data/`. Pure helper functions in `lib/projects.mjs` (no Next imports, no data imports) are shared by the app, by `next.config.mjs` (rewrites plus a reserved-slug guard), and by a `node:test` file. Only three client components exist: `GradientASCII`, `FooterVideo`, and the row hover preview.

**Tech Stack:** Next.js 16 (App Router, React Compiler on), React 19.2, Tailwind 4, `next/font`, `next/image`, Node 22 `node:test`, ffmpeg (installed), Vercel.

**Spec:** `docs/superpowers/specs/2026-10-17-portfolio-redesign-design.md`

## Global Constraints

- Dark theme only. No light theme, no theme toggle. Monochrome (greys and white).
- English site copy.
- No loader, intro, scroll-jacking, or smooth-scroll library. Content is server-rendered HTML that's readable before JS.
- No client-side data fetching anywhere.
- Content lives only in `lib/data/*.json`, edited by hand.
- Content column is centered horizontally on desktop.
- GradientASCII: fixed full-viewport from `lg` (1024px) up. Below `lg`, it sits behind the head only. One instance. Monochrome colors.
- Buttons have a lighter top-edge highlight (inset top shadow).
- The demo CTA is understated, never the loudest element. Email is the primary button on the home page.
- Rewrites keep the prefix: `/<slug>/:path*` maps to `<demo>/<slug>/:path*`.
- Deps to remove: `@react-three/drei`, `@react-three/fiber`, `three`, `ogl`, `gsap`, `lenis`, `react-github-calendar`, `@fortawesome/fontawesome-svg-core`, `@fortawesome/free-brands-svg-icons`, `@fortawesome/free-regular-svg-icons`, `@fortawesome/free-solid-svg-icons`, `@fortawesome/react-fontawesome`, `motion`. Keep `@vercel/analytics`, `@vercel/speed-insights`, `lucide-react` (only if icons are used), `clsx`, `tailwind-merge`.
- Footer video: muted, loop, `playsInline`, `preload="none"`, plays only while in viewport, poster only under `prefers-reduced-motion`. Total video weight is under about 1 MB.
- All styling decisions (fonts, type scale, spacing, tokens, motion, component look) go through the `impeccable` skill.
- Work on branch `redesign`, not `main`.

## Review Focus

1. **A project with optional fields missing** (no `demo`, no `demoUrl`, no `githubUrl`, no `imageUrl`, no `problem`/`whatIDid`/`result`). The row and the detail page render without empty buttons, broken images, or empty headings. Pinned by `demoHref` tests (Task 2) and a fixture check (Task 6).
2. **An unknown slug at `/work/does-not-exist`** returns a 404, not a crash. Pinned in Task 6 (`dynamicParams = false`) plus a curl check.
3. **WebGL2 unavailable or blocked.** The page stays fully readable on the plain background. The component already returns early, and text contrast must not depend on the canvas. Pinned in Task 3 by a check with the canvas removed.
4. **`prefers-reduced-motion: reduce`.** ASCII is static, the video shows its poster only, and there are no hover transitions beyond opacity. Pinned in Task 3 and Task 5 by emulated browser checks.
5. **Zero projects flagged `featured`.** Selected Work falls back to the first 4 projects instead of rendering an empty section. Pinned by a `getFeatured` test (Task 2).

---

### Task 1: Branch, strip the old site, and optimize assets

**Files:**
- Delete: `components/*` (all current components), `lib/data/toolsData.json`, `app/page.js` contents (replaced by a stub)
- Delete from `public/`: `fotobadminton.jpg`, `fotomakanan1.jpg`, `fotomakanan2.jpg`, `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`, `logoRLdark.svg`, `developing-lintar.jpeg`, `meeting-pusda.jpeg`, `meeting-pusda2.jpeg`, `scrum-master.jpeg`
- Create: `public/avatar.webp` (from `public/fotosplit.jpg`, then delete the jpg), `public/projects/<slug>.webp` for each project screenshot (then delete the source PNGs)
- Create: `components/GradientASCII.jsx` (verbatim source Richie supplied; the session holding the conversation provides it)
- Modify: `app/layout.js` (drop `SmoothScroll`, `GlobalBackground`, Outfit/Inter), `app/page.js` (stub `<main>`), `package.json`, `app/globals.css` (strip old utilities)

**Interfaces:**
- Produces: `components/GradientASCII.jsx` default export with the props listed in the spec. Image paths `/avatar.webp` and `/projects/{aetherlens,kopi-kenangan,planty,uploaditin,outfitology,elitepizzamasterclass,ube,gedagedi}.webp`.

- [ ] **Step 1:** `git switch -c redesign`
- [ ] **Step 2:** Remove the deps in Global Constraints with `npm uninstall ...`, then delete the old components and data files listed above.
- [ ] **Step 3:** Convert images with ffmpeg. Avatar: `ffmpeg -i public/fotosplit.jpg -vf scale=256:256 -quality 82 public/avatar.webp`. Screenshots: `-vf "scale='min(1600,iw)':-2" -quality 80` into `public/projects/<slug>.webp`. Delete the sources.
- [ ] **Step 4:** Write `components/GradientASCII.jsx` verbatim.
- [ ] **Step 5:** Stub `app/page.js` to return `<main>Richie Lagito</main>`. Remove the deleted imports from `layout.js`.
- [ ] **Step 6:** Run `rtk npm run build`. Expected: build succeeds. `du -sh public` should be under 3 MB.
- [ ] **Step 7:** Commit: `chore: strip old portfolio, drop heavy deps, optimize images`

### Task 2: Data schema and project helpers

**Files:**
- Modify: `lib/data/projectData.json`, `lib/data/experiencesData.json` (drop `images`)
- Create: `lib/data/profile.json`, `lib/projects.mjs`, `lib/projects.test.mjs`
- Modify: `package.json` (add `"test": "node --test lib/"`)

**Interfaces:**
- Produces, in `lib/projects.mjs`, all pure and taking data as arguments:
  - `RESERVED_SLUGS: string[]`, set to `["work", "api", "_next", "projects", "videos", "avatar.webp", "sitemap.xml", "robots.txt", "favicon.ico", "opengraph-image.png"]`
  - `assertSlugs(projects, reserved = RESERVED_SLUGS): void`. Throws `Error` naming the slug when a slug is missing, isn't `/^[a-z0-9-]+$/`, is duplicated, or is reserved.
  - `buildRewrites(projects): {source: string, destination: string}[]`. Returns two entries per project with `demo`: `/<slug>` maps to `<demo>/<slug>`, and `/<slug>/:path*` maps to `<demo>/<slug>/:path*`. A trailing slash on `demo` is stripped.
  - `demoHref(project): string | null`. Returns `/<slug>` if `demo` is set, else `demoUrl`, else `null`.
  - `getFeatured(projects, max = 4): Project[]`. Returns the featured ones in data order, capped at `max`. If none are featured, it returns the first `max` projects.
  - `getProject(projects, slug): Project | undefined`
  - `getNextProject(projects, slug): Project`. Returns the next project in data order and wraps around.
- Project shape: `{ slug, title, description, year, role, status: "live"|"archived", featured, tech: string[], imageUrl?, githubUrl?, demo?, demoUrl?, problem?, whatIDid?: string[], result? }`
- Profile shape: `{ name, role, location, timezone, available, headline, bio, avatar, email, cvUrl: string|null, links: {label, href}[], stack: string[] }`

- [ ] **Step 1: Write the failing tests** in `lib/projects.test.mjs` using `node:test` and `node:assert/strict`:
  - `assertSlugs` throws on `[{slug:"work"}]`, on `[{slug:"a"},{slug:"a"}]`, on `[{slug:"Bad Slug"}]`, and on `[{}]`. It passes on `[{slug:"aether-lens"}]`.
  - `buildRewrites([{slug:"aether-lens", demo:"https://x.vercel.app/"}])` deep-equals `[{source:"/aether-lens", destination:"https://x.vercel.app/aether-lens"}, {source:"/aether-lens/:path*", destination:"https://x.vercel.app/aether-lens/:path*"}]`. A project without `demo` produces `[]`.
  - `demoHref`: `{slug:"a", demo:"https://x"}` gives `"/a"`, `{slug:"a", demoUrl:"https://y"}` gives `"https://y"`, and `{slug:"a"}` gives `null`.
  - `getFeatured`: 5 projects with 2 featured returns those 2. 6 projects with none featured returns the first 4. 6 projects all featured returns 4.
  - `getNextProject` on the last slug returns the first project.
  - The real data passes `assertSlugs`: read `lib/data/projectData.json` with `fs.readFileSync` and call `assertSlugs` on it.
- [ ] **Step 2:** Run `node --test lib/`. Expected: FAIL (module not found).
- [ ] **Step 3:** Implement `lib/projects.mjs`.
- [ ] **Step 4:** Migrate `projectData.json`. Add `slug` (kebab of the title), `year`, `role`, `status`, and `featured`: true for UploadItIn, Outfitology, Aether Lens, and Kopi Kenangan. Move `webUrl` to `demoUrl` (`null` becomes absent) and point `imageUrl` at `/projects/<slug>.webp`. Give UploadItIn sample `problem`/`whatIDid`/`result` text taken from `experiencesData.json`, so the detail sections have something to render. Leave the others without those fields. Write `profile.json` from the current site's copy and links. `stack` comes from the old `toolsData.json` names.
- [ ] **Step 5:** Run `rtk npm test`. Expected: all pass.
- [ ] **Step 6:** Commit: `feat: project data schema and pure helpers`

### Task 3: Design system, shell, and background (impeccable)

**Files:**
- Modify: `app/layout.js`, `app/globals.css`
- Create: `components/Background.jsx` (client, wraps GradientASCII), `components/Button.jsx`
- Create: `DESIGN.md` (if impeccable produces one)

**Interfaces:**
- Consumes: `GradientASCII` (Task 1).
- Produces:
  - `<Button href, variant: "primary"|"secondary", external?: boolean, children>`. Renders `<a>`, and external links get `target="_blank" rel="noopener noreferrer"`. It has the top-edge highlight.
  - The layout shell: `<body>` contains `<Background/>` and then a centered column wrapper that all pages render inside.
  - CSS tokens on `:root`, consumed by all later tasks.

- [ ] **Step 1:** Invoke the `impeccable` skill with the spec's style section and the approved mockup (`.superpowers/brainstorm/760-1792175211/content/layout-b-full.html`). Decide fonts (load via `next/font`, max 2 families: a sans and a mono), type scale, spacing, color tokens, the column max-width, and the button look.
- [ ] **Step 2:** Implement the tokens in `globals.css`, the fonts in `layout.js`, and `Button.jsx`.
- [ ] **Step 3:** Implement `Background.jsx`. One `GradientASCII` in a wrapper with classes `pointer-events-none absolute inset-x-0 top-0 h-[<head height>] lg:fixed lg:inset-0 lg:h-auto -z-10`, plus a mask or gradient so the head text stays legible. Use monochrome `colors`, `dpr` capped at 1.5, `mouseInteraction` left on, and `clickEffect="none"` so link clicks don't trigger waves.
- [ ] **Step 4:** Run `rtk npm run dev`. Check in the browser at 1366×768 (background covers the viewport and stays fixed on scroll) and at 375×812 (background only behind the head, scrolls away). Emulate reduced motion and confirm the ASCII is static. Delete the `<canvas>` via devtools and confirm the text is still readable.
- [ ] **Step 5:** Commit: `feat: design tokens, button, ASCII background shell`

### Task 4: Home page sections

**Files:**
- Modify: `app/page.js`
- Create: `components/Head.jsx`, `components/ProjectRow.jsx`, `components/ProjectPreview.jsx` (client: hover image on desktop), `components/Experience.jsx`, `components/Stack.jsx`

**Interfaces:**
- Consumes: `profile.json`, `projectData.json`, `experiencesData.json`, `getFeatured`, `Button`.
- Produces: `<ProjectRow project>` links to `/work/<slug>` and is reused by `/work` (Task 6).

- [ ] **Step 1:** Build `Head`: avatar (`next/image`, `priority`), name, role · location, an availability dot only when `available`, the `headline`, then buttons Email (primary, `mailto:`), CV (only when `cvUrl`), and one secondary button per `links` entry with GitHub and LinkedIn first.
- [ ] **Step 2:** Build `ProjectRow` (name, description, main tech, year) and `ProjectPreview`. From `lg` up, the image follows hover and only mounts `next/image` after the first hover. Below `lg`, a small thumbnail sits in the row with `loading="lazy"`.
- [ ] **Step 3:** Compose `app/page.js`: Head, "Selected Work" (`getFeatured`), "All projects (N) →" linking to `/work`, Experience, Stack. Apply impeccable's spacing and type. Use CSS transitions only.
- [ ] **Step 4:** Run `rtk npm run build`, then check in the browser. On 1366×768 and 375×812, the head, buttons, and the first Selected Work row are visible without scrolling. Temporarily set every `featured` to false and confirm 4 rows still show. Revert.
- [ ] **Step 5:** Commit: `feat: home page sections`

### Task 5: Footer with ASCII video

**Files:**
- Create: `public/videos/ascii.webm`, `public/videos/ascii.mp4`, `public/videos/ascii-poster.webp`
- Create: `components/FooterVideo.jsx` (client), `components/Footer.jsx`
- Modify: `app/layout.js` (render `<Footer/>` inside the column, after children)

**Interfaces:**
- Consumes: `profile.json`, `Button`.

- [ ] **Step 1:** Transcode from `C:\Users\Hoky Lagito\Downloads\ascii-animation (2).mp4`:
  - `ffmpeg -i <src> -vf scale=1280:-2 -an -c:v libvpx-vp9 -b:v 0 -crf 40 -row-mt 1 public/videos/ascii.webm`
  - `ffmpeg -i <src> -vf scale=1280:-2 -an -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -movflags +faststart public/videos/ascii.mp4`
  - `ffmpeg -ss 2.5 -i <src> -frames:v 1 -vf scale=1280:-2 -quality 75 public/videos/ascii-poster.webp`
  - Expected: `ls -la public/videos`. The webm and mp4 are each under about 1 MB. If either is over, raise the CRF by 4 and redo it.
- [ ] **Step 2:** Implement `FooterVideo`: `<video muted loop playsInline preload="none" poster=...>` with webm then mp4 `<source>`. An IntersectionObserver calls `play()` when intersecting and `pause()` when not. If `matchMedia('(prefers-reduced-motion: reduce)')` matches, it renders only the poster `<img>`. Decorative: `aria-hidden`.
- [ ] **Step 3:** Implement `Footer`: video, then tagline, then a "Get in touch" `Button` (mailto), the email as text, social links, "Jakarta, UTC+7" (from `profile.timezone`/`location`), and `© <current year> Richie Lagito`.
- [ ] **Step 4:** In the browser, use the network tab to confirm the video isn't requested on load and loads once the footer scrolls into view. With reduced motion emulated, only the poster loads.
- [ ] **Step 5:** Commit: `feat: footer with lazy ASCII video`

### Task 6: `/work` and `/work/[slug]`, SEO

**Files:**
- Create: `app/work/page.js`, `app/work/[slug]/page.js`
- Modify: `app/sitemap.js`, `app/layout.js` (metadata description to match `profile.headline`)

**Interfaces:**
- Consumes: `ProjectRow`, `Button`, `getProject`, `getNextProject`, `demoHref`.

- [ ] **Step 1:** `/work` lists every project with `ProjectRow`, under a back link to `/`. Metadata title is "Work".
- [ ] **Step 2:** `/work/[slug]`: `export const dynamicParams = false`, `generateStaticParams()` from the data, and `generateMetadata`. In Next 16, `params` is a Promise, so use `const { slug } = await params`. Layout per spec: back link, title, description, meta row (year · role · tech · status), Live demo (secondary, only when `demoHref` is non-null; external when it starts with `http`) and Code (only when `githubUrl`), image (only when `imageUrl`), then *Problem*, *What I did* (list), and *Result*, each only when present. Then a "Next: <title> →" link.
- [ ] **Step 3:** Update `sitemap.js` to include `/work` and each `/work/<slug>`.
- [ ] **Step 4:** Run `rtk npm run build`. Expected: the output lists 8 static `/work/[slug]` pages. Run `npm start`, then `curl -o /dev/null -w "%{http_code}" localhost:3000/work/does-not-exist`. Expected: `404`. Open the detail page for a project with no `demoUrl` and no case-study fields (for example Planty) and confirm there are no empty buttons or headings.
- [ ] **Step 5:** Commit: `feat: work index and project detail pages`

### Task 7: Sub-path rewrites and guide

**Files:**
- Modify: `next.config.mjs`
- Create: `docs/subpath-projects.md`

**Interfaces:**
- Consumes: `assertSlugs`, `buildRewrites` (Task 2).

- [ ] **Step 1:** In `next.config.mjs`, read `lib/data/projectData.json` with `fs.readFileSync`, call `assertSlugs(projects)` at config load (so a collision fails `next build`), and add `async rewrites() { return buildRewrites(projects); }`. Keep `reactCompiler: true`. Add `images: { formats: ["image/avif", "image/webp"] }`.
- [ ] **Step 2:** Verify the guard. Temporarily set a project slug to `work` and run `rtk npm run build`. Expected: the build fails with an error naming `work`. Revert.
- [ ] **Step 3:** Verify a rewrite. Temporarily add `"demo": "https://aether-lens-aerial.vercel.app"` to Aether Lens, run `npm run dev`, then `curl -sI localhost:3000/aether-lens`. Expected: the response comes from upstream (a Vercel `server`/`x-vercel-id` header; a 404 is fine since that project isn't adapted yet). Revert.
- [ ] **Step 4:** Write `docs/subpath-projects.md`. Cover the convention (the project must serve under `/<slug>`, and the rewrite keeps the prefix) and the setup per stack: Next.js `basePath: "/<slug>"`; static HTML (put the files in a `<slug>/` folder in the output); Vite `base: "/<slug>/"`; Angular `--base-href /<slug>/`; and Flask (`werkzeug.middleware.dispatcher.DispatcherMiddleware` or `SCRIPT_NAME=/<slug>`). Then explain how to add the JSON entry (`demo` origin, and remove `demoUrl`) and the reserved slugs.
- [ ] **Step 5:** Commit: `feat: JSON-driven sub-path rewrites with reserved-slug guard`

### Task 8: Measure and verify

**Files:** none (results go in the final report to Richie)

- [ ] **Step 1:** Run `rtk npm test` and `rtk npm run build`. Expected: both pass.
- [ ] **Step 2:** Run `npm start`, then `npx lighthouse http://localhost:3000 --preset=perf --form-factor=mobile --quiet --output=json` (or the Lighthouse panel). Run it twice: as shipped, and with `<Background/>` temporarily removed. Record Performance, LCP, TBT, and CLS for both, plus Accessibility, Best Practices, and SEO for the shipped run.
- [ ] **Step 3:** Run the Review Focus items 1–5 once more in the browser at 1366×768 and 375×812.
- [ ] **Step 4:** Report the numbers to Richie with a GradientASCII tuning recommendation if the on/off delta is large. Don't merge to `main` without his approval.
