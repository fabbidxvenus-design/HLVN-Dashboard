# TIP-013: Create User Dialog (Users Page pt.2)

## HEADER
- TIP-ID: TIP-013
- Project: HLVN Dashboard
- Module: users
- Priority: P0
- Depends on: TIP-012
- Estimated: S (2h)

## CONTEXT
- Working dir: D:\scripts\HLVN\HLVN-dashboard
- Tech stack: Vite 6 + React 19 + react-hook-form + Zod + sonner
- Key files to read first: coding-packs/designs/stitch_hlvn_dashboard_redesign_v5/stitch_hlvn_dashboard_redesign_v5/hlvn_th_m_ng_i_d_ng_modal/code.html
- Patterns to follow: Dialog from TIP-006, react-hook-form + Zod validation

## APPLICABLE STANDARDS
None — standards directory not yet initialized.

## TASK
Build the create user dialog with form validation (email, password, role). Admin-only action. Calls `POST /api/users`.

## SPECIFICATIONS

### Files to Create

1. `src/components/users/CreateUserDialog.tsx` — Create user form dialog:
   - Form fields: email (required, valid email), password (required, min 8 chars), role (select: admin/manager/user)
   - Validation with Zod schema + react-hook-form
   - Submit calls `POST /api/users` with { email, password, role }
   - On success: toast "Đã tạo người dùng thành công" + close + refetch
   - On error: show API error message
   - Cancel + Submit buttons

2. `src/pages/UsersPage.tsx` — Integrate create dialog:
   - "Thêm người dùng" button opens CreateUserDialog
   - On create success → refetch table data

### Design Reference
- Screen: `hlvn_th_m_ng_i_d_ng_modal/screen.png`
- Dialog: medium width, form layout
- Inputs: filled style, labels above
- Buttons: Cancel (outlined) + Create (primary filled)

### Business Rules
1. Admin-only action (backend enforces)
2. Email must be valid format
3. Password minimum 8 characters
4. Role selection: admin, manager, user
5. On success: close dialog, show toast, refresh table

## ACCEPTANCE CRITERIA
- Given admin on users page When clicking "Thêm người dùng" Then create dialog opens
- Given create form When submitting valid data Then user created and table refreshes
- Given create form When email invalid Then shows validation error
- Given create form When password < 8 chars Then shows validation error
- Given successful creation When completed Then toast shows success message

## CONSTRAINTS
- DO NOT: Allow non-admin to see/use this dialog
- DO NOT: Implement email verification flow
- REUSE: Dialog, Input, Select, Button from TIP-006; react-hook-form + Zod
- SKIP: Avatar upload, additional profile fields
