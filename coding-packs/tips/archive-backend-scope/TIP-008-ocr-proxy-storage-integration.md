# TIP-008: OCR Proxy + Storage Integration

## HEADER
- **TIP-ID**: TIP-008
- **Project**: HLVN Dashboard
- **Module**: OCR API Integration
- **Priority**: P0
- **Depends on**: TIP-007
- **Estimated**: M (10 hours)

## CONTEXT
- **Working dir**: `D:\scripts\HLVN\HLVN-dashboard`
- **Tech stack**: Next.js 15 API Routes, Supabase Auth/Storage/PostgreSQL, OpenRouter
- **Key files to read first**:
  - `coding-packs/standards/api/multi-key-fallback.md`
  - `coding-packs/standards/api/retry-backoff.md`
  - `coding-packs/BUILDER-HANDOFF.md` OCR Proxy contract
- **Patterns to follow**: Backend-managed API keys, retry transient OpenRouter errors, persist scan metadata after OCR succeeds.

## APPLICABLE STANDARDS
- [`api/multi-key-fallback`](../standards/api/multi-key-fallback.md) — OpenRouter keys are server-side and tried sequentially.
- [`api/retry-backoff`](../standards/api/retry-backoff.md) — retry 503/429/timeouts with 1s/2s/4s backoff.
- [`auth/supabase-auth-rls`](../standards/auth/supabase-auth-rls.md) — all authenticated roles can create own scans.
- [`auth/rbac-admin-gate`](../standards/auth/rbac-admin-gate.md) — dashboard admin-only remains enforced elsewhere; OCR route allows all authenticated roles.

## TASK
Implement `/api/v1/ocr/process` backend proxy for mobile/dashboard clients. Accept authenticated image upload, upload image to Supabase Storage, call OpenRouter with multi-key fallback and retry, parse OCR JSON, store scan record, and return structured OCR result.

## SPECIFICATIONS

### Business Rules
1. OCR route accepts all authenticated roles: `admin`, `manager`, `user`.
2. OpenRouter API keys must only exist in server-side env vars: `OPENROUTER_KEY_1`, `OPENROUTER_KEY_2`, `OPENROUTER_KEY_3`.
3. Frontend/mobile clients must never call OpenRouter directly.
4. Retry only transient errors: 503, 429, network timeout, service unavailable.
5. Fallback tries next key if current key fails with retryable/quota/rate-limit errors.
6. Store `api_key_index` used for successful OCR.
7. Store token usage and cost per scan.
8. Upload image to Supabase Storage bucket `scan-images` before or after OCR; if OCR fails, avoid orphaning image where practical.
9. Store OCR structured data as JSONB in `scans.ocr_structured`.

### Files to Create/Modify
- `app/api/v1/ocr/process/route.ts`
- `lib/ocr/openrouter.ts`
- `lib/ocr/key-fallback.ts`
- `lib/ocr/retry.ts`
- `lib/ocr/json-extract.ts`
- `lib/ocr/prompt.ts`
- `lib/storage/scan-images.ts`
- `types/scan.ts`
- `.env.example` (OpenRouter env vars)

### API Contract
**POST /api/v1/ocr/process**
- Request: `multipart/form-data`
  - `image`: File (required)
  - `modelTier`: `free | default | high` (optional)
- Response:
  ```ts
  {
    success: true,
    data: {
      scan: ScanRecord;
      structured: OCRResponse;
      tokenUsage: TokenUsage;
      apiKeyIndex: number;
    }
  }
  ```
- Auth: any authenticated role.
- Errors: 400 invalid image, 401 unauthenticated, 403 invalid role, 429 rate-limited, 500 persistence failure, 502 OpenRouter invalid response, 503 all keys unavailable.

### OCR Helpers

**`retryWithBackoff`**
- Max retries: 3.
- Delays: 1s, 2s, 4s.
- Retry only transient errors.
- Do not retry 400/401/403 invalid request/auth errors.

**`callWithFallback`**
- Read keys from env.
- Try key index 1..N.
- Wrap each key call with retry.
- Return `{ result, keyIndex }`.
- Throw generic error if all keys fail.

**`extractOCRJson`**
- Parse direct JSON.
- Parse JSON inside markdown code fence.
- Return validation error if OCR shape invalid.

### Storage
- Bucket: `scan-images`.
- Path: `{user_id}/{scan_id}/{timestamp}.webp` or original extension if image conversion is not implemented.
- Store URL in `scans.image_url`.
- Use signed URL/private bucket if images are sensitive; document decision.

### Validation
- File is required.
- File type must be image (`image/jpeg`, `image/png`, `image/webp`).
- Max file size should be configured (suggest 10MB).
- `modelTier` must be one of allowed values.
- OCR response must match `OCRResponse` shape.

### Error Handling
- Never return OpenRouter raw payload or API key in client response.
- Log key index and error category server-side.
- If storage upload succeeds but database insert fails, log orphan path and attempt cleanup.
- If OpenRouter returns malformed JSON, return 502 with friendly message.

## ACCEPTANCE CRITERIA
- Given authenticated user When uploading valid image Then OCR route returns structured data and scan record.
- Given missing image When calling OCR route Then response is 400.
- Given unauthenticated request When calling OCR route Then response is 401.
- Given first OpenRouter key rate-limits When second key succeeds Then response includes `apiKeyIndex: 2` and scan stores `api_key_index = 2`.
- Given transient 503 When OpenRouter recovers after retry Then route succeeds without trying next key unnecessarily.
- Given malformed OCR JSON When OpenRouter responds Then route returns 502 and does not store invalid scan.
- Given successful OCR When database is queried Then `scans` row contains `ocr_structured`, `token_usage`, `image_url`, `api_key_index`, and `user_id`.

## CONSTRAINTS
### DO NOT
- Do NOT expose OpenRouter keys to client.
- Do NOT call OpenRouter directly from UI.
- Do NOT retry non-idempotent persistence operations blindly.
- Do NOT store base64 images in PostgreSQL.

### REUSE
- Reuse retry/fallback patterns from standards.
- Reuse scan types from TIP-006.
- Reuse API response helpers from TIP-004.

### SKIP
- Skip admin API key management UI (Phase 2).
- Skip model tier analytics beyond storing `model_tier`.
- Skip background OCR jobs; process synchronously for MVP.

## QUALITY GATE: TIP Self-Review
- [x] TIP applies multi-key fallback and retry-backoff standards.
- [x] OCR proxy contract matches Builder Handoff.
- [x] Covers REQ-API-001 through REQ-API-006 and REQ-SYNC-001 through REQ-SYNC-005.
- [x] Security constraints are explicit.

**Verdict**: PASSED — ready after TIP-007.
