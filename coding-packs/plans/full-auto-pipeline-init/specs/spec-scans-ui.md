# SPEC: HLVN Dashboard Scans History UI (TIP-004)

## AC-SC-01: Scans page renders under dashboard shell
- Given: authenticated admin visits `/scans`
- When: page loads
- Then: scans table with columns: Thumbnail, OCR Summary, User, Time, Token Usage, Edited, Actions

## AC-SC-02: Loading state shows skeleton rows
- Given: scans data is being fetched
- When: page renders
- Then: table shows 5 skeleton rows with pulsing animation

## AC-SC-03: Empty state shows friendly message
- Given: no scans exist
- When: table renders with empty data
- Then: displays "No scans found." message

## AC-SC-04: Error state shows retry button
- Given: API request fails
- When: error is returned
- Then: displays error message with "Retry" button

## AC-SC-05: Search filters by OCR content
- Given: scans list is loaded
- When: admin types in search input
- Then: URL updates with `?search=<query>`

## AC-SC-06: User filter narrows results
- Given: scans list is loaded
- When: admin selects user filter
- Then: URL updates with `?userId=<value>`

## AC-SC-07: Date range filter narrows results
- Given: scans list is loaded
- When: admin selects date range
- Then: URL updates with `?from=<date>&to=<date>`

## AC-SC-08: Scan detail dialog displays complete data
- Given: admin clicks View on a scan row
- When: dialog opens
- Then: displays image, metadata, OCR fields, sizes, token usage
- And: fetches fresh data from `GET /api/scans/:id`

## AC-SC-09: Delete scan requires confirmation
- Given: admin clicks delete on a scan row
- When: confirmation dialog opens
- Then: DELETE /api/scans/:id is called on confirm
- And: on success: table refreshes

## AC-SC-10: Export triggers file download
- Given: admin clicks Export Excel
- When: filters are set
- Then: POST /api/export/excel is called with current filters
- And: on success: file downloads or download URL is used
- And: loading state shows during request

## AC-SC-11: Pagination controls page navigation
- Given: scans list has multiple pages
- When: admin clicks Next/Prev or page number
- Then: URL updates with `?page=<number>`

## AC-SC-12: Images have explicit dimensions
- Given: scan has imageUrl
- When: thumbnail renders
- Then: explicit 64x64px dimensions and alt text
- And: no layout shift

## AC-SC-13: Mock mode renders with NEXT_PUBLIC_USE_MOCK_API=true
- Given: `NEXT_PUBLIC_USE_MOCK_API=true`
- When: `/scans` page loads
- Then: mock scans render with camelCase fields (userId, imageUrl, ocrStructured.rawText, tokenUsage.input/output/cost)
- And: pagination with hasMore meta
- And: export mock simulates download