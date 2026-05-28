# NexusReflect - Unified SaaS Platform

## Project Overview

NexusReflect is an integrated personal growth platform combining three applications into one cohesive experience:
- **Journal** - Personal journaling with mood tracking, future letters, and love letters
- **Mirror** - AI-powered self-concept analysis based on Neville Goddard's philosophy
- **Manifestation** - Intention setting, evidence tracking, and 30-day challenges

## Tech Stack

- **Framework**: Next.js 14 (App Router), React 18, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth.js (Credentials + future OAuth)
- **Styling**: Tailwind CSS 4, shadcn/ui components, Radix UI primitives
- **Icons**: Lucide React
- **AI**: OpenAI GPT-4 API (for pattern analysis)
- **Payments**: Midtrans (Indonesian market) + Stripe (future)
- **State Management**: Zustand + React Hook Form + Zod
- **Monorepo**: Turborepo

## Project Structure

```
unified-saas-platform/
├── apps/
│   ├── web/                      # Main Next.js application
│   │   ├── prisma/
│   │   │   └── schema.prisma     # Database schema
│   │   └── src/
│   │       ├── app/              # Next.js App Router pages
│   │       │   ├── page.tsx      # Landing page
│   │       │   ├── layout.tsx    # Root layout
│   │       │   ├── app-shell.tsx # Auth wrapper component
│   │       │   ├── dashboard/    # Dashboard pages
│   │       │   ├── auth/         # Sign in/up pages
│   │       │   └── api/          # API routes
│   │       │       └── auth/[...nextauth]/route.ts
│   │       ├── components/
│   │       │   ├── ui/           # shadcn/ui components
│   │       │   ├── navigation/  # Nav components
│   │       │   └── providers.tsx
│   │       ├── hooks/            # Custom React hooks
│   │       ├── lib/              # Utilities
│   │       │   ├── auth.ts       # NextAuth config
│   │       │   ├── db.ts         # Prisma client
│   │       │   └── utils.ts      # cn() utility
│   │       └── types/            # TypeScript types
│   └── api/                      # Future: API-only service
├── packages/
│   └── ui/                       # Shared UI components (future)
└── turbo.json                    # Turborepo config
```

## Database Schema

### Core Models

| Model | Description | Key Fields |
|-------|-------------|------------|
| `User` | Base user model | email, name, avatar, plan (subscription) |
| `Content` | Unified content for all types | type (ContentType), title, content, mood, location |
| `JournalEntry` | Journal-specific data | promptId, isPrivate |
| `FutureLetter` | Letters to future self | sendDate, recipientEmail, isSent |
| `LoveLetter` | Love letters with sharing | recipientName, isPublic, shareToken |
| `MirrorAnalysis` | AI analysis results | originalTrigger, hiddenBelief, conceptAudit, newIdentityScript, category |
| `ShadowPattern` | Recurring patterns | pattern, count, category |
| `IdentityScript` | Affirmations/scripts | script, sourceId, isRead, isFavorite |
| `Manifestation` | Goals & intentions | intention, affirmation, evidenceVault, status |
| `Subscription` | Payment tracking | stripeSubscriptionId, status |
| `UserSetting` | User preferences | key, value |

### Enums

- **ContentType**: JOURNAL, FUTURE_LETTER, LOVE_LETTER, MIRROR_ANALYSIS, MANIFESTATION
- **Visibility**: PRIVATE, PUBLIC, SHARED
- **PlanType**: FREE, JOURNAL_PRO, MIRROR_PREMIUM, MANIFESTATION_PREMIUM, BUNDLE
- **MirrorCategory**: SELF_WORTH, SAFETY, AUTHORITY, LOVE, BELONGING, IDENTITY, CREATIVE, SERVICE, POWER, UNKNOWN
- **ManifestationStatus**: DRAFT, ACTIVE, COMPLETED, PAUSED, ABANDONED

## Common Commands

```bash
# Install dependencies
npm install

# Development
npm run dev                    # Start dev server (http://localhost:3000)

# Database
npm run db:generate             # Generate Prisma client
npm run db:migrate              # Run migrations
npm run db:push                 # Push schema to database
npm run db:studio               # Open Prisma Studio

# Build
npm run build                   # Production build
npm run lint                   # Run ESLint

# Turbo
npx turbo run build            # Build all packages
```

## Environment Variables

Required in `apps/web/.env`:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"
OPENAI_API_KEY="sk-..."
MIDTRANS_SERVER_KEY="your-key"
MIDTRANS_IS_PRODUCTION="false"
```

## Key Implementation Details

### Authentication Flow
- NextAuth.js with Credentials provider
- JWT strategy for sessions
- Custom sign-in/sign-up pages in `/auth/`
- Session includes `user.id` from JWT callback

### App Shell Pattern
- `AppShell` component wraps authenticated pages
- Redirects to `/auth/signin` if no session
- Simple sidebar layout (md:pl-64)

### Component Patterns
- shadcn/ui style with `cn()` utility for class merging
- Forward refs for all components
- Dark mode via `next-themes` ThemeProvider

### API Routes
- `/api/auth/[...nextauth]` - NextAuth handlers

## Future Enhancements

- OAuth providers (Google, GitHub)
- Real-time sync between apps
- Mobile app (React Native/Expo)
- Push notifications
- AI-powered prompts and insights
- Social features (sharing, community)
- Premium subscription tiers
- Export/import data

## Development Notes

### Prisma Tips
1. Always run `db:generate` after schema changes
2. Use `@unique` on one-to-one relation fields
3. Add reverse relations on both sides of relationships

### Common Issues
- Port 3000 already in use: `lsof -ti:3000 | xargs kill -9`
- Type errors: Check imports and component exports
- Auth redirect loops: Check session handling in AppShell

### Style Guide
- Use dark theme by default (matches shadcn/ui)
- Gradient accents: `from-violet-500 to-cyan-500`
- Card backgrounds: `bg-neutral-900/50`
- Text colors: `text-white`, `text-white/50`, `text-white/30`