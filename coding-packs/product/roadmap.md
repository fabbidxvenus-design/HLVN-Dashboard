# Roadmap

## MVP (Phase 1) - Must-Have Features

### 1. Authentication & Authorization
- **Admin login**: Email + password authentication
- **JWT tokens**: Access token (15 min) + refresh token (7 days)
- **RBAC gate**: Only admin role can access dashboard
- **Session management**: Auto-refresh, logout, token revocation

### 2. User Management
- **CRUD operations**: Create, read, update, delete users
- **Role assignment**: Assign admin/manager/user roles
- **User list**: View all users with filter/search
- **User detail**: View user profile, activity, scan history
- **Password reset**: Admin can reset user passwords

### 3. History View (All Users)
- **Scan list**: View all scans across all users
- **Filter**: By user, date range, product name
- **Search**: Full-text search in OCR content
- **Detail view**: View scan details, OCR results, images
- **Export**: Export filtered results to Excel

### 4. Analytics Dashboard
- **KPI cards**: Total scans, active users, API usage, total cost
- **Charts**: Scan volume over time (daily/weekly/monthly)
- **Top products**: Most scanned products across all users
- **User activity**: Most active users
- **API usage**: Token usage and cost tracking

**Estimated Timeline**: 4-6 weeks (1 developer)

---

## Phase 2 - Post-MVP Enhancements

### 1. API Key Management
- **Key rotation**: Rotate OpenRouter API keys
- **Usage monitoring**: Track usage per key
- **Cost allocation**: Allocate costs to departments/teams
- **Quota management**: Set usage limits per user/team

### 2. Advanced Analytics
- **Trend analysis**: Week-over-week, month-over-month comparisons
- **Heatmaps**: Scan activity by time of day/day of week
- **Product insights**: Most common products, sizes, quantities
- **Error tracking**: OCR errors, API failures, retry rates

### 3. Bulk Operations
- **Bulk export**: Export all data to Excel/CSV
- **Bulk user import**: Import users from CSV
- **Bulk role assignment**: Change roles for multiple users

### 4. Audit Logs
- **Activity tracking**: Log all admin actions (create/edit/delete users)
- **Login history**: Track login attempts, IP addresses
- **Data access logs**: Who viewed which scans
- **Compliance reports**: Generate audit reports for compliance

### 5. Notifications
- **Email alerts**: Notify admins of quota limits, errors
- **Slack integration**: Send alerts to Slack channels
- **In-app notifications**: Real-time notifications in dashboard

**Estimated Timeline**: 3-4 weeks (Phase 2)

---

## Phase 3 - Future Considerations

- **Multi-tenancy**: Support multiple organizations
- **Advanced RBAC**: Custom roles with granular permissions
- **Data retention policies**: Auto-delete old scans
- **Backup/restore**: Manual backup and restore functionality
- **Dark mode**: Dark theme for dashboard
- **Mobile dashboard**: Responsive mobile view for admins

---

**Created**: 2026-05-08  
**Last updated**: 2026-05-08
