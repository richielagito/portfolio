# Portfolio Redesign — Design

Date: 2026-10-17
Owner: Richie Lagito
Repo: `richielagito/portfolio` (Next.js 16, Tailwind 4, React 19, deployed on Vercel at `www.richielagito.com`)

## Intent

The current portfolio is heavy and slow to reach its content: a loading screen, a full-screen scroll-driven "scrollytelling" intro, Lenis smooth scrolling, an always-running WebGL particle background, `motion` animations on nearly every element, and about 14 MB of unoptimized images (for example `kopi-kenangan.png` is 4.6 MB).

The people who open it are recruiters and hiring managers screening many candidates, plus other developers and lecturers or competition judges. All of them are short on time. Within about 30 seconds they should:

1. Understand who Richie is and what field he works in.
2. See a few featured projects, not a long list.
3. Try one demo or open one link.
4. Know how to get in touch.

The feeling to leave behind: *"This person ships projects to completion, and I want to see more."*

The redesign is a total rebuild: minimal, monochrome, lightweight ("ringan" means light in weight, not a light colour theme), and still visually interesting. The theme is **dark**, as in the current site and the approved mockup: near-black background with light text. Performance and design quality are the two priorities.

## Goals

- One home page that reads top to bottom with no intro gate. Identity and contact are visible without scrolling.
- Featured projects selected by a flag in JSON, so Richie can swap them by editing data by hand.
- A detail page per project. Clicking a project name opens the detail page first, not the demo.
- A foundation for hosting each project's demo on the same domain under a sub-path (`www.richielagito.com/<slug>/...`), while each project stays in its own repo and deployment.
- Background: the React Bits `GradientASCII` component (source provided by Richie, see "Background" below).
- Footer: Richie's ASCII animation video (`C:\Users\Hoky Lagito\Downloads\ascii-animation (2).mp4`), placed the way zickrian.dev places its footer animation.
- Button style: a subtle lighter border along the top edge (an inset top highlight), as in the reference screenshot Richie supplied.

## Non-goals

- No blog, gallery, chat, or settings pages.
- No CMS. Content lives in JSON files edited by hand.
- No migration of the sub-projects themselves in this work. This repo provides the routing and a written guide. Adapting each sub-project to its sub-path happens in that project's own repo, later.
- No real project content. Current project data is old, and Richie will replace it. Existing data is used as placeholder.

## Anti-goals (failure even if it "works")

- An intro, loader, or animation the visitor has to wait through or scroll past before seeing content.
- The project list turning into a long catalog on the home page.
- The demo call-to-action shouting. Richie wants it present but understated ("secukupnya").
- A Twitter/Threads clone. zickrian.dev is a reference only. Richie chose the editorial single-column layout ("Option B"), not the social-feed layout.
- Visual noise that fights readability: text over the ASCII background must stay clearly legible.

## Reference

- https://www.zickrian.dev/ : single centered column, profile at the top, sections stacked, ASCII animation in the footer above a tagline and a "Get in touch" CTA. Use it for spirit and centered-column placement only.
- Approved mockup: `.superpowers/brainstorm/760-1792175211/content/layout-b-full.html`. Structure is approved. Visual details are not final and are decided through the impeccable skill.

## Decided by Richie

### Layout (Option B, editorial single column)

- On desktop, the content column is **centered** horizontally, as on zickrian.dev.
- Section order on the home page (`/`):
  1. **Head**: avatar, name, role, location, availability status, one large positioning sentence, then buttons: Email (the primary, brightest one), CV, GitHub, LinkedIn. The head has a transparent background.
  2. **Selected Work**: the projects flagged `featured` (about 4), each one row with name, short description, main stack, and year. On desktop, a preview image appears when a row is hovered. On mobile, a small thumbnail sits in the row instead. Below the rows is a quiet "All projects (N) →" link to `/work`.
  3. **Experience**: compact rows with role, organization, and year range.
  4. **Stack**: one line of plain text. No colored brand icons.
  5. **Contact / footer**: see Footer.
- Removed entirely: loading screen, scrollytelling, Lenis smooth scroll, particle background, personal photo gallery (food, badminton), GitHub contribution calendar, FlipWords.

### Background

- Use `GradientASCII` exactly as supplied (JavaScript + Tailwind variant, WebGL2). Richie pasted its full source in the design conversation. The builder copies it verbatim into `components/GradientASCII.jsx` as the first build step. It has no dependencies beyond React and uses props such as `colors`, `shape`, `characters`, `cellSize`, `density`, `speed`, `glow`, `grain`, `mouseInteraction`, `intro`, and `dpr`. It already pauses when off-screen or when the tab is hidden, and it respects `prefers-reduced-motion`.
- **Desktop**: fixed, full-viewport background behind the whole page.
- **Mobile**: the background sits only behind the head area and scrolls away with it.
- Colors must be monochrome (greys and white), not the blue defaults.
- It stays in even though it's the heaviest piece. Its performance impact gets measured after the build, and tuning happens then.

### Project detail page — `/work/[slug]`

- Clicking a project anywhere (home rows, `/work` rows) opens its detail page.
- Contents, top to bottom: back link, project name, one-line description, meta row (year, Richie's role, stack, status such as live or archived), buttons for **Live demo** and **Code** (understated, but the first actionable things on the page), main image, then optional sections *Problem*, *What I did*, *Result*. Sections with no data are not rendered. At the bottom: a link to the next project, then the footer.
- Statically generated at build time (`generateStaticParams`). No client-side data fetching.

### All projects — `/work`

- Lists every project in the same row style as Selected Work.

### Sub-path demo routing

- Each project keeps its own repo and deployment.
- The portfolio proxies `www.richielagito.com/<slug>` and `/<slug>/:path*` to that project's deployment via rewrites, so the browser URL stays on Richie's domain.
- Rewrites are **generated from the project JSON** in `next.config.mjs`. One source of truth: adding a project with a `demo` origin automatically adds its rewrite.
- Reserved slugs (at least `work`, `api`, `_next`, plus any other top-level route or public file this site uses) must not be usable as project slugs. The build fails loudly on a collision.
- Projects not yet adapted to a sub-path can use a plain external `demoUrl` instead. The Live demo button then links out.
- Deliver a short guide, `docs/subpath-projects.md`, explaining how to prepare a sub-project to live under `/<slug>`: Next.js `basePath`, static HTML (relative asset paths or a `<base>`), Vite/Angular base-href equivalents, and the Flask equivalent (`SCRIPT_NAME` / prefix middleware). It should also cover how to add the entry to JSON.

### Footer

- Richie's ASCII animation video at the top of the footer, then a tagline, a "Get in touch" button, email, and social links, then a copyright line. Time zone appears as static text ("Jakarta, UTC+7"), with no live clock.
- The source video is 2560×1424, 5 s, 30 fps, h264, 6.7 MB, which is too heavy. Transcode to roughly 1280 px wide in WebM (VP9 or AV1) plus an MP4 (h264) fallback, and extract a WebP poster. Target total under about 1 MB. `ffmpeg` is installed on Richie's machine.
- The video must be muted, looped, `playsinline`, and must not preload. Play it only while it's in the viewport. Under `prefers-reduced-motion`, show the poster only.

### Data

- Content is hand-edited JSON in `lib/data/`. The project schema gains at least `slug`, `featured`, `year`, `role`, `status`, `demo` (sub-path origin) or `demoUrl` (external), and optional `problem`, `whatIDid`, `result`. Keep existing fields that remain useful (`title`, `description`, `imageUrl`, `githubUrl`, `tech`).
- Existing 8 projects and 3 experiences are carried over as placeholder data.

### Style

- Monochrome. Fonts, type scale, spacing, color tokens, motion, and component styling are decided by applying the **impeccable** skill during implementation. Richie delegated font choice ("use whatever fits").
- Buttons have the lighter top-edge highlight, as in the reference.

## Calls made by Claude (Richie can override)

- **Site language**: English, as today.
- **Dark only.** No light theme and no theme toggle. Monochrome dark matches the ASCII background and the footer video.
- **Rewrites keep the prefix.** `/<slug>/:path*` forwards to `<demo origin>/<slug>/:path*`. Every sub-project is expected to serve itself under `/<slug>`: `basePath` for Next.js, files placed in a `<slug>/` folder or an equivalent base setting for static/Vite/Angular builds, and prefix middleware for Flask. One convention, no per-project flag. The guide documents exactly this.
- **Avatar**: `profile.json` has an `avatar` path pointing to Richie's portrait, `public/fotosplit.jpg` (720×720, dark backdrop). Keep this file when cleaning `public/`. Rename it to `avatar.jpg` or convert it to a small WebP.
- **Mobile/desktop breakpoint for the background switch**: `lg` (1024 px). Below that, the background sits behind the head only. Reason: tablets in portrait read like phones in a single column.
- **One `GradientASCII` instance**, positioned by responsive CSS (`absolute` head-height box on mobile, `fixed inset-0` from `lg` up). The component's own ResizeObserver and IntersectionObserver handle the switch and pause it when the head scrolls off on mobile. No second instance and no JS media-query branching.
- **Preview-on-hover** images use `next/image`, loaded lazily on first hover or row visibility. They're not preloaded with the page.
- **Profile data** (name, role, bio sentence, links, email, CV URL, availability flag) lives in `lib/data/profile.json`. The CV button is hidden when no CV URL is set. There's no CV file in the repo today.
- **Availability status** ("open to work") is driven by a boolean in profile JSON.
- **Dependencies to remove** once unused: `@react-three/drei`, `@react-three/fiber`, `three`, `ogl`, `gsap`, `lenis`, `react-github-calendar`, all four `@fortawesome/*` packages, and `motion` unless impeccable's motion work truly needs it (prefer CSS). Keep `lucide-react` for the few icons needed, or inline SVG. Keep `@vercel/analytics` and `@vercel/speed-insights`.
- **Images**: `next/image` everywhere, with AVIF/WebP output. Delete unused files from `public/` (food and badminton photos, default Next/Vercel SVGs, and any others no longer referenced). Large project screenshots can be pre-shrunk if `next/image` alone isn't enough.
- **SEO**: keep the existing metadata, sitemap, and robots. Add `/work` and each `/work/[slug]` to the sitemap. Update the description away from "Creative Developer" to match the new positioning sentence.
- `.superpowers/` is added to `.gitignore`.

## Left to the builder

- Component breakdown and file structure inside `app/`, `components/`, `lib/`.
- Exact `GradientASCII` props (cell size, density, speed, glow, DPR cap) for a good first look. Tuning after measurement comes later.
- Exact JSON field names beyond those listed, as long as hand-editing stays obvious.
- Whether the `/work` page and the home Selected Work share one row component (they should look the same).
- The exact ffmpeg settings, within the size target.

## Success check

- Home page shows identity, primary buttons, and the start of Selected Work above the fold on a 1366×768 laptop and on a 375×812 phone.
- No loader. Content is server-rendered HTML and readable before any JS or WebGL runs.
- Lighthouse (mobile) Performance, Accessibility, Best Practices, and SEO run and are recorded, with the GradientASCII cost measured on and off, so Richie can decide on tuning.
- `next build` passes. Every project gets a static `/work/<slug>` page. A reserved-slug collision fails the build.
- A project entry with a `demo` origin produces a working rewrite. Verify in the build output or against a deployed preview.
