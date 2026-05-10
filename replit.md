# MovieBox UG

A Vue 3 streaming platform for Ugandan users — watch movies, TV series, animations and live TV translated into Luganda, Luo, Teso, Kiswahili, and more.

## Run & Operate

- `PORT=22783 BASE_PATH=/ pnpm --filter @workspace/moviebox run dev` — run the MovieBox frontend
- `PORT=8080 pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- **Frontend**: Vue 3 + Vite, Pinia-style composables, Tailwind CSS
- **Video**: Artplayer
- **Auth + DB + Storage**: Firebase 12 (Auth, Firestore, Storage)
- **API**: Express 5
- **DB**: PostgreSQL + Drizzle ORM (API side)

## Where things live

```
artifacts/moviebox/src/
  firebase.ts              — Firebase app + auth/db/storage exports
  stores/
    useAuth.ts             — Firebase Auth (email+password, Google, admin check)
    useSubscription.ts     — Firestore subscriptions per user
  composables/
    useContent.ts          — Load content from Firestore; static fallback if empty
    useLanguageFilter.ts   — Active language tab state
  components/
    TheHeader.vue          — Fixed header: search+logo row, lang tabs row below
    AuthModal.vue          — Email + Google sign-in modal
    HeroBanner.vue         — Auto-cycling hero slider
    MovieSection.vue       — Horizontal scroll movie row
  pages/
    HomePage.vue           — Loads content via useContent composable
    AdminDashboard.vue     — Full Firebase CRUD (content, users, activities, settings)
    WatchPage.vue          — Artplayer video + series episode grid
  data/movies.ts           — 1028-line static fallback (used when Firestore is empty)
  router/index.ts          — Vue Router; /admin guarded for admin email only
```

## Architecture decisions

- **Firebase Auth**: email+password + Google OAuth; no phone auth
- **Admin detection**: only `mainplatform.nexus@gmail.com` is admin (hardcoded constant `ADMIN_EMAIL`)
- **Content strategy**: Firestore `content` collection is source of truth; static `data/movies.ts` is fallback when collection is empty
- **Subscriptions**: Firestore `subscriptions/{uid}` document; expires checked client-side
- **Admin route guard**: `router.beforeEach` awaits `onAuthStateChanged` before allowing `/admin`; AdminDashboard also has an in-component watcher guard

## Product

- Language-filtered browsing (Luganda, Luo, Teso, English, Kiswahili, Others)
- Hero banner slider, horizontal movie sections by category
- Firebase Auth (email/Google) with persistent login
- Subscription plans (1 day / 1 week / 1 month) stored in Firestore
- Admin dashboard: upload/edit/delete content → Firestore, manage users, activity log, SEO + site settings

## User preferences

- Admin email: `mainplatform.nexus@gmail.com` — only this account can access /admin
- Mobile header: search bar inline with logo in row 1; language tabs in row 2 below
- No hamburger menu on mobile
- Hero slider starts directly below the header (no gap)

## Gotchas

- Firestore `content` collection must be populated by admin before Firestore content appears; otherwise static fallback data is shown
- Firebase Storage is initialized but upload-by-URL is used in admin form (no direct file upload yet)
- Mobile `margin-top` for main layout = 80px (header-top 44px + lang-row 36px)
- Desktop `margin-top` = 88px (header-top 52px + lang-tabs-row 36px)

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- Firebase project: `moviebox-ug` (projectId)
