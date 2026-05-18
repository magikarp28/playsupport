# PlaySupport — Miniature Painting & 3D Print Business Website

**Live site → [playsupport.art](https://playsupport.art)**

A production business website for my miniature painting and resin 3D print pre-support service. Built as a full-stack Next.js application with a focus on performance, SEO, and a polished user experience.

---

## Tech Stack

| Layer      | Technology                        |
| ---------- | --------------------------------- |
| Framework  | Next.js 16 (App Router)           |
| Language   | TypeScript                        |
| Styling    | Tailwind CSS                      |
| Animations | Motion (Framer Motion)            |
| CMS        | DatoCMS (GraphQL)                 |
| i18n       | next-intl (EN / DE)               |
| Email      | Resend + React Email              |
| Analytics  | Vercel Analytics & Speed Insights |
| Deployment | Vercel                            |

---

## Features

- **Internationalisation** — full English and German translations, locale-aware routing (`/de/...`)
- **CMS-driven gallery** — images and content fetched from DatoCMS via GraphQL
- **Contact form** — server action with input validation, spam protection, Resend
- **Animations** — smooth page transitions, an interactive 3D card, animated hero vortex, and infinite scrolling testimonials

---

## Pages

| Route         | Description                                                                     |
| ------------- | ------------------------------------------------------------------------------- |
| `/`           | Hero, mini gallery, painting preview, supporting preview, testimonials, contact |
| `/painting`   | Commission tiers, painting process walkthrough                                  |
| `/gallery`    | Full lightbox gallery (DatoCMS)                                                 |
| `/supporting` | Pre-support service info and pricing                                            |
| `/contact`    | Contact form with server-side email dispatch                                    |
