# Aquafarm Fisheries

A modern React + TypeScript single-page frontend for an aquaculture business. The app blends a public marketing site with an authenticated operations dashboard and a mock service layer ready to be wired to a real API.

## Highlights

- Multi-page marketing site: About, Our Farm, Store, Sport Fishing, Training, Community, Blog, Gallery, Careers, Contact
- Authenticated dashboard with KPIs, charts, stock tables, and activity feed
- Light/dark theme support with persistent preference
- English/Swahili language toggle
- Reusable UI component library and Tailwind-based styling
- Mock API service for forms, bookings, orders, newsletter, and careers

## Tech Stack

- React + TypeScript
- React Router
- Tailwind CSS v4 (see `styles/tailwind.css`)
- Lucide Icons
- Recharts (dashboard charts)

## Project Structure

```
.
├─ main.tsx                # App entry
├─ app/
│  ├─ App.tsx              # Providers + router
│  ├─ routes.ts            # Route definitions
│  ├─ pages/               # Feature pages
│  ├─ components/          # Layout + UI components
│  ├─ context/             # Auth, Theme, Language providers
│  └─ services/api.ts      # Mock API service
└─ styles/
   ├─ index.css            # Global styles + dark mode overrides
   ├─ tailwind.css         # Tailwind v4 entry
   └─ theme.css            # Theme tokens
```

## Getting Started

This repository contains the frontend source files only. To run the app, integrate it into your React + TypeScript toolchain (Vite, CRA, Next, etc.).

1. Create or reuse a React + TypeScript project.
2. Place `app/`, `styles/`, and `main.tsx` under your `src/` directory.
3. Install the dependencies referenced in the source (React, React Router, Tailwind CSS, Lucide, Recharts).
4. Ensure Tailwind CSS v4 is wired to load `styles/tailwind.css`.
5. Start your dev server using your toolchain scripts.

## Configuration

- **API**: Update `app/services/api.ts` to replace mock functions with real network calls. The `BASE_URL` placeholder shows the intended API root.
- **Auth**: Demo auth is mocked and stored in `localStorage` (`aquafarm-token`, `aquafarm-user`).
- **Theme**: Light/dark preference is stored in `localStorage` (`aquafarm-theme`).

## Demo Credentials (Mock)

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@aquafarm.co.ke` | `admin123` |
| Manager | `manager@aquafarm.co.ke` | `manager123` |

## Notes

- All data shown in the dashboard and storefront is mock data intended for UI demonstration.
- Replace placeholder images, copy, and API endpoints before production use.

## License

No license file is currently provided in this repository.
