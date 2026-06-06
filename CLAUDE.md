# AIGov Maturity — Project Source of Truth

## Working Style
- Keep conversations brief and to the point.
- Do not start working until told to.
- If anything is unclear, ask. If there are more than two questions, offer to interview for the answers.

## Project Purpose
AI Governance Maturity Assessment platform for aigov.co.nz.
Organisations complete a questionnaire and receive a maturity score across 5 governance domains.

## Repository Layout
```
C:\Claude Projects\aigov-website\          ← project root (working directory)
├── src\
│   ├── pages\          ← One file per page
│   ├── components\ui\  ← shadcn/ui components (pre-built, do not edit)
│   ├── App.tsx         ← Page router (switch on store.page)
│   ├── store.ts        ← All state (localStorage-backed hooks)
│   └── types.ts        ← All shared types + seed data
├── dist\               ← Production build output
├── bundle.html         ← Single-file artifact (Parcel bundle)
├── package.json
├── CLAUDE.md           ← This file
└── AIGov Maturity - Project Reference Guide.docx
```

## Tech Stack
| Tool | Version | Notes |
|------|---------|-------|
| React | 19 | |
| TypeScript | 6 | verbatimModuleSyntax enabled — use `import type` for all types |
| Vite | 8 | Build only (tsc removed from build script) |
| Tailwind CSS | 3.4.1 | pinned — do not upgrade to v4 |
| shadcn/ui | pre-installed | 40+ components in src/components/ui/ |
| pnpm | latest | package manager |
| Parcel | 2 | single-file bundling only |

## Key Commands
```powershell
# Dev server
cd "C:\Claude Projects\aigov-website\aigov-website"
pnpm dev

# Production build
pnpm build

# Bundle to single HTML artifact
bash scripts/bundle-artifact.sh   # run from aigov-website\ directory
```

## Pages
| Page key | File | Notes |
|----------|------|-------|
| `landing` | LandingPage.tsx | Marketing, pricing, maturity scale preview |
| `login` | LoginPage.tsx | Sign in + trial code redemption |
| `assessment` | AssessmentPage.tsx | Members-only multi-step questionnaire |
| `results` | ResultsPage.tsx | Maturity scores + export options |
| `admin` | AdminPage.tsx | Question/category/tier management (admin only) |
| `privacy` | PrivacyPage.tsx | NZ Privacy Act 2020 policy |

Navigation is a simple `store.page` string — no router library.

## State & Data (store.ts)
All state lives in `useAppStore()` via localStorage. Keys:
- `aigov_user` — current logged-in user (null = logged out)
- `aigov_questions` — question array (seeded from types.ts)
- `aigov_categories` — category array (seeded from types.ts)
- `aigov_tier_configs` — per-tier result options config
- `aigov_results` — completed assessment results
- `aigov_page` — current page string

**To reset all data:** clear localStorage in browser DevTools.

## Assessment Scoring
- Each question option has a score 0–4
- Category score = sum of answer scores / max possible × 100
- Overall maturity = average of category percentages
- Maturity levels: Initial <20%, Developing <40%, Defined <60%, Managed <80%, Optimising ≥80%

## Question Categories (seed data in types.ts)
1. Governance Structure (blue #2563eb)
2. Risk Management (red #dc2626)
3. Transparency & Explainability (green #16a34a)
4. Data Governance (yellow #ca8a04)
5. Ethics & Fairness (purple #7c3aed)

## Membership Tiers & Result Options
Configured in Admin Panel → Membership Tiers tab. Defaults:

| Tier | Screen | PDF | Email |
|------|--------|-----|-------|
| free_trial | ✓ | — | — |
| basic | ✓ | ✓ | — |
| professional | ✓ | ✓ | ✓ |
| enterprise | ✓ | ✓ | ✓ |
| admin | ✓ | ✓ | ✓ |

## Demo Accounts (all password: demo123)
- `admin@aigov.com` — admin tier (admin panel access)
- `pro@example.com` — professional tier
- `basic@example.com` — basic tier

## Trial Codes
`TRIAL2024` · `GOVPILOT` · `FREESTARTER`

## TypeScript Rules
- Always use `import type` for type-only imports (verbatimModuleSyntax)
- `tsc` is NOT run in the build — Vite strips types directly
- shadcn components (calendar.tsx, resizable.tsx) have known type errors — do not fix them

## Known Issues / Decisions
- `tsc -b` removed from build script: pre-built shadcn calendar.tsx and resizable.tsx have type errors against current package versions. Not worth fixing as these components are unused.
- `ignoreDeprecations: "6.0"` in tsconfig.app.json: TypeScript 6 deprecates `baseUrl` as a standalone option.
- Vite dev server takes ~30–60s on first load to pre-bundle all Radix UI dependencies. Use `pnpm preview` after `pnpm build` for instant load.

## Pending Work
- [ ] Import user's drafted questions into types.ts seed data
- [ ] Fetch and replace privacy policy from aigov.co.nz/wp/privacy-policy/
- [ ] Add Terms & Conditions page (source: aigov.co.nz/wp/terms-and-conditions/)
- [ ] Integrate HTML results page design (spider chart, previous comparison, benchmark toggles)
- [ ] Set up GitHub repo (name: aigov-nz) + GitHub Pages deployment
- [ ] Point aigov.co.nz domain to GitHub Pages (DNS CNAME + custom domain config)
- [ ] Aesthetic refinement pass (reference: start.aigov.co.nz Gamma version)
- [ ] Conditional logic in question builder (planned feature)
- [ ] "Compare vs previous result" (premium feature, planned)
- [ ] Industry benchmark comparison (future feature)
- [ ] Real email delivery for "Email results" option
- [ ] Real payment/membership backend (currently all demo data)

## Reference URLs
| Purpose | URL |
|---------|-----|
| Old WordPress site (not liked) | https://aigov.co.nz/wp/assessment/ |
| Gamma version (aesthetic reference) | https://start.aigov.co.nz/ |
| Privacy policy source | https://aigov.co.nz/wp/privacy-policy/ |
| Terms & Conditions source | https://aigov.co.nz/wp/terms-and-conditions/ |

## Results Page (HTML prototype)
Located in conversation history. Key features to integrate:
- URL param scoring: `?governance=2&risk=3...` (0–4 scale → converted to %)
- Live vs demo mode badge
- Progress bar cards per category, colour-coded by level (1–5)
- Spider/radar chart toggle (Chart.js)
- Compare vs previous result (premium stub)
- Industry benchmark overlay (coming-soon stub)
- Key insights section, priority-ordered worst → best
- Maturity level legend

## Contact / Ownership
Email: kids@crave.co.nz
