# TIP-014: Edit Role + Delete User Dialogs (Users Page pt.3)

## HEADER
- TIP-ID: TIP-014
- Project: HLVN Dashboard
- Module: users
- Priority: P1
- Depends on: TIP-012
- Estimated: S (2h)

## CONTEXT
- Working dir: D:\scripts\HLVN\HLVN-dashboard
- Tech stack: Vite 6 + React 19 + react-hook-form + Zod + sonner
- Key files to read first: coding-packs/designs/stitch_hlvn_dashboard_redesign_v5/stitch_hlvn_dashboard_redesign_v5/hlvn_qu_n_l_ng_i_d_ng_1440px_2/code.html
- Patterns to follow: Dialog from TIP-006, same pattern as TIP-011 (delete) and TIP-013 (form)

## APPLICABLE STANDARDS
None — standards directory not yet initialized.

## TASK
Build edit user role dialog and delete user confirmation dialog. Admin-only actions. Calls `PATCH /api/users/[id]/role` and `DELETE /api/users/[id]`.

## SPECIFICATIONS

### Files to Create

1. `src/components/users/EditUserRoleDialog.tsx` — Edit role dialog:
   - Props: user (UserProfile), isOpen, onClose, onUpdated
   - Shows current user email (read-only)
   - Role select: admin, manager, user
   - Submit calls `PATCH /api/users/[id]/role` with { role }
   - On success: toast + close + refetch
   - On error: show error (e.g., "Cannot remove last admin")

2. `src/components/users/DeleteUserDialog.tsx` — Delete confirmation:
   - Props: user (UserProfile), isOpen, onClose, onDeleted
   - Warning: "Bạn có chắc muốn xóa người dùng {email}? Tất cả dữ liệu quét sẽ bị xóa."
   - Cancel + Delete buttons
   - Calls `DELETE /api/users/[id]`
   - On success: toast + close + refetch

3. `src/components/users/UsersTable.tsx` — Update actions:
   - Edit role button (pencil icon)
   - Delete button (trash icon, destructive)

4. `src/pages/UsersPage.tsx` — Integrate dialogs:
   - State for edit/delete target user
   - On success → refetch table

### Design Reference
- Screen: `hlvn_qu_n_l_ng_i_d_ng_1440px_2/screen.png`
- Edit dialog: compact form with role select
- Delete dialog: same pattern as scan delete (TIP-011)

### Business Rules
1. Admin-only actions (backend enforces)
2. Cannot remove last admin (backend returns error)
3. Delete cascades: removes user + all their scans + storage
4. Must confirm before delete
5. Edit role: select from admin/manager/user

## ACCEPTANCE CRITERIA
- Given admin When clicking edit on user row Then edit role dialog opens
- Given edit dialog When changing role and submitting Then role updated + toast shown
- Given edit dialog When trying to remove last admin Then shows error
- Given admin When clicking delete on user row Then confirmation dialog opens
- Given delete confirmed When completed Then user deleted + table refreshes

## CONSTRAINTS
- DO NOT: Allow self-deletion or self-role-change
- DO NOT: Allow delete without confirmation
- REUSE: Dialog, Select, Button from TIP-006; toast from sonner; same patterns as TIP-011
- SKIP: Bulk operations, user profile editing beyond role
