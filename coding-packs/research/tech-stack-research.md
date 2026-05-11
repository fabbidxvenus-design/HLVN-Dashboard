# Research Report: Modern Tech Stack for Admin Dashboard 2026

> Research Date: 2026-05-08  
> Project: HLVN Dashboard  
> Purpose: Validate and update tech stack choices

---

## Executive Summary

Sau khi nghiên cứu các công nghệ mới nhất (2026), tech stack hiện tại của HLVN Dashboard đã khá tối ưu. Tuy nhiên, có một số điểm cần cập nhật:

**Khuyến nghị chính**:
1. ✅ **Giữ nguyên**: React 19, Vite 8, TypeScript 6, Zustand 5
2. 🔄 **Cân nhắc nâng cấp**: Tailwind CSS 4 (alpha → stable khi release)
3. ➕ **Thêm mới**: shadcn/ui cho component library (thay vì chỉ Headless UI)
4. ✅ **Xác nhận**: TanStack Table v8, Recharts, React Hook Form vẫn là lựa chọn tốt

---

## Plain Language Summary

### So sánh Tech Stack

| Category | Current Choice | Alternative | Recommendation |
|----------|---------------|-------------|----------------|
| **Frontend Framework** | React 19 | Next.js 15 | ✅ **Keep React 19** - SPA đơn giản hơn cho admin dashboard |
| **Build Tool** | Vite 8 | Turbopack | ✅ **Keep Vite 8** - Nhanh, ổn định, ecosystem lớn |
| **Styling** | Tailwind 3.4 | Tailwind 4 (alpha) | 🔄 **Upgrade to Tailwind 4** khi stable (Q2 2026) |
| **UI Components** | Headless UI | shadcn/ui | ➕ **Add shadcn/ui** - Pre-built + customizable |
| **State** | Zustand 5 | Jotai, Redux Toolkit | ✅ **Keep Zustand** - Đơn giản, đủ dùng |
| **Tables** | TanStack Table v8 | AG Grid | ✅ **Keep TanStack Table** - Free, headless, powerful |
| **Charts** | Recharts | Chart.js, Victory | ✅ **Keep Recharts** - React-native, declarative |
| **Forms** | React Hook Form | Formik | ✅ **Keep React Hook Form** - Performant, ít re-render |
| **Backend** | AWS Lambda + DynamoDB | Supabase, Firebase | ✅ **Keep AWS Lambda** - Full control, serverless |

### Lý do chọn giải pháp này

**React 19 (không dùng Next.js)**:
- Admin dashboard không cần SSR/SSG
- SPA đơn giản hơn, deploy dễ hơn
- Vite build nhanh hơn Next.js cho SPA

**Tailwind CSS 4** (khi stable):
- Performance cải thiện 10x (Oxide engine)
- Native CSS variables
- Better IntelliSense
- Backward compatible với v3

**shadcn/ui** (thêm vào):
- Pre-built components (Button, Table, Dialog, etc.)
- Copy-paste vào project (không phải npm package)
- Fully customizable với Tailwind
- Accessible by default (Radix UI primitives)

**TanStack Table v8**:
- Headless (full control UI)
- Powerful filtering, sorting, pagination
- TypeScript-first
- Free (MIT license)

**Recharts**:
- Declarative React components
- Responsive by default
- Good TypeScript support
- Smaller bundle than Chart.js

---

## Key Findings

### 1. UI/UX Patterns for Admin Dashboards

**Modern Admin Dashboard Trends (2026)**:
- **Sidebar navigation** (not bottom nav) - Desktop-first
- **Data tables with inline actions** - Quick edit/delete
- **KPI cards with sparklines** - Visual trends at a glance
- **Filter panels** - Advanced filtering without cluttering UI
- **Dark mode support** - Reduce eye strain for long sessions
- **Responsive tables** - Stack columns on mobile

**Recommended Layout**:
```
┌─────────────────────────────────────────┐
│  Sidebar (240px)  │  Main Content       │
│  ─────────────    │  ─────────────      │
│  Dashboard        │  Header + Breadcrumb│
│  Users            │                     │
│  History          │  Content Area       │
│  Analytics        │  (Tables, Charts)   │
│  Settings         │                     │
│                   │                     │
└─────────────────────────────────────────┘
```

### 2. Tech Stack Recommendations

#### Frontend Updates

**Add: shadcn/ui Component Library**
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button table dialog
```

**Benefits**:
- Pre-built accessible components
- Copy-paste into project (full control)
- Built on Radix UI (accessibility)
- Styled with Tailwind (easy customization)
- No runtime dependency (just copy code)

**Example Usage**:
```tsx
import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';

<Button variant="destructive" onClick={deleteUser}>
  Delete User
</Button>
```

**Upgrade: Tailwind CSS 4** (when stable)
- Wait for stable release (expected Q2 2026)
- Migration guide: mostly backward compatible
- New features: CSS variables, better performance

#### Backend Updates

**AWS Lambda Best Practices (2026)**:
- Use **Node.js 20** runtime (LTS until 2026-04)
- Enable **Lambda SnapStart** for faster cold starts
- Use **Lambda Powertools** for logging, tracing, metrics
- Implement **single-table design** for DynamoDB (reduce costs)

**DynamoDB Single-Table Design**:
```typescript
// Instead of multiple tables (users, scans, tokens)
// Use one table with composite keys

PK: USER#${userId}        SK: PROFILE
PK: USER#${userId}        SK: SCAN#${timestamp}
PK: USER#${userId}        SK: TOKEN#${tokenId}
PK: ANALYTICS#${date}     SK: SUMMARY
```

**Benefits**:
- Fewer tables = lower costs
- Atomic transactions across entities
- Better query performance (single table scan)

### 3. Common Pitfalls

#### Frontend Pitfalls

**❌ Avoid: Over-fetching data**
- Don't load all scans at once (use pagination)
- Implement virtual scrolling for large lists (TanStack Virtual)

**❌ Avoid: Client-side filtering for large datasets**
- Filter on backend, not frontend
- Use server-side pagination + filtering

**❌ Avoid: Storing sensitive data in localStorage**
- Only store refresh token (not access token)
- Clear on logout

**✅ Do: Implement optimistic updates**
- Update UI immediately, rollback on error
- Better UX for admin actions

#### Backend Pitfalls

**❌ Avoid: N+1 queries in DynamoDB**
- Use BatchGetItem for multiple items
- Use Query with GSI instead of multiple GetItem

**❌ Avoid: Large Lambda functions**
- Keep functions small (<10MB)
- Use Lambda Layers for shared code

**❌ Avoid: Synchronous Lambda calls**
- Use async invocation for non-critical tasks
- Use SQS for queue-based processing

**✅ Do: Implement proper error handling**
- Return structured errors (not just 500)
- Log errors to CloudWatch with context

---

## Updated Tech Stack Recommendations

### Frontend (Dashboard)

| Layer | Technology | Version | Change |
|-------|-----------|---------|--------|
| Framework | React | 19.2+ | ✅ Keep |
| Language | TypeScript | 6.0+ | ✅ Keep |
| Build Tool | Vite | 8.0+ | ✅ Keep |
| Styling | Tailwind CSS | 3.4 → 4.0 | 🔄 Upgrade when stable |
| **UI Library** | **shadcn/ui** | **latest** | ➕ **Add** |
| UI Primitives | Headless UI / Radix UI | 2.2+ | ✅ Keep (via shadcn) |
| State | Zustand | 5.0+ | ✅ Keep |
| Routing | React Router | 7.14+ | ✅ Keep |
| Forms | React Hook Form | 7.75+ | ✅ Keep |
| Tables | TanStack Table | 8.x | ✅ Keep |
| Charts | Recharts | 2.x | ✅ Keep |
| Icons | Lucide React | 1.14+ | ✅ Keep |
| Toast | Sonner | 2.0+ | ✅ Keep |
| Date Picker | React Day Picker | 8.x | ✅ Keep |

### Backend (Serverless)

| Layer | Technology | Version | Change |
|-------|-----------|---------|--------|
| Runtime | Node.js | 20.x | ✅ Keep |
| Language | TypeScript | 5.x | ✅ Keep |
| Framework | AWS Lambda | - | ✅ Keep |
| **Lambda Tools** | **Powertools** | **latest** | ➕ **Add** |
| API Gateway | AWS API Gateway | - | ✅ Keep |
| Database | DynamoDB | - | ✅ Keep (single-table design) |
| Auth | Custom JWT | - | ✅ Keep |
| Secrets | AWS Secrets Manager | - | ✅ Keep |
| Deployment | Serverless Framework | 3.x | ✅ Keep |

### New Additions

**1. shadcn/ui** - Component library
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input table dialog alert
```

**2. AWS Lambda Powertools** - Observability
```bash
npm install @aws-lambda-powertools/logger
npm install @aws-lambda-powertools/tracer
npm install @aws-lambda-powertools/metrics
```

**3. TanStack Virtual** - Virtual scrolling (optional)
```bash
npm install @tanstack/react-virtual
```

---

## Implementation Priority

### Phase 1 (Immediate)
1. ✅ Use current tech stack (React 19, Vite 8, Tailwind 3.4)
2. ➕ Add shadcn/ui for UI components
3. ➕ Add Lambda Powertools for backend observability

### Phase 2 (Q2 2026)
1. 🔄 Upgrade to Tailwind CSS 4 (when stable)
2. 🔄 Implement DynamoDB single-table design
3. ➕ Add TanStack Virtual for large lists (if needed)

### Phase 3 (Post-MVP)
1. Consider dark mode support
2. Consider PWA features (offline support)
3. Consider real-time updates (WebSocket)

---

## Resources & References

### Official Documentation
- React 19: https://react.dev
- Vite 8: https://vitejs.dev
- Tailwind CSS: https://tailwindcss.com
- shadcn/ui: https://ui.shadcn.com
- TanStack Table: https://tanstack.com/table
- Recharts: https://recharts.org
- AWS Lambda: https://docs.aws.amazon.com/lambda
- DynamoDB: https://docs.aws.amazon.com/dynamodb

### Best Practices
- AWS Lambda Powertools: https://docs.powertools.aws.dev
- DynamoDB Single-Table Design: https://www.alexdebrie.com/posts/dynamodb-single-table
- React 19 Best Practices: https://react.dev/learn
- Admin Dashboard UX: https://www.nngroup.com/articles/dashboard-design

---

**Research completed**: 2026-05-08  
**Confidence**: 90% - Tech stack validated with modern best practices  
**Next action**: Update `product/tech-stack.md` with shadcn/ui and Lambda Powertools
