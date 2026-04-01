# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Production build
npm run lint         # ESLint
npm run db:generate  # Generate Drizzle migration files from schema changes
npm run db:push      # Apply schema changes to the database
```

## Architecture

This is a bilingual (English/Welsh) PTA event ticketing app built with **Next.js 15 App Router**, **PostgreSQL via Neon + Drizzle ORM**, **Clerk** for auth, and **Stripe** for payments.

### Route structure

- **Public**: `/`, `/events`, `/events/[id]`, `/about`, `/fundraising`, `/community-achievements`, `/contactus`
- **Any authenticated user**: `/dashboard`, `/dashboard/orders`, `/dashboard/settings`
- **Admin only**: `/dashboard/add-event`, `/dashboard/events`, `/dashboard/analytics`

Route protection is handled by `middleware.ts` (Clerk) and role checks use `checkRole()` from `/utils/roles.ts`. Roles (`admin | member`) are stored in Clerk JWT metadata under `sessionClaims.metadata.role`.

### Data layer

- Schema defined in `/server/schema.ts` — four tables: `users`, `events`, `orders`, `tickets`
- DB client exported from `/server/index.ts` as `db` (Neon serverless + Drizzle)
- All mutations go through **server actions** in `/server/actions/`, validated with Zod schemas from `/types/` and executed via `next-safe-action`

### Key patterns

- **Server actions**: use `next-safe-action` for type-safe, validated mutations. See existing actions in `/server/actions/` as reference.
- **Cart state**: Zustand store in `/lib/client-store.ts`, persisted to localStorage
- **Styling**: Tailwind with CSS variable-based theming (`--background`, `--foreground`, etc.). Components use `cn()` from `/lib/utils.ts` (tailwind-merge + clsx). UI primitives are Shadcn/Radix in `/components/ui/`.
- **Bilingual content**: A `LanguageProvider` in `/components/providers/` wraps the app. Language (`en`/`cy`) is stored in localStorage. Pages include both English and Welsh text toggled via the language context.
- **Images**: Event images are bilingual — separate English and Welsh versions uploaded via UploadThing (`imgUrl` / `imgUrlWel` on the events table).

### Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_DATABASE_URL` | Neon PostgreSQL connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` | Clerk auth |
| `NEXT_PUBLIC_PUBLISH_KEY` / `STRIPE_SECRET` | Stripe payments |
| `UPLOADTHING_TOKEN` / `UPLOADTHING_SECRET` / `UPLOADTHING_APP_ID` | File uploads |
