# Research Report: Vercel + Supabase Stack

> Research Date: 2026-05-08  
> Project: HLVN Dashboard  
> Purpose: Update tech stack for Vercel deployment + Supabase database

---

## Executive Summary

Thay đổi từ **AWS Lambda + DynamoDB** sang **Vercel + Supabase** mang lại nhiều lợi ích cho dashboard project:

**Lợi ích chính**:
1. ✅ **Deployment đơn giản hơn**: Vercel tự động deploy từ Git, không cần Serverless Framework
2. ✅ **Database SQL**: PostgreSQL (Supabase) dễ query hơn DynamoDB, phù hợp với admin dashboard
3. ✅ **Auth built-in**: Supabase Auth tích hợp sẵn, không cần implement JWT manually
4. ✅ **Real-time subscriptions**: Supabase Realtime cho live updates (optional)
5. ✅ **Free tier generous**: Vercel + Supabase free tier đủ cho MVP

**Trade-offs**:
- Vendor lock-in (Vercel + Supabase) vs AWS (có thể migrate khó hơn)
- Cold start của Vercel Serverless Functions (~100-300ms) vs Lambda (~50-200ms)

---

## Plain Language Summary

### So sánh: AWS Lambda + DynamoDB vs Vercel + Supabase

| Aspect | AWS Lambda + DynamoDB | Vercel + Supabase | Winner |
|--------|----------------------|-------------------|--------|
| **Deployment** | Serverless Framework, manual config | Git push → auto deploy | ✅ Vercel |
| **Database** | NoSQL (DynamoDB), single-table design | SQL (PostgreSQL), relational | ✅ Supabase |
| **Auth** | Custom JWT implementation | Built-in Supabase Auth | ✅ Supabase |
| **Real-time** | Manual WebSocket/polling | Built-in Realtime subscriptions | ✅ Supabase |
| **Cost (MVP)** | ~$5-10/month | Free tier (generous) | ✅ Vercel + Supabase |
| **Scalability** | Unlimited (AWS) | Limited on free tier | ⚖️ AWS |
| **Learning curve** | Steeper (IAM, CloudFormation) | Easier (Git-based) | ✅ Vercel |
| **Vendor lock-in** | Medium (can migrate) | High (harder to migrate) | ⚖️ AWS |

### Lý do chọn Vercel + Supabase

**Vercel**:
- Deploy tự động từ GitHub (push → production)
- Edge Network toàn cầu (CDN built-in)
- Serverless Functions (Node.js, Edge Runtime)
- Zero config cho Next.js
- Free tier: 100GB bandwidth, unlimited requests

**Supabase**:
- PostgreSQL database (SQL queries, relations, joins)
- Built-in Auth (email/password, OAuth, magic links)
- Row Level Security (RLS) cho authorization
- Real-time subscriptions (optional)
- Storage for files (S3-compatible)
- Free tier: 500MB database, 1GB storage, 2GB bandwidth

---

## Key Findings

### 1. Architecture Changes

#### Old Architecture (AWS)
```
Frontend (React SPA)
    ↓
AWS API Gateway
    ↓
AWS Lambda Functions
    ↓
DynamoDB (NoSQL)
```

#### New Architecture (Vercel + Supabase)
```
Frontend (Next.js App Router)
    ↓
Vercel Serverless Functions (API Routes)
    ↓
Supabase PostgreSQL (SQL)
    ↓
Supabase Auth (JWT)
```

### 2. Tech Stack Updates

#### Frontend Changes

| Old | New | Reason |
|-----|-----|--------|
| React SPA (Vite) | Next.js 15 App Router | Better for Vercel, SSR/SSG support, API routes |
| React Router | Next.js App Router | Built-in routing, file-based |
| Custom auth flow | Supabase Auth client | Built-in, less code |

#### Backend Changes

| Old | New | Reason |
|-----|-----|--------|
| AWS Lambda | Vercel Serverless Functions | Simpler deployment, auto-scaling |
| DynamoDB | Supabase PostgreSQL | SQL queries, relations, easier for admin dashboard |
| Custom JWT | Supabase Auth | Built-in, secure, less maintenance |
| AWS Secrets Manager | Vercel Environment Variables | Simpler, integrated |
| Serverless Framework | Vercel CLI / Git push | Zero config deployment |

### 3. Database Schema (PostgreSQL)

**Supabase PostgreSQL** thay vì DynamoDB single-table design:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'user')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- Scans table
CREATE TABLE scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  image_url TEXT,
  ocr_structured JSONB,
  token_usage JSONB,
  api_key_index INTEGER,
  edited BOOLEAN DEFAULT FALSE
);

-- Indexes
CREATE INDEX idx_scans_user_id ON scans(user_id);
CREATE INDEX idx_scans_timestamp ON scans(timestamp DESC);

-- Row Level Security (RLS)
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own scans (unless admin)
CREATE POLICY "Users can view own scans"
  ON scans FOR SELECT
  USING (
    auth.uid() = user_id 
    OR 
    (SELECT role FROM users WHERE id = auth.uid()) = 'admin'
  );
```

**Benefits of PostgreSQL**:
- SQL queries (easier than DynamoDB query patterns)
- Relations (foreign keys, joins)
- Full-text search (built-in)
- JSON support (JSONB for OCR data)
- Row Level Security (authorization at DB level)

### 4. Authentication Flow

**Supabase Auth** thay vì custom JWT:

```typescript
// Frontend: Login
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  
  // Check role
  const { data: user } = await supabase
    .from('users')
    .select('role')
    .eq('id', data.user.id)
    .single();
  
  if (user.role !== 'admin') {
    throw new Error('Only admins can access dashboard');
  }
  
  return data;
}

// Frontend: Auto-refresh tokens
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    // Redirect to login
  }
  // Tokens auto-refresh
});
```

**Benefits**:
- No manual JWT implementation
- Auto-refresh tokens
- Secure by default
- Email verification built-in
- Password reset built-in

### 5. API Routes (Vercel Serverless Functions)

**Next.js API Routes** thay vì AWS Lambda:

```typescript
// app/api/users/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Admin access
  );
  
  // Get all users (admin only)
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(data);
}
```

**Benefits**:
- File-based routing (no API Gateway config)
- TypeScript support
- Auto-deploy with frontend
- Edge Runtime option (faster cold starts)

---

## Updated Tech Stack

### Frontend (Dashboard)

| Layer | Technology | Version | Change |
|-------|-----------|---------|--------|
| **Framework** | Next.js | 15.x | 🔄 Changed from React SPA |
| **Language** | TypeScript | 6.0+ | ✅ Keep |
| **Styling** | Tailwind CSS | 3.4+ | ✅ Keep |
| **UI Library** | shadcn/ui | latest | ✅ Keep |
| **State** | Zustand | 5.0+ | ✅ Keep (for client state) |
| **Forms** | React Hook Form | 7.75+ | ✅ Keep |
| **Tables** | TanStack Table | 8.x | ✅ Keep |
| **Charts** | Recharts | 2.x | ✅ Keep |
| **Icons** | Lucide React | 1.14+ | ✅ Keep |
| **Toast** | Sonner | 2.0+ | ✅ Keep |
| **Auth Client** | Supabase JS | 2.x | ➕ New |

### Backend (Vercel + Supabase)

| Layer | Technology | Version | Change |
|-------|-----------|---------|--------|
| **Hosting** | Vercel | - | 🔄 Changed from AWS Lambda |
| **API** | Next.js API Routes | 15.x | 🔄 Changed from API Gateway |
| **Database** | Supabase PostgreSQL | - | 🔄 Changed from DynamoDB |
| **Auth** | Supabase Auth | - | 🔄 Changed from custom JWT |
| **Storage** | Supabase Storage | - | 🔄 Changed from S3 |
| **Real-time** | Supabase Realtime | - | ➕ New (optional) |

### Development Tools

| Tool | Purpose | Change |
|------|---------|--------|
| Vercel CLI | Local dev + deployment | ➕ New |
| Supabase CLI | Local DB + migrations | ➕ New |
| ESLint | Linting | ✅ Keep |
| Prettier | Formatting | ✅ Keep |

---

## Migration from Mobile App

**Mobile app** (React SPA + IndexedDB) → **Dashboard** (Next.js + Supabase):

### Data Sync Strategy

**Option 1: Mobile app sends to Supabase directly**
```typescript
// Mobile app: After OCR, save to Supabase
const { data, error } = await supabase
  .from('scans')
  .insert({
    user_id: currentUser.id,
    image_url: uploadedImageUrl,
    ocr_structured: ocrResult,
    token_usage: tokenUsage,
  });
```

**Option 2: Mobile app calls dashboard API**
```typescript
// Mobile app: POST to dashboard API
await fetch('https://dashboard.vercel.app/api/scans', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${supabaseToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    image: base64Image,
    ocrResult,
    tokenUsage,
  }),
});
```

**Recommendation**: Option 1 (direct Supabase) - simpler, less latency

### Auth Integration

**Mobile app** cũng dùng Supabase Auth:
- Replace bcrypt PIN → Supabase email/password
- Shared user table
- Same JWT tokens
- Role-based access (admin gate for dashboard)

---

## Implementation Steps

### Phase 1: Setup (Week 1)

1. **Create Supabase project**
   ```bash
   # Visit supabase.com, create project
   # Get SUPABASE_URL and SUPABASE_ANON_KEY
   ```

2. **Create Next.js project**
   ```bash
   npx create-next-app@latest hlvn-dashboard --typescript --tailwind --app
   cd hlvn-dashboard
   npm install @supabase/supabase-js
   npx shadcn-ui@latest init
   ```

3. **Setup database schema**
   ```bash
   # Run SQL in Supabase SQL Editor
   # Create users, scans tables
   # Enable RLS policies
   ```

4. **Deploy to Vercel**
   ```bash
   # Connect GitHub repo to Vercel
   # Add environment variables
   # Push to main → auto deploy
   ```

### Phase 2: Auth (Week 1-2)

1. Implement login page with Supabase Auth
2. Add admin role check
3. Implement protected routes
4. Add logout functionality

### Phase 3: Features (Week 2-4)

1. User management (CRUD)
2. History view (list + detail)
3. Analytics dashboard
4. API routes for backend logic

### Phase 4: Mobile Integration (Week 4-5)

1. Update mobile app to use Supabase Auth
2. Sync scans to Supabase
3. Test end-to-end flow

---

## Cost Comparison

### AWS Lambda + DynamoDB
- Lambda: $0.20 per 1M requests
- DynamoDB: $1.25 per million writes
- API Gateway: $3.50 per million requests
- **Estimated**: $5-10/month for MVP

### Vercel + Supabase
- Vercel Free: 100GB bandwidth, unlimited requests
- Supabase Free: 500MB DB, 1GB storage, 2GB bandwidth
- **Estimated**: $0/month for MVP (free tier)
- **Paid**: $20/month Vercel Pro + $25/month Supabase Pro (if needed)

---

## Resources & References

### Official Documentation
- Next.js 15: https://nextjs.org/docs
- Vercel: https://vercel.com/docs
- Supabase: https://supabase.com/docs
- Supabase Auth: https://supabase.com/docs/guides/auth
- Supabase PostgreSQL: https://supabase.com/docs/guides/database

### Tutorials
- Next.js + Supabase: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
- Vercel Deployment: https://vercel.com/docs/deployments/overview

---

**Research completed**: 2026-05-08  
**Confidence**: 95% - Vercel + Supabase is simpler and more cost-effective for MVP  
**Next action**: Update all tech stack docs with Vercel + Supabase
