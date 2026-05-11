# Tech Stack — HLVN Dashboard (Frontend-Only)

> **Updated**: 2026-05-08 - Frontend-only dashboard scope  
> **Backend**: See `D:\scripts\HLVN\HLVN-serverless\coding-packs\product\tech-stack.md`

---

## Frontend Stack (Dashboard)

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| **Framework** | Next.js | 15.x | Vercel-optimized, App Router, modern routing with layouts |
| **Language** | TypeScript | 6.0+ | Type safety, better DX |
| **Styling** | Tailwind CSS | 3.4+ (→4.0) | Utility-first, rapid development. Upgrade to v4 when stable |
| **UI Library** | shadcn/ui | latest | Pre-built accessible components, copy-paste, Radix UI primitives |
| **UI Primitives** | Radix UI | latest | Accessible primitives (via shadcn/ui) |
| **State Management** | Zustand | 5.0+ | Lightweight for client auth/UI state (server state via backend API) |
| **Forms** | React Hook Form | 7.75+ | Performant, minimal re-renders |
| **Data Tables** | TanStack Table | 8.x | Headless table library, powerful filtering/sorting |
| **Charts** | Recharts | 2.x | React-native charts, composable, responsive |
| **Icons** | Lucide React | 1.14+ | Modern, tree-shakeable |
| **Toast** | Sonner | 2.0+ | Beautiful toasts |
| **Date Picker** | React Day Picker | 8.x | Accessible date picker for filters |
| **Testing** | Vitest + Testing Library | 4.1+ / 16.3+ | Fast unit/component tests |
| **Hosting** | Vercel | - | Auto-deploy from Git, Edge Network, zero config |

---

## Backend Stack (External API)

**Location**: `D:\scripts\HLVN\HLVN-serverless`

Dashboard calls external backend API. Backend owns:
- All API endpoints (`/api/auth`, `/api/users`, `/api/scans`, `/api/analytics`, `/api/export`, `/api/ocr`)
- Supabase PostgreSQL (users, scans, analytics_cache tables)
- Supabase Auth (JWT sessions + RLS)
- Supabase Storage (scan images)
- OpenRouter integration (OCR proxy with multi-key fallback + retry)
- Business logic, data persistence, analytics aggregation

**See**: `D:\scripts\HLVN\HLVN-serverless\coding-packs\product\tech-stack.md` for backend details.

---

## Development Tools

| Tool | Purpose |
|------|---------|
| **Vercel CLI** | Local dev server, deployment |
| **ESLint** | Linting (Next.js config) |
| **Prettier** | Code formatting |
| **Husky** | Git hooks for pre-commit checks |

---

## Architecture Decisions

### Why Next.js over React SPA?

- **Vercel-optimized**: Best performance on Vercel platform
- **App Router**: Modern routing with layouts, loading states
- **SSR/SSG**: Optional server-side rendering for better SEO
- **Trade-off**: Slightly more complex than SPA (acceptable for better DX)

### Why Frontend-Only Dashboard?

- **Separation of concerns**: Backend API is reusable by mobile app and dashboard
- **Security**: Backend enforces auth/authorization; dashboard cannot bypass
- **Scalability**: Backend can scale independently
- **Maintainability**: Clear boundaries between frontend and backend
- **Trade-off**: Requires backend API to be deployed first (acceptable, parallel development)

### Why shadcn/ui over Headless UI?

- **Pre-built components**: Button, Table, Dialog, etc. ready to use
- **Copy-paste approach**: No npm dependency, full control over code
- **Radix UI primitives**: Accessible by default (WAI-ARIA compliant)
- **Tailwind styling**: Easy customization, consistent with project
- **Trade-off**: Need to copy components into project (acceptable, better control)

### Why Recharts over Chart.js?

- **React-native**: Declarative, composable components
- **TypeScript**: Better type support
- **Responsive**: Built-in responsive behavior
- **Trade-off**: Slightly larger bundle than Chart.js (acceptable)

### Why TanStack Table over AG Grid?

- **Headless**: Full control over UI styling
- **Free**: MIT license, no enterprise fees
- **Lightweight**: Smaller bundle than AG Grid
- **Trade-off**: More setup than AG Grid (acceptable for MVP)

### Why Zustand over Redux?

- **Lightweight**: Minimal boilerplate
- **Simple API**: Easy to learn and use
- **No provider**: Direct store access
- **Trade-off**: Less ecosystem than Redux (acceptable, we only need auth/UI state)

---

## Shared Types (Frontend + Backend Contract)

```typescript
// Dashboard defines types matching backend API contract
types/
├── api.ts              // ApiResponse<T>, ApiMeta
├── user.ts             // UserProfile, UserRole
├── scan.ts             // ScanRecord, OCRResponse, OCRField, OCRSize
├── analytics.ts        // AnalyticsKpis, ScanTrendPoint, TopProduct, TopUser, ApiUsageRow
└── auth.ts             // AuthSession
```

**Note**: Dashboard types are frontend-only. Backend owns database schema and API response shape.

---

## Data Flow

### Authentication Flow

```
1. User enters email/password on /login
2. Dashboard calls POST /api/auth/login (backend)
3. Backend validates credentials via Supabase Auth
4. Backend returns { success: true, data: { accessToken, user } }
5. Dashboard stores token in browser storage
6. Dashboard redirects to / (dashboard overview)
7. Dashboard layout calls GET /api/auth/me to validate session
8. All authenticated requests attach Authorization: Bearer <token>
```

### Data Fetching Flow

```
1. Dashboard page loads (e.g., /users)
2. Component calls backend API via API client
3. API client attaches bearer token
4. Backend validates token, enforces RLS, returns data
5. Dashboard renders data in UI
6. No server state duplication in Zustand
```

### Export Flow

```
1. User clicks Export button on /scans
2. Dashboard sends current filters to POST /api/export/excel (backend)
3. Backend generates Excel file (multi-sheet)
4. Backend returns binary file or download URL
5. Dashboard triggers browser download
```

---

## Environment Variables

Dashboard requires:

```env
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3001
```

**Rules**:
- `NEXT_PUBLIC_BACKEND_API_URL` is required at runtime
- No secrets in dashboard env vars
- No Supabase/OpenRouter env vars in dashboard (backend owns these)

---

## Deployment

### Vercel Deployment

```bash
# 1. Connect GitHub repo to Vercel
# 2. Add environment variables in Vercel dashboard:
#    - NEXT_PUBLIC_BACKEND_API_URL (production backend URL)
# 3. Push to main branch → auto deploy

git push origin main
# Vercel automatically builds and deploys
```

### Backend Deployment

**See**: `D:\scripts\HLVN\HLVN-serverless\coding-packs\product\tech-stack.md`

Backend must be deployed first before dashboard can function.

---

## Cost Estimate

### Free Tier (MVP)

| Service | Free Tier | Sufficient For |
|---------|-----------|----------------|
| **Vercel** | 100GB bandwidth, unlimited requests | MVP + early production |

**Total**: $0/month for dashboard hosting

**Backend costs**: See `D:\scripts\HLVN\HLVN-serverless\coding-packs\product\tech-stack.md`

### Paid Tier (Production)

| Service | Plan | Cost | When Needed |
|---------|------|------|-------------|
| **Vercel Pro** | 1TB bandwidth, analytics | $20/month | >100GB bandwidth |

**Total**: $20/month for dashboard hosting (production)

---

## What Dashboard Does NOT Include

**Dashboard is frontend-only**:
- ❌ No `app/api/*` routes
- ❌ No Supabase client/server/admin imports
- ❌ No OpenRouter integration
- ❌ No database migrations
- ❌ No server-side OCR processing
- ❌ No multi-key fallback logic
- ❌ No retry/backoff implementation
- ❌ No RLS policy enforcement (backend enforces)
- ❌ No Excel generation (backend generates)

**All backend logic lives in**: `D:\scripts\HLVN\HLVN-serverless`

---

**Created**: 2026-05-08  
**Last updated**: 2026-05-08 (Rewritten for frontend-only scope)
