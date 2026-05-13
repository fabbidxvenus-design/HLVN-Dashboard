# TIP-022: Scan Detail OCR Field Classification

## HEADER
- TIP-ID: TIP-022
- Project: HLVN Dashboard
- Module: scans
- Priority: P1
- Depends on: TIP-010
- Estimated: S (2h)

## CONTEXT
- Working dir: D:\scripts\HLVN\HLVN-dashboard
- Tech stack: Vite 6 + React 19 + TypeScript strict + Tailwind CSS + shadcn-style UI primitives (inferred from `coding-packs/00-PROJECT-CONTEXT.md` and current `src/` implementation)
- Key files to read first:
  - `src/components/scans/ScanDetailDialog.tsx`
  - `src/pages/ScansPage.tsx`
  - `src/lib/api-adapters.ts`
  - `src/types/scan.ts`
  - `coding-packs/tips/TIP-010-scan-detail.md`
- Patterns to follow:
  - Keep scan detail rendering inside `ScanDetailDialog` or small scan-domain helpers.
  - Use existing `Dialog`, `Badge`, `Button`, table/surface classes, and Vietnamese labels.
  - Preserve existing API contract and map defensively from both raw OCR text and structured OCR payloads.

## APPLICABLE STANDARDS
None — `coding-packs/standards/README.md` is not initialized.

## TASK
Fix scan detail OCR field classification so important label fields are displayed under `Thông tin chính` instead of falling into `Thông tin khác`. Remove the separate size table UI; size/quantity data must be represented as one normal field inside `Thông tin chính`.

The reported broken example currently renders only `商品名` in `Thông tin chính`, while `契約No.`, `CT No.`, and `MADE IN VIETNAM` fall into `Thông tin khác`, and size rows render as a separate table. After this TIP, those fields must be grouped as primary scan information for the garment label.

## SPECIFICATIONS

### Files to Modify

1. `src/types/scan.ts`
   - Extend `Scan` only if needed to carry structured OCR data from the backend.
   - Prefer optional fields so existing scan list flows do not break.
   - Candidate fields if backend already returns them:
     - `ocr_structured?: unknown`
     - `metadata?: unknown`
     - `fields?: unknown`

2. `src/lib/api-adapters.ts`
   - Preserve current `mapScan()` behavior.
   - Add defensive mapping for structured OCR payloads if present in backend response:
     - camelCase: `ocrStructured`
     - snake_case: `ocr_structured`
     - generic: `structured`, `metadata`, `fields`
   - Do not lose raw OCR text.

3. `src/components/scans/ScanDetailDialog.tsx`
   - Replace raw-only scan detail body with classified OCR sections:
     - `Thông tin chính`
     - `Thông tin khác`
     - `Nội dung OCR` raw text fallback/debug section
   - Remove/hide any separate `Bảng size` section.
   - Render size/quantity as a single primary field, e.g. label `Size / Số lượng` with value `M: 10, L: 10`.
   - Ensure the following keys are classified as `Thông tin chính`:
     - `商品名`
     - `契約No.` / `契約No` / `Contract No` / `ContractNo`
     - `CT No.` / `CT No` / `CTNo`
     - `MADE IN VIETNAM` / `Made in Vietnam` / `Origin` / `Xuất xứ`
     - size/quantity table rows collapsed into one primary field
   - Preserve confidence display per field when available:
     - If a field has confidence, show `Tin cậy` value near that field.
     - If no confidence exists, omit confidence rather than showing fake data.

### Suggested Implementation Shape

Add small pure helpers in `ScanDetailDialog.tsx` or a new scan-domain utility if the component becomes too large:

```ts
interface OcrFieldView {
  label: string
  value: string
  confidence?: string | number
}

interface ClassifiedOcrFields {
  primary: OcrFieldView[]
  secondary: OcrFieldView[]
}
```

Helper responsibilities:
1. Extract candidate fields from possible backend shapes:
   - array of `{ label/key/name, value/text, confidence }`
   - object map `{ [label]: value }`
   - nested `ocrStructured.fields`
   - size table arrays such as `sizes`, `sizeTable`, `size_table`, `quantities`
2. Normalize labels for matching without destroying original display label.
3. Classify primary labels using a centralized allowlist.
4. Collapse size rows into one `OcrFieldView` in `primary`.
5. Deduplicate fields by normalized label + value.

### Business Rules

1. `Thông tin chính` must contain the operational garment label identifiers, not only the product name.
2. `Thông tin khác` is only for non-primary fields that are not in the primary allowlist.
3. `Bảng size` must not render as a standalone table in scan detail.
4. Size/quantity must appear as one row in `Thông tin chính`.
5. Raw OCR text must remain visible as a fallback/debug reference.
6. Existing scan detail metadata remains visible:
   - Time
   - Status
   - User
   - Overall confidence
   - Product
7. No backend schema change is required for this TIP; handle current response shapes defensively.

### Validation

1. Do not trust structured OCR shape. Validate/narrow `unknown` before reading fields.
2. Ignore empty/null/undefined OCR fields.
3. Do not render duplicate fields if the same data appears in raw structured fields and metadata.
4. If size/quantity rows are malformed, omit malformed rows and keep rendering the rest.
5. If there are no structured fields, show a friendly empty state for classified sections and keep raw OCR text.

### Error Handling

1. Invalid structured OCR data must not crash the dialog.
2. If parsing fails, show raw OCR text and existing metadata.
3. Do not throw from render helpers; return empty arrays/fallbacks.
4. Keep current loading and error states intact.

## ACCEPTANCE CRITERIA

- Given a scan detail response with fields `商品名`, `契約No.`, `CT No.`, and `MADE IN VIETNAM` When the detail dialog opens Then all four fields appear under `Thông tin chính`.
- Given a scan detail response with `Size M = 10` and `Size L = 10` When the detail dialog opens Then there is no standalone `Bảng size`; instead `Thông tin chính` includes one `Size / Số lượng` field with `M: 10, L: 10`.
- Given fields with confidence values When rendered Then each visible field shows its own `Tin cậy` value only if provided by the response.
- Given non-primary OCR fields When rendered Then they appear under `Thông tin khác`.
- Given malformed or missing structured OCR data When the dialog opens Then the UI does not crash and raw `Nội dung OCR` remains visible.
- Given existing scan list and delete flows When this TIP is complete Then scan list, delete dialog, export, and notification flows still behave as before.

## CONSTRAINTS

- DO NOT: Create backend tables or require backend API changes.
- DO NOT: Hardcode one sample response as the only supported format.
- DO NOT: Remove raw OCR text from scan detail.
- DO NOT: Render a separate `Bảng size` section.
- DO NOT: Fake confidence values when the backend did not provide them.
- REUSE: Existing `Dialog`, `Badge`, `Button`, and scan detail metadata layout.
- REUSE: Existing `mapScan()` adapter pattern for camelCase/snake_case compatibility.
- SKIP: OCR editing, manual correction workflow, backend OCR prompt changes, export changes.

## QUALITY GATE

| Check | Status | Notes |
|-------|--------|-------|
| TIP is one cohesive unit | ✅ | Focused on scan detail OCR field classification only |
| Self-contained implementation instructions | ✅ | Files, helpers, field rules, and fallbacks specified |
| Acceptance criteria are Given/When/Then | ✅ | Covers primary fields, size collapse, confidence, malformed data |
| Explicit constraints included | ✅ | No backend changes, no separate size table, no fake confidence |
| Cross-reference with requirements | ✅ | Extends REQ-021 Scan detail view and TIP-010 |
| Standards checked | ✅ | No standards directory initialized |
| Risks/gaps declared | ⚠️ | Exact backend OCR response shape is unknown; builder must inspect live/API response and support multiple shapes defensively |
