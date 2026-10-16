# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** recruiters and hiring managers screening many candidates. They're short on time and usually give the site under a minute.
- **Secondary:** other developers, lecturers, and competition judges who evaluate Richie's work.

## Product Purpose

Richie Lagito's personal portfolio. Within about 30 seconds a visitor should:

1. Understand who Richie is and what field he works in (fullstack web).
2. See 3–4 featured projects, not a long catalog.
3. Try one demo or open one link.
4. Know how to get in touch.

Success is the visitor thinking: "This person ships projects to completion, and I want to see more."

## Positioning

Richie is a fullstack developer and IT student at Universitas Tarumanagara who ships working software. His evidence is a fullstack internship at PUSDATIN UNTAR, leading teams as Scrum Master and Project Lead, and live demos hosted on his own domain.

## Operating Context

- Visitors arrive from CVs, LinkedIn, applications, and competition submissions, on laptops and phones.
- Each project demo lives in its own repo and deployment and is proxied under `www.richielagito.com/<slug>`.
- Richie maintains all content by hand in JSON (`lib/data/`).

## Capabilities and Constraints

- Pages: home (`/`), all projects (`/work`), and a project detail page (`/work/[slug]`). Clicking a project opens its detail page first, not the demo.
- Next.js 16 + Tailwind 4 on Vercel. Static rendering and no client-side data fetching.
- Lightweight is a hard requirement: no loaders, no scroll-jacking, and minimal JS.
- Site copy is in English.
- **Open:** project data is old placeholder content. Richie will replace it with newer projects.

## Brand Commitments

- Name: Richie Lagito. Logo mark: `public/logoRL.svg`. Portrait: `public/avatar.webp`.
- Binding visual constraints Richie set: dark monochrome theme; an editorial single centered column; the React Bits GradientASCII background (full-viewport on desktop, head-only on mobile); an ASCII animation video in the footer; buttons with a lighter top-edge highlight.

## Evidence on Hand

- 8 projects with screenshots (`public/projects/*.webp`). 4 have live demos.
- 3 experience entries (`lib/data/experiencesData.json`).
- No testimonials, metrics, or awards exist yet. Don't fabricate any. The only quantitative claim on record is "2–3× faster delivery" from the UploadItIn team.

## Product Principles

1. Readable before anything moves: content first, effects second.
2. Few projects, each with proof that it shipped.
3. Contact is never more than one glance away.
4. The demo invitation is present but understated.
