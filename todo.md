# Portfolio Project TODO

## Phase 1 — Design System, Profile Data, Layout Shell
- [x] Design system: CSS custom properties (dark minimal tokens) in index.css
- [x] Profile data file: single source of truth for all content (profile.ts)
- [x] Layout shell: sticky navbar with active links + mobile hamburger + footer
- [x] Routing: all 7 pages wired in App.tsx (Home, About, Projects, ProjectDetail, Resume, Contact, Playground)
- [x] Motion/animation utilities: fadeUp, staggerContainer, Reveal component

## Phase 2 — Frontend Pages
- [x] Home / Hero page: animated intro, CTA buttons, focus tags
- [x] About page: bio paragraphs, skills grouped by category
- [x] Projects listing page: card grid, fetched from API, stagger animation
- [x] Project detail / case study page: full case study, gated by hasCaseStudy flag
- [x] Resume page: downloadable PDF link, skills, experience, education from profile data
- [x] Contact page: form with validation, POST to backend, success/error states, social links
- [x] AI Playground page: chat interface, conversation history, suggested questions

## Phase 3 — Backend
- [x] Database schema: projects table + messages table (Drizzle)
- [x] tRPC routes: projects.list, projects.bySlug, contact.submit, chat.send
- [x] Seed data: 5 sample projects (AI Travel Planner, BitTorrent Client, Distributed KV, LLM Eval, Dev Automation)
- [x] Rate limiting middleware on chat and contact endpoints
- [x] Security: helmet, CORS restricted to CLIENT_ORIGIN, JSON body limits, input validation

## Phase 4 — AI Chatbot
- [x] LLM integration: server-side only, context-stuffed with portfolio corpus
- [x] System prompt: role-locked, prompt-injection guard, portfolio context
- [x] Chat endpoint: accepts conversation history, returns assistant reply
- [x] Error handling: graceful fallback messages

## Phase 5 — SEO & Delivery
- [x] SEO: title tags, meta description, Open Graph, Twitter card in index.html
- [x] robots.txt in public/
- [x] og-image placeholder in public/
- [x] Semantic HTML and heading order on all pages
- [x] Vitest tests for backend routes (11 tests passing)
- [x] Checkpoint and delivery
