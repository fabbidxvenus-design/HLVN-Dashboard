# TIP-011: Scan Delete + Actions (Scans Page pt.3)

## HEADER
- TIP-ID: TIP-011
- Project: HLVN Dashboard
- Module: scans
- Priority: P1
- Depends on: TIP-009
- Estimated: S (2h)

## CONTEXT
- Working dir: D:\scripts\HLVN\HLVN-dashboard
- Tech stack: Vite 6 + React 19 + TypeScript strict + sonner (toasts)
- Key files to read first: coding-packs/designs/stitch_hlvn_dashboard_redesign_v5/stitch_hlvn_dashboard_redesign_v5/hlvn_x_c_nh_n_x_a_modal/code.html
- Patterns to follow: Dialog from TIP-006, API client from TIP-004

## APPLICABLE STANDARDS
None — standards directory not yet initialized.

## TASK
Implement scan delete functionality with confirmation dialog (admin only). Add action buttons to scan table rows and integrate toast notifications for success/error feedback.

## SPECIFICATIONS

### Files to Create

1. `src/components/scans/DeleteScanDialog.tsx` — Delete confirmation:
   - Props: scanId, isOpen, onClose, onDeleted
   - Warning message: "Bạn có chắc muốn xóa lượt quét này?"
   - Cancel button (outlined) + Delete button (destructive)
   - Calls `DELETE /api/scans/[id]`
   - On success: toast notification + close + trigger refetch
   - On error: toast error message

2. `src/components/scans/ScansTable.tsx` — Update with actions column:
   - Add actions column with delete button (admin only)
   - Delete button: trash icon, destructive variant
   - On click → open DeleteScanDialog

3. `src/pages/ScansPage.tsx` — Integrate delete dialog:
   - State for delete target scan ID
   - On delete success → refetch table data

### Design Reference
- Delete modal: `hlvn_x_c_nh_n_x_a_modal/screen.png`
- Dialog: compact, centered, warning icon
- Buttons: Cancel (outlined) + Delete (destructive/red)

### Business Rules
1. Delete ONLY available for admin role
2. Delete calls `DELETE /api/scans/[id]` (admin only, backend enforces)
3. Must show confirmation dialog before delete
4. On success: show toast "Đã xóa lượt quét thành công"
5. On error: show toast with error message from API

## ACCEPTANCE CRITERIA
- Given admin user When clicking delete on scan row Then confirmation dialog opens
- Given confirmation dialog When clicking "Xóa" Then scan is deleted and table refreshes
- Given confirmation dialog When clicking "Hủy" Then dialog closes without action
- Given successful delete When completed Then toast shows success message
- Given non-admin user When viewing table Then delete button is hidden

## CONSTRAINTS
- DO NOT: Allow delete without confirmation
- DO NOT: Show delete button for non-admin users
- REUSE: Dialog, Button from TIP-006; API client from TIP-004; toast from sonner
- SKIP: Bulk delete, undo functionality
