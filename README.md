# HLVN Dashboard

Admin dashboard for managing the HLVN OCR mobile app — users, scan history, and analytics.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + shadcn/ui |
| Styling | Tailwind CSS 4 + CSS custom properties |
| State | Zustand (auth) + React Hook Form + TanStack Query |
| Forms | React Hook Form + Zod |
| Tables | TanStack Table |
| Charts | Recharts |
| Icons | Lucide React |
| Testing | Vitest |

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Installation

```bash
pnpm install
```

### Environment

Create `.env.local` with your backend API URL:

```
NEXT_PUBLIC_BACKEND_API_URL=https://hlvn-serverless.vercel.app
NEXT_PUBLIC_USE_MOCK_API=false
```

For local development with mock data:

```
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3000
NEXT_PUBLIC_USE_MOCK_API=true
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
pnpm build
pnpm start
```

### Testing

```bash
pnpm test          # Run all tests
pnpm test:spec     # Run spec tests only
pnpm test:watch    # Watch mode
```

## Features

### Pages

| Page | Path | Description |
|------|------|-------------|
| Login | `/login` | Email + password authentication |
| Overview | `/` | KPI cards, scan volume chart, recent activity |
| Users | `/users` | User management with CRUD operations |
| Scans | `/scans` | Scan history with search, filters, pagination |
| Analytics | `/analytics` | API usage, top users/products, cost tracking |

### Design System

CSS custom properties for consistent theming:

- `--surface-card`, `--surface-elevated`, `--background-muted`
- `--shadow-card`, `--shadow-elevated`
- `--radius-card`
- `--text-heading`, `--text-body`, `--text-caption`
- `--border`

## Project Structure

```
app/
├── (auth)/login/          # Login page
├── (dashboard)/           # Protected routes
│   ├── layout.tsx         # Sidebar + header shell
│   ├── page.tsx           # Overview
│   ├── users/page.tsx     # Users management
│   ├── scans/page.tsx     # Scan history
│   └── analytics/page.tsx # Analytics
components/
├── ui/                    # shadcn/ui components
├── auth/                  # Auth components
├── dashboard/             # Shell components (sidebar, header)
├── users/                 # Users page components
├── scans/                 # Scans page components
└── analytics/            # Analytics page components
hooks/
├── useAuth.ts             # Authentication
├── useUsersQuery.ts       # Users data + URL state
├── useScansQuery.ts       # Scans data + URL state
└── useAnalyticsQuery.ts   # Analytics data
lib/
├── api/                   # API client + endpoints
└── utils.ts               # Utilities
types/                    # TypeScript types
```

## API

The dashboard integrates with the HLVN Serverless backend (`hlvn-serverless.vercel.app`). See `.env.local` for configuration.

**Mock mode**: Set `NEXT_PUBLIC_USE_MOCK_API=true` to use local mock data instead of the real backend. Mock login: `admin@hlvn.vn` (any password).

## License

Private.