# SPEC: HLVN Dashboard Users Management UI (TIP-003)

## AC-UI-01: Users page renders under dashboard shell
- Given: authenticated admin visits `/users`
- When: page loads
- Then: users table with columns: Email, Role, Last Login, Created At, Actions

## AC-UI-02: Loading state shows skeleton rows
- Given: users data is being fetched
- When: page renders
- Then: table shows 5 skeleton rows with pulsing animation

## AC-UI-03: Empty state shows friendly message
- Given: no users exist
- When: table renders with empty data
- Then: displays "No users found." message

## AC-UI-04: Error state shows retry button
- Given: API request fails
- When: error is returned
- Then: displays error message with "Retry" button

## AC-UI-05: Search filters by email
- Given: users list is loaded
- When: admin types in search input and submits
- Then: URL updates with `?search=<query>`
- And: table refreshes with filtered results

## AC-UI-06: Role filter narrows results
- Given: users list is loaded
- When: admin selects role filter
- Then: URL updates with `?role=<value>`
- And: table refreshes showing only matching role

## AC-UI-07: Create user dialog validates input
- Given: admin clicks "+ Create User"
- When: dialog opens
- Then: form has email, password, role fields
- And: empty submission shows validation errors
- And: invalid email shows error

## AC-UI-08: Create user submits successfully
- Given: valid form data
- When: admin submits
- Then: POST /api/users is called
- And: on success: dialog closes, table refreshes, success toast appears
- And: on failure: error shown in dialog

## AC-UI-09: Edit role dialog updates user
- Given: admin clicks edit on a user row
- When: dialog opens with current role
- Then: admin can select new role and submit
- And: PATCH /api/users/:id/role is called
- And: on success: dialog closes, table refreshes

## AC-UI-10: Delete user requires confirmation
- Given: admin clicks delete on a user row
- When: confirmation dialog opens
- Then: shows user email for confirmation
- And: DELETE /api/users/:id is called on confirm
- And: on success: table refreshes

## AC-UI-11: Last-admin protection shows backend error
- Given: admin tries to delete/demote the last admin
- When: backend returns FORBIDDEN
- Then: error message shows: "Không thể thực hiện. Người dùng cuối cùng có vai trò này."

## AC-UI-12: Pagination controls page navigation
- Given: users list has multiple pages
- When: admin clicks Next/Prev or page number
- Then: URL updates with `?page=<number>`
- And: table refreshes with correct page data

## AC-UI-13: Mock mode renders with NEXT_PUBLIC_USE_MOCK_API=true
- Given: `NEXT_PUBLIC_USE_MOCK_API=true`
- When: `/users` page loads
- Then: mock users render in table with hasMore pagination
- And: create/edit/delete mock calls work correctly