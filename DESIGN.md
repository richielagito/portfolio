---
name: Richie Lagito
description: A shipping log set in one dark editorial column over a live ASCII field.
colors:
  bg: "#0a0a0a"
  slab: "rgb(12 12 12 / 0.92)"
  ink: "#ededed"
  ink-2: "#a3a3a3"
  ink-3: "#7a7a7a"
  line: "#1f1f1f"
  line-2: "#2a2a2a"
  btn: "#161616"
  btn-hover: "#1e1e1e"
  btn-primary: "#e8e8e8"
  btn-primary-hover: "#ffffff"
typography:
  display:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 2.4vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.5rem + 1.8vw, 2.5rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  headline-close:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.625rem, 1.2rem + 1.6vw, 2.125rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
  lead:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    fontFeature: "\"ss01\", \"cv11\""
  small:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
  data:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    fontFeature: "\"tnum\""
rounded:
  thumb: "6px"
  row: "8px"
  plate: "10px"
  btn: "12px"
  media: "12px"
  full: "9999px"
spacing:
  gutter-sm: "20px"
  gutter: "32px"
  column: "40rem"
  button-gap: "8px"
  row-y: "16px"
  section: "56px"
  section-sm: "64px"
components:
  button-secondary:
    backgroundColor: "{colors.btn}"
    textColor: "{colors.ink}"
    rounded: "{rounded.btn}"
    padding: "0 14px"
    height: "36px"
    typography: "{typography.small}"
  button-secondary-hover:
    backgroundColor: "{colors.btn-hover}"
  button-primary:
    backgroundColor: "{colors.btn-primary}"
    textColor: "{colors.bg}"
    rounded: "{rounded.btn}"
    padding: "0 14px"
    height: "36px"
    typography: "{typography.small}"
  button-primary-hover:
    backgroundColor: "{colors.btn-primary-hover}"
  nav-link:
    textColor: "{colors.ink-2}"
    typography: "{typography.small}"
  nav-link-hover:
    textColor: "{colors.ink}"
  project-row:
    rounded: "{rounded.row}"
    padding: "16px 12px"
  project-thumb:
    rounded: "{rounded.thumb}"
    width: "72px"
    height: "48px"
  section-heading:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
---

# Design System: Richie Lagito

## Overview

**Creative North Star: "The Shipping Log"**

The site reads like release notes, not a showcase. A single typeset column, 40rem wide, floats over a live field of grey ASCII glyphs. Projects are dated, status-marked entries separated by hairlines. The palette is monochrome: near-black ground, a three-step ink ramp, and white used only at full strength for the primary action and the "live" mark.

Density is calm and editorial. Each page has one large, tightly tracked headline. The rest is small, quiet type in secondary ink. Proof is carried by data set in Geist Mono (years, status, stack, dates), never by decoration. Movement belongs to the background: the ASCII field behind the column, and the ASCII video that closes every page above the contact block. Content stays still and readable on top.

The world rejects the category default: no big-claim hero over a grid of equal project cards, no colour accent, no cards.

**Key Characteristics:**
- One centered 40rem column. From 1024px up it becomes a slab of lifted black with hairline side borders.
- A live GradientASCII field, full-viewport from 1024px up, behind the head only on smaller screens.
- Monochrome ink ramp. White is reserved for the primary button and the live dot.
- Hairline-separated rows, never cards.
- Mono for data only.
- Buttons with a lit top edge.

## Colors

A strictly achromatic palette. Hierarchy comes from lightness steps, not hue.

### Primary
- **Signal White** (`btn-primary`, with `btn-primary-hover` on hover): the fill of the one primary button per block ("Email me", "Get in touch"). Its text is the page black. On hover it goes to pure white.

### Neutral
- **Night Ground** (`bg`): the page and viewport background, the theme colour, and the text on inverted surfaces (the primary button and text selection).
- **Lifted Slab** (`slab`): the column surface from 1024px up. It is translucent, so the ASCII field shows faintly through it.
- **Bright Ink** (`ink`): headings, titles, emphasized values, the live dot, the focus ring, and the selection background.
- **Quiet Ink** (`ink-2`): bios, descriptions, body copy in detail blocks, and nav and inline links at rest.
- **Faint Ink** (`ink-3`): mono data (years, stack, dates), meta labels, list markers, and the copyright row.
- **Hairline** (`line`): row dividers, the column side borders, and rules around the detail meta list and the next-project link.
- **Hairline Strong** (`line-2`): rings around the avatar and screenshots, the underline on the email link, and the scrollbar thumb.
- **Button Black** (`btn`, with `btn-hover` on hover): the fill of secondary buttons.
- Hover washes are white overlays, not tokens: 2.5% on project rows and 5% on footer icon links.

### Named Rules
**The No-Hue Rule.** Every colour on the site is grey. Hierarchy is lightness only. The only colour anywhere is inside project screenshots.

**The White Is Earned Rule.** Full-strength white appears only on the primary button, the live status dot, and text selection. Everything else stays at or below `ink`.

## Typography

**Display Font:** Schibsted Grotesk (with ui-sans-serif, system-ui)
**Label/Mono Font:** Geist Mono (with ui-monospace, SFMono-Regular, Menlo)

**Character:** Schibsted is a slightly editorial grotesk, set tight at large sizes and plain at reading sizes, with stylistic sets `ss01` and `cv11` on. Geist Mono is the machine voice that stamps the record: years, status, stack, and the ASCII glyphs.

### Hierarchy
- **Display** (500, `clamp(2rem, 1.4rem + 2.4vw, 2.75rem)`, 1.04, -0.035em): the page title on Work and on project detail pages.
- **Headline** (500, `clamp(2rem, 1.5rem + 1.8vw, 2.5rem)`, 1.04, -0.035em, max 20ch): the home headline, one sentence.
- **Headline Close** (500, `clamp(1.625rem, 1.2rem + 1.6vw, 2.125rem)`, 1.1, -0.03em, max 20ch): the footer's contact prompt.
- **Name** (600, 1.0625rem, 1.25): the name beside the avatar.
- **Title** (600, 0.9375rem): section headings ("Selected work", "Experience", "Stack") and detail block headings ("Problem", "What I did", "Result"). They are plain sentence case in `ink`.
- **Entry** (500, 1rem): project titles, experience roles, and the next project's name.
- **Lead** (400, 1.0625rem, 1.625, max 52ch): the bio and the project description under a title, in `ink-2`.
- **Body / Small** (400, 1rem or 0.875rem, 1.625): detail prose, row descriptions, links, and meta labels.
- **Data** (Geist Mono 400, 0.75rem, tabular numerals): years, status, stack lists, and experience dates. In the detail meta list, values are mono at 0.875rem, except Role, which is prose.

### Named Rules
**The Mono Is Data Rule.** Geist Mono is used only for values a log would stamp (year, status, stack, date) and for the ASCII field. Labels, headings, and prose are always Schibsted.

**The One Big Line Rule.** Each page has exactly one display- or headline-size sentence at the top, plus the footer's closing prompt. Everything between them is title size or smaller.

## Layout

- **Column:** one centered column, at most 40rem wide, with a 20px gutter (32px from 640px up). Every page and the footer live inside it.
- **From 1024px up:** the column becomes the `slab` surface with 1px `line` borders on the left and right, and the ASCII field fills the viewport behind it. Below 1024px the field covers only the top 34rem at 60% opacity, masked to black by 95%, so it sits behind the head.
- **Top bar:** 64px tall, with the RL mark (28px) on the left and Work and Contact on the right.
- **Rhythm:** page tops have 32px of padding (48px from 640px up). Headline to bio is 16px, and bio to buttons is 32px. Sections start 56px apart (64px from 640px up), and a heading sits 8px above its list. Detail blocks are 48px apart. The footer starts 64px below the content (80px from 640px up).
- **Rows:** 16px vertical padding for project rows, 14px for experience rows, and 10px for the detail meta list.
- **Button rows:** wrap, with an 8px gap.
- **Breakpoints:**
  - 640px: wider gutter and top spacing.
  - 1024px: slab and full-viewport ASCII.
  - 1280px: project thumbnails leave the row and become a floating plate in the right gutter.

## Elevation & Depth

The system is flat and works by tonal layering. Depth is the slab over the ASCII field, plus 1px rings around raster images. The only shadows belong to buttons. They are physical controls with a lit top edge, an inset 1px highlight, and a 1px outer hairline ring:
- Secondary buttons use a highlight at 12% white (20% on hover).
- The primary button uses a solid white highlight.
- On press, the highlight dims and the drop shadow goes away.

### Shadow Vocabulary
- **Button rest** (`inset 0 1px 0 rgb(255 255 255 / 0.12), 0 0 0 1px rgb(255 255 255 / 0.06), 0 1px 2px rgb(0 0 0 / 0.6)`): secondary buttons.
- **Button primary** (`inset 0 1px 0 #ffffff, 0 0 0 1px rgb(255 255 255 / 0.3), 0 1px 2px rgb(0 0 0 / 0.6)`): the primary button.
- **Button pressed** (`inset 0 1px 0 rgb(255 255 255 / 0.06), 0 0 0 1px rgb(255 255 255 / 0.08)`): the active state of any button.

### Named Rules
**The Lit Edge Rule.** Only buttons carry shadow, and it reads as light catching a top edge, never as an object lifting off the page. Rows, images, and the column itself stay flat.

## Shapes

Corners are soft and graded by size:
- 6px: inline thumbnails, and the focus ring.
- 8px: the row hover wash and footer icon links.
- 10px: the gutter plate.
- 12px: buttons and the detail screenshot.
- Full circle: the avatar and status dots, which are 6px dots.

Screenshots always keep an 8:5 frame with a 1px `line-2` ring and are cropped from the top. Hairlines are always 1px and run the full width of the column. There are no decorative shapes.

## Components

### Buttons
Tactile and quiet. Most of the time they look like dark keys, and one of them is lit.
- **Shape:** gently rounded (12px). They are 36px tall with 14px of horizontal padding, an 8px gap to a 16px Lucide icon, and 14px weight-500 text that does not wrap.
- **Primary:** `btn-primary` fill with `bg` text and the solid white top highlight. There is one per cluster ("Email me", "Get in touch").
- **Secondary:** `btn` fill with `ink` text. Used for GitHub, LinkedIn, CV, Live demo, and Code.
- **Hover / Focus:**
  - Hover: the fill and the highlight each step up over 200ms on the expo-out curve `cubic-bezier(0.16, 1, 0.3, 1)`.
  - Focus: a 2px `ink` outline at a 3px offset with a 6px radius. This is the global focus style.
- **Demo CTA:** a secondary button with a trailing up-right arrow. It sits on the detail page, never on the list rows.

### Project Row (signature)
A log entry: a list item with a `line` rule above it (none on the first), and the whole entry is one link.
- **Content:** the title (500 weight), with the year on the right in mono `ink-3`. Under it, a description in small `ink-2`. Under that, a mono line: status, a `/` separator, then the stack.
- **Live status:** "live" is shown in `ink` with a 6px solid dot. Any other status is plain `ink-3` text.
- **Thumbnail:** below 1280px, a 72x48 screenshot sits inline on the left.
- **Hover / Focus:** a 2.5% white wash with 8px corners that bleeds 12px past the column edges, over 200ms.
- **Gutter plate (from 1280px):** the thumbnail leaves the row. Hovering or focusing the row reveals a 288px screenshot, 48px out into the right gutter and centered on the row. It unclips top to bottom over 500ms on expo-out and fades in. It is instant under reduced motion.

### Lists and Meta
- **Experience rows:** role (500) and company (`ink-2`) on the left, and the date in mono `ink-3` on the right, with hairlines between rows.
- **Detail meta:** a definition list with hairline rules above and below every row. Labels are small `ink-3`, and values are right-aligned in `ink`.
- **Next project:** a full-width link between top and bottom hairlines. "Next project" is in `ink-3`, and the title has an arrow that moves 4px to the right over 300ms on hover.

### Navigation
- **Style:** the RL logo mark is the home link. Work and Contact are small `ink-2` text links that turn `ink` on hover. There is no active state, no underline, and no menu: the same bar is used at every width.
- **Back and aside links:** a small `ink-2` link with a 14px Lucide arrow ("Home", "All work", "All projects (8)").

### Footer
- **Order:** the ASCII video loop first, bleeding past the column gutters at a 1280/712 ratio and fading in from transparent at the top. Then the closing headline, a timezone line, and the primary button beside the email address.
- **Email link:** underlined in `line-2`. On hover, the text goes to `ink` and the underline to `ink-3`.
- **Bottom row:** a hairline-topped row with the copyright in `ink-3` and 36px icon-only social links, each with an aria-label and a 5% white hover wash.
- **Video loading:** nothing loads until the footer is within 300px of the viewport. The loop plays only while it is on screen, and reduced motion gets the still poster.

## Do's and Don'ts

### Do:
- **Do** keep every surface inside the single 40rem column. From 1024px up it sits on the `slab` with `line` side borders.
- **Do** separate entries with 1px `line` hairlines and mark live work with the 6px `ink` dot and the word "live" in mono.
- **Do** set years, status, stack, and dates in Geist Mono at 0.75rem with tabular numerals, in `ink-3`.
- **Do** frame every screenshot at 8:5, cropped from the top, with a 1px `line-2` ring.
- **Do** use Lucide icons at 16px beside a text label. Icon-only controls are allowed only with an aria-label, as in the footer social links.
- **Do** honour reduced motion: remove transitions and transforms, and swap the footer loop for its poster.

### Don't:
- **Don't** introduce a hue. The palette is grey-only, and colour belongs only to the work shown in screenshots.
- **Don't** put projects in cards or grids. Entries are hairline-separated rows.
- **Don't** add shadows to anything but buttons, and on buttons keep to the lit-top-edge vocabulary.
- **Don't** set headings, labels, or prose in mono.
- **Don't** put the demo link on a list row. A row opens the detail page, and the demo lives there.
- **Don't** add loaders, scroll-jacking, or entrance animations to content. Motion belongs to the ASCII field, the footer loop, and hover feedback.
