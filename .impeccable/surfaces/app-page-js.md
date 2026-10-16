---
version: 1
slug: "app-page-js"
primary_target: "app/page.js"
related_targets: ["app/work/page.js","app/work/[slug]/page.js"]
---

## Scope and mode

Routes `/`, `/work`, `/work/[slug]`, and the shared footer. Mode: Experience/Persuade hybrid. A recruiter must know who Richie is, see 3–4 shipped projects, open one demo, and find contact within 30 seconds.

## Audience and job

Recruiters and hiring managers screening fast. Secondary: developers, lecturers, and judges. The job is to judge whether Richie ships, then act: open a project, email him.

## Constraints

Pinned by Richie: dark monochrome; an editorial single centered column (approved mockup option B); GradientASCII background (fixed full-viewport at lg and up, behind the head only below lg); ASCII video in the footer; buttons with a lighter top-edge highlight; an understated demo CTA; detail page before demo. Lightweight: static, no loader, no scroll-jacking. Build path: code-led (no image generation on this machine).

## Direction contract

THESIS: A shipping log, not a showcase. A narrow, typeset column floats over a live ASCII field. Projects read as dated, status-marked entries, the way release notes prove work happened. It refuses the category default: a hero with a big claim over a grid of equal project cards.

OWN-WORLD: Near-black ground (#0a0a0a) and an ink ramp of #ededed, #a3a3a3, and #7a7a7a, with 1px hairlines at #1f1f1f to #262626. The ASCII field runs in greys to white. The column is a slab of slightly lifted black (#0c0c0c at 92%) with hairline side borders, so the field breathes only in the gutters and faintly behind the slab. Type: Schibsted Grotesk for everything read, Geist Mono only for data (years, status, stack, time) and the ASCII. Buttons are dark pills on #161616 with an inset 1px top highlight in white at 12%; the primary is inverted (#ededed on black) with a white top highlight. Rows are separated by hairlines, never cards.

STORY: The visitor sees a face, a name, and one plain sentence about shipping web apps end to end, with Email right there. Below, four dated entries carry status, so "live" is visible proof. They open one, read role, problem, and result, then try the demo. The footer's ASCII loop closes the page and hands them the email.

FIRST VIEWPORT: The centered column is 40rem wide on desktop, with gutters full of moving ASCII. Top bar: RL mark on the left, Work and Contact links on the right. The head has a 56px avatar beside the name and the line "role · location · open to work". Below that is the headline at about 2.25rem, Schibsted 500, set tight, with the bio in secondary ink. Then a button row: Email (primary), CV when one exists, GitHub, LinkedIn. The "Selected work" heading and the first two entries sit above the fold at 1366×768. On mobile, the ASCII sits behind the head only and fades to black under the buttons.

FORM: Pinned editorial column. In place of a seed, the authority is Richie's own pick from the layout mockups, quoted: "Aku pilih B" (option B, a single editorial column). Concept-seed was not run, because a user-pinned direction beats the roll. Seed key: none (user-pinned). Signature interaction: hovering an entry on desktop reveals its screenshot as a floating plate in the right gutter over the ASCII field, aligned to the row, with a clip-path reveal and expo-out timing. The pointer also scrambles the ASCII under it.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
