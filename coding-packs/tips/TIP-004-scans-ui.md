# TIP-004: Scans History UI

## HEADER
- TIP-ID: TIP-004
- Project: HLVN Dashboard
- Module: Scan History
- Priority: P0
- Depends on: TIP-002
- Estimated: L (12h)

## CONTEXT
- Working dir: `D:\scripts\HLVN\HLVN-dashboard`
- Backend project: `D:\scripts\HLVN\HLVN-serverless`
- Tech stack: Next.js 15, TypeScript, TanStack Table, React Day Picker, shadcn/ui, Sonner
- Key files to read first: `coding-packs/design/design-brief.md`, `coding-packs/02-TASK-GRAPH.md`
- Patterns to follow: frontend-only API calls through TIP-002 client

## APPLICABLE STANDARDS
- `standards/auth/rbac-admin-gate.md` — admin-only UX; backend enforces authorization

## TASK
Build the Scan History page UI and connect it to the external backend scans API. Implement searchable/filterable/paginated scans table, scan detail dialog, delete action, and export trigger without implementing backend routes or Excel generation in dashboard.

## SPECIFICATIONS

### Business Rules
1. Admin can view scan history for all users
2. Admin can search OCR content
3. Admin can filter scans by user and date range
4. Admin can view complete OCR details for a scan
5. Admin can delete scans through backend API
6. Admin can trigger export through backend API
7. Backend owns storage, image URLs, export generation, and data authorization

### API Contracts

```text
GET /api/scans?page=1&limit=20&search=&userId=all&dateFrom=&dateTo=&sortBy=timestamp&sortOrder=desc
Response: { success: true, data: ScanRecord[], meta: { page, limit, total, hasMore } }
```

```text
GET /api/scans/:id
Response: { success: true, data: { scan: ScanRecord, user: UserProfile } }
```

```text
DELETE /api/scans/:id
Response: { success: true, data: { id: string } }
```

```text
POST /api/export/excel
Request: { search?: string, userId?: string, dateFrom?: string, dateTo?: string }
Response: binary Excel file OR { success: true, data: { downloadUrl: string } }
```

Also fetch users for filter dropdown:
```text
GET /api/users?limit=100&role=all
```

### Types
Create/extend `types/scan.ts`:
```ts
export interface OCRField {
  field: string;
  value: string;
  confidence?: 'high' | 'medium' | 'low';
  category?: 'main' | 'other';
}

export interface OCRSize {
  size: string;
  quantity: number;
}

export interface OCRResponse {
  title?: string;
  fields?: OCRField[];
  sizes?: OCRSize[];
  rawText?: string;
  notes?: string[];
}

export interface TokenUsage {
  input: number;
  output: number;
  cost: number;
}

export interface ScanRecord {
  id: string;
  userId: string;
  userEmail?: string;
  timestamp: string;
  imageUrl: string | null;
  ocrStructured: OCRResponse;
  tokenUsage: TokenUsage;
  apiKeyIndex: number;
  modelTier?: 'free' | 'default' | 'high' | null;
  edited: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

### Files to Create
```
app/(dashboard)/scans/page.tsx
components/scans/
├── ScansPageHeader.tsx
├── ScanFilters.tsx
├── ScansTable.tsx
├── ScanThumbnailCell.tsx
├── OCRSummaryCell.tsx
├── TokenUsageCell.tsx
├── ScanDetailDialog.tsx
├── DeleteScanDialog.tsx
└── ExportScansButton.tsx
hooks/
└── useScansQuery.ts
lib/api/scans.ts
types/scan.ts
```

### Page Layout
1. Page title: `Scan History`
2. Right action: `Export Excel`
3. Filter row:
   - Search input placeholder: `Search OCR content...`
   - User select: All users + fetched users
   - Date range picker: Last 7 days default optional
4. Table columns:
   - Thumbnail
   - Product / OCR Summary
   - User
   - Time
   - Token Usage
   - Edited
   - Actions
5. Pagination footer

### Scan Table Details
**Thumbnail**:
- Show image when `image_url` exists
- Show image placeholder icon when absent
- Use explicit dimensions to avoid layout shift

**OCR Summary**:
- Prefer `ocr_structured.title`
- If no title, show first field value or `Untitled scan`
- Show count of fields/sizes as muted secondary line

**Token Usage**:
- Show input + output tokens
- Show cost formatted as USD
- Use mono font for numeric values when useful

**Actions**:
- View details
- Delete scan

### Scan Detail Dialog
Must display:
1. Larger image preview or placeholder
2. Scan metadata:
   - User email
   - Timestamp
   - Edited status
   - Model tier
   - API key index
3. OCR title
4. Fields table: field, value, confidence, category
5. Sizes table: size, quantity
6. Raw text section if available
7. Token usage summary

Behavior:
- Open from table row action
- Fetch fresh detail from `GET /api/scans/:id`
- Show loading state inside dialog
- Trap focus via Radix Dialog

### Export Button
Behavior:
1. Sends current filters to `POST /api/export/excel`
2. Shows loading state during request
3. Supports either response shape:
   - Binary blob: create download object URL and trigger download
   - JSON download URL: navigate/download that URL
4. Filename: `hlvn-scans-export-YYYY-MM-DD.xlsx`
5. Show success/error toast

### Loading/Empty/Error States
Implement basic states now:
- Loading: table skeleton rows
- Empty: `No scans found.`
- Error: inline error card with retry button

TIP-006 will polish these further.

### Validation
1. Validate date range before export
2. Do not send invalid dates to backend
3. Validate malformed scan detail response before rendering

### Mock Data Requirements
- When `NEXT_PUBLIC_USE_MOCK_API=true`, scans page must render from mock API responses without changing component props.
- Mock scan data must use `ScanRecord` camelCase fields: `userId`, `userEmail`, `imageUrl`, `ocrStructured`, `tokenUsage`, `apiKeyIndex`, `modelTier`, `createdAt`, `updatedAt`.
- Mock `OCRResponse` must use `rawText` (not `raw_text`).
- Mock list responses must include `meta.hasMore`.
- Mock export must simulate download trigger or return `{ success: true, data: { downloadUrl } }`.
- Scan detail dialog must work with mock `{ scan: ScanRecord, user: UserProfile }` response.

## ACCEPTANCE CRITERIA
- Given admin opens `/scans`, When page loads, Then scans table fetches and displays backend data
- Given search text changes, When applied, Then backend request includes search param and URL updates
- Given user/date filters change, When applied, Then table refreshes with matching query params
- Given a scan row, When View is clicked, Then detail dialog fetches and displays scan details
- Given a scan row, When Delete is confirmed, Then backend deletes scan and table refreshes
- Given filters are set, When Export is clicked, Then export request includes current filters and downloads file or download URL
- Given backend returns error, When table/detail/export fails, Then user sees friendly Vietnamese error

## CONSTRAINTS
- DO NOT: Generate Excel in dashboard unless backend returns a binary file to download
- DO NOT: Create `app/api/*` export proxy route
- DO NOT: Import Supabase Storage client
- DO NOT: Implement OCR processing logic
- REUSE: API client and auth session from TIP-002
- SKIP: Scan editing UI and bulk operations

## VERIFICATION CHECKLIST
- [ ] `/scans` route renders under dashboard shell
- [ ] Table displays thumbnail, OCR summary, user, time, token usage
- [ ] Filters use URL state
- [ ] Detail dialog is keyboard accessible
- [ ] Delete confirmation works and refreshes data
- [ ] Export button handles loading, success, and failure
- [ ] Images have explicit dimensions and alt text
- [ ] `pnpm tsc --noEmit` passes
- [ ] Component tests cover table states, detail dialog, and export behavior
