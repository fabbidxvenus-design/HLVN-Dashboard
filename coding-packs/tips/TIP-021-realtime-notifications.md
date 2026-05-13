# TIP-021: Realtime Admin Notifications

## HEADER
- TIP-ID: TIP-021
- Project: HLVN Dashboard
- Module: notifications
- Priority: P1
- Depends on: TIP-003, TIP-004, TIP-005, TIP-020
- Estimated: L (4h)

## CONTEXT
- Working dir: D:\scripts\HLVN\HLVN-dashboard
- Tech stack: Vite + React 19 + TypeScript strict + Tailwind CSS + Zustand + React Router + sonner + lucide-react; backend is HLVN-serverless via `/api` proxy.
- Key files to read first:
  - `src/components/layout/DashboardHeader.tsx`
  - `src/components/ui/toaster.tsx`
  - `src/lib/api.ts`
  - `src/stores/auth-store.ts`
  - `src/pages/ScansPage.tsx`
  - `src/hooks/use-dashboard.ts`
  - Backend references in `D:\scripts\HLVN\HLVN-serverless\app\api\scans` and `D:\scripts\HLVN\HLVN-serverless\lib\scans`
- Patterns to follow:
  - Header action layout from `DashboardHeader.tsx`
  - API response envelope from `src/types/api.ts`
  - Vietnamese UI copy and sonner toast conventions from TIP-020
  - Existing auth role model: admin-only dashboard actions

## APPLICABLE STANDARDS
None — `coding-packs/standards/README.md` not found.

## TASK
Build a realtime admin notification center for the dashboard bell button. Notifications are activity-derived, admin-only, and should reflect important operational events such as new scans, scan deletion, user creation, role changes, and API/export failures where observable from the frontend/backend integration. The bell must no longer be a placeholder: it must open a notification panel with unread count, notification items, and mark-read behavior.

## SPECIFICATIONS

### Files to Create

1. `src/types/notification.ts`
   - Define `NotificationType` union: `scan_created`, `scan_deleted`, `user_created`, `role_updated`, `system_error`.
   - Define `NotificationItem` with:
     - `id: string`
     - `type: NotificationType`
     - `title: string`
     - `description: string`
     - `createdAt: string`
     - `read: boolean`
     - `href?: string`
     - `severity: 'info' | 'success' | 'warning' | 'error'`

2. `src/stores/notification-store.ts`
   - Zustand store for admin notifications.
   - State: `items`, `isOpen`, `lastSeenAt`, `connected`, `error`.
   - Derived selectors/helpers:
     - unread count
     - sorted newest-first items
   - Actions:
     - `openPanel()`
     - `closePanel()`
     - `addNotification(item)`
     - `markAsRead(id)`
     - `markAllAsRead()`
     - `clearAll()`
     - `setConnected(connected)`
     - `setError(error)`
   - Persist notifications and read state in localStorage so refresh does not lose unread/read status.

3. `src/components/notifications/NotificationBell.tsx`
   - Header bell button component.
   - Shows unread count badge only when unread count > 0.
   - Click opens/closes notification panel.
   - Accessible label reflects count, e.g. `Thông báo, 3 chưa đọc`.
   - Keyboard accessible with Enter/Space.

4. `src/components/notifications/NotificationPanel.tsx`
   - Popover/dropdown panel anchored near header right side.
   - Shows:
     - title `Thông báo`
     - connection/status text: `Đang theo dõi hoạt động realtime` or error message
     - `Đánh dấu tất cả đã đọc` action when unread > 0
     - empty state: `Chưa có thông báo`
     - list of notification rows with icon/severity, title, description, relative or formatted time, unread indicator
   - Item click marks read and navigates to `href` if present.
   - Panel must close when clicking outside or pressing Escape.

5. `src/hooks/use-admin-notifications.ts`
   - Initializes notification feed only when current user is admin.
   - Activity-derived source:
     - Prefer Supabase Realtime if existing project Supabase client/config supports subscribing to `scans` and user/profile changes.
     - If Supabase Realtime is not available in the current frontend, use lightweight polling as fallback without backend schema changes.
   - For polling fallback:
     - Poll latest scans from `/api/scans?page=1&limit=5` every 15 seconds.
     - Compare scan IDs with previous seen IDs.
     - Add `scan_created` notifications only for newly observed IDs after initial hydration.
     - Do not generate notifications for historical rows on first load.
   - Expose connection/error state through the notification store.

### Files to Modify

6. `src/components/layout/DashboardHeader.tsx`
   - Replace inline bell button/toast placeholder with `<NotificationBell />`.
   - Remove placeholder toast `Tính năng thông báo đang được phát triển`.
   - Keep user info aligned at far right.

7. `src/App.tsx` or dashboard shell entry point
   - Mount `useAdminNotifications()` once inside the authenticated dashboard shell so notification tracking starts after login.
   - Ensure it does not run on login page or for non-admin users.

8. `src/pages/ScansPage.tsx`
   - When deleting a scan successfully, add a `scan_deleted` notification for admin with scan/product info if available.
   - Do not duplicate notifications already produced by the realtime/polling scan feed.

9. `src/pages/UsersPage.tsx`
   - When user creation succeeds, add `user_created` notification.
   - When role update succeeds, add `role_updated` notification with email and new role.
   - Only admin should generate/see these notifications.

10. `src/lib/api.ts`
   - If a foreground API call fails with a user-visible operational error after auth refresh retry, optionally add `system_error` notification only for admin-visible operations.
   - Do not notify for expected validation errors on forms unless the action failed after submit.

## SPECIFICATIONS

### Business Rules
1. Notification center is admin-only. Non-admin users must not see unread counts or activity notifications.
2. The bell button must always be clickable for admin users and open a real panel, not a placeholder toast.
3. Unread badge must appear only when unread count > 0.
4. First load must not spam notifications for existing historical scans.
5. New scan notifications must be generated only for records discovered after notification tracking starts.
6. User/action notifications must be generated after successful create/update/delete actions, not before API confirmation.
7. Notification messages must be in Vietnamese.
8. Notification state should survive page refresh using localStorage.
9. The panel must remain usable if realtime subscription fails; show error/status and continue with fallback polling when possible.
10. Dashboard polling and notification polling must not block normal UI rendering.

### Validation
1. Validate all notification objects before adding to store:
   - `id`, `type`, `title`, `description`, `createdAt`, `severity` required.
   - Unknown type/severity should be ignored or coerced to safe `info` only at boundary.
2. Prevent duplicate notifications by ID.
3. Cap stored notifications to latest 50 items.
4. If `href` is present, it must be an internal app path beginning with `/`.

### Error Handling
1. If notification feed fails auth with `AUTH_FAILED`, rely on existing API auto-refresh; if still failing, set notification store error to `Không thể tải thông báo`.
2. If polling fails due to network/backend error, keep existing notifications visible and show non-blocking status in panel.
3. If localStorage persistence fails, continue in-memory without crashing.
4. If navigation from a notification item fails, keep the panel open and do not mark read until click handler completes successfully.

## ACCEPTANCE CRITERIA
- Given an admin user with no notifications When opening the bell panel Then the panel shows `Chưa có thông báo` and no red unread badge.
- Given an admin user and a newly observed scan after initial hydration When the polling/realtime feed detects it Then the bell shows unread count 1 and the panel lists a `scan_created` notification.
- Given unread notifications When the admin opens the panel and clicks `Đánh dấu tất cả đã đọc` Then all unread indicators disappear and the bell badge is hidden.
- Given an admin creates a user successfully When the API returns success Then a `user_created` notification appears with that email.
- Given an admin changes a user's role successfully When the API returns success Then a `role_updated` notification appears with email and new role.
- Given the admin deletes a scan successfully When the API returns success Then a `scan_deleted` notification appears.
- Given a non-admin user When viewing the dashboard Then notification tracking does not run and admin activity notifications are not shown.
- Given notification feed fails temporarily When the panel is opened Then existing notifications remain visible and a non-blocking error/status message is shown.
- Given the page is refreshed When notifications were previously unread/read Then localStorage persistence restores the same read state.
- Given keyboard focus is on the bell When pressing Enter or Space Then the notification panel opens; when pressing Escape inside the panel Then it closes.

## CONSTRAINTS
- DO NOT: Leave the bell as a placeholder toast.
- DO NOT: Show a fake unread dot when there are no unread notifications.
- DO NOT: Add push notifications, email notifications, service workers, or browser permission prompts in this TIP.
- DO NOT: Require mobile responsive redesign; this project is desktop-first per REQ-063.
- DO NOT: Generate notifications from historical rows on initial load.
- DO NOT: Store secrets or tokens in notification state.
- REUSE: Existing `DashboardHeader`, `sonner`, `api` wrapper, Zustand patterns, Tailwind CSS variables, lucide-react icons.
- REUSE: Existing `/api/scans`, `/api/users`, and CRUD success handlers where possible.
- SKIP: Backend notification table unless activity-derived realtime/polling cannot satisfy requirements.
- SKIP: Cross-device notification sync; localStorage persistence is sufficient for this TIP.

## QUALITY GATE SELF-REVIEW

| Check | Status | Notes |
|-------|--------|-------|
| One cohesive implementation unit | PASS | Notification center is one feature/module. |
| Self-contained instructions | PASS | Files, behavior, validation, errors, and acceptance criteria specified. |
| Clarifying scope confirmed by UYQ | PASS | User chose Realtime full + Activity-derived + Admin only. |
| Existing context read | PASS | Project context, requirements matrix, task graph, and TIP-020 read. |
| Applicable standards checked | PASS | No standards index found. |
| Acceptance criteria are Given/When/Then | PASS | 10 scenarios included. |
| Constraints explicit | PASS | Placeholder, fake dots, push/email, and historical spam forbidden. |
| Architecture consistency | PASS | Uses existing Vite React, Zustand, API wrapper, sonner, dashboard shell. |
| Gaps declared | PASS | Supabase Realtime availability uncertain; polling fallback specified. |
