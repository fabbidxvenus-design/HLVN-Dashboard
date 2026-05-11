# Role-Based Access Control (RBAC) with Admin Gate

## Rule

All users MUST have a role (`admin`, `manager`, `user`). Dashboard access is RESTRICTED to `admin` role only. Mobile app allows all roles. Backend enforces role checks on all protected endpoints.

## Role Definitions

```typescript
type UserRole = 'admin' | 'manager' | 'user';

interface RolePermissions {
  // Mobile App Permissions
  canScanOCR: boolean;
  canViewOwnHistory: boolean;
  canExportOwnData: boolean;
  canEditOwnScans: boolean;
  
  // Dashboard Permissions
  canAccessDashboard: boolean;
  canManageUsers: boolean;
  canViewAllHistory: boolean;
  canExportAllData: boolean;
  canManageAPIKeys: boolean;
  canViewAnalytics: boolean;
}

const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  admin: {
    // Mobile
    canScanOCR: true,
    canViewOwnHistory: true,
    canExportOwnData: true,
    canEditOwnScans: true,
    // Dashboard
    canAccessDashboard: true,
    canManageUsers: true,
    canViewAllHistory: true,
    canExportAllData: true,
    canManageAPIKeys: true,
    canViewAnalytics: true,
  },
  manager: {
    // Mobile
    canScanOCR: true,
    canViewOwnHistory: true,
    canExportOwnData: true,
    canEditOwnScans: true,
    // Dashboard
    canAccessDashboard: false, // ❌ Cannot access dashboard
    canManageUsers: false,
    canViewAllHistory: false,
    canExportAllData: false,
    canManageAPIKeys: false,
    canViewAnalytics: false,
  },
  user: {
    // Mobile
    canScanOCR: true,
    canViewOwnHistory: true,
    canExportOwnData: true,
    canEditOwnScans: true,
    // Dashboard
    canAccessDashboard: false, // ❌ Cannot access dashboard
    canManageUsers: false,
    canViewAllHistory: false,
    canExportAllData: false,
    canManageAPIKeys: false,
    canViewAnalytics: false,
  },
};
```

## Backend Implementation

```typescript
// Backend: Role check middleware
function requireRole(...allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; // Set by JWT verification middleware
    
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ 
        error: 'Forbidden',
        message: `Requires role: ${allowedRoles.join(' or ')}`,
      });
    }
    
    next();
  };
}

// Backend: Dashboard routes (admin only)
app.get('/api/dashboard/users', 
  verifyAccessToken, 
  requireRole('admin'), 
  listUsers
);

app.get('/api/dashboard/analytics', 
  verifyAccessToken, 
  requireRole('admin'), 
  getAnalytics
);

// Backend: Mobile routes (all authenticated users)
app.post('/api/ocr/process', 
  verifyAccessToken, 
  requireRole('admin', 'manager', 'user'), 
  processOCR
);

app.get('/api/scans/my-history', 
  verifyAccessToken, 
  requireRole('admin', 'manager', 'user'), 
  getMyHistory
);
```

## Frontend Implementation

### Dashboard (Admin Gate)

```typescript
// Dashboard: Root-level role check
function DashboardApp() {
  const user = useAuthStore(state => state.user);
  
  // Redirect non-admins to mobile app
  if (user && user.role !== 'admin') {
    return <Navigate to="/mobile" replace />;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <DashboardLayout />;
}

// Dashboard: Login page shows error for non-admins
async function handleLogin(email: string, password: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  const { user, accessToken, refreshToken } = await response.json();
  
  // Check role before storing tokens
  if (user.role !== 'admin') {
    throw new Error('Chỉ admin mới có thể truy cập dashboard. Vui lòng sử dụng mobile app.');
  }
  
  authManager.setTokens(accessToken, refreshToken);
  authStore.setUser(user);
}
```

### Mobile App (All Roles)

```typescript
// Mobile: All authenticated users allowed
function MobileApp() {
  const user = useAuthStore(state => state.user);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // All roles can use mobile app
  return <MobileLayout />;
}
```

## Database Schema

```typescript
// User table
interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'manager' | 'user';
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
}
```

## Why

**Problem**: Without role checks, any authenticated user could access admin dashboard and view/modify all data. Mobile app and dashboard have different security requirements.

**Solution**: Role-based permissions enforced at backend (cannot be bypassed) and frontend (better UX). Admin-only dashboard ensures only trusted users manage system.

**Benefits**:
- Clear separation: mobile app (all users) vs dashboard (admin only)
- Backend enforcement prevents privilege escalation
- Frontend checks provide immediate feedback
- Easy to extend with more roles/permissions later

## How to Apply

### Backend Setup
1. Add `role` column to users table (default: `user`)
2. Include `role` in JWT access token payload
3. Add `requireRole()` middleware to all protected routes
4. Return 403 Forbidden for insufficient permissions

### Frontend Setup
1. Store user role in auth store (from JWT)
2. Add role check in dashboard root component
3. Show clear error message for non-admins trying to access dashboard
4. Redirect non-admins to mobile app

### User Management
1. Only admins can create/edit users
2. Only admins can change user roles
3. Cannot demote last admin (prevent lockout)
4. Audit log for role changes

## Security Notes

- **Backend enforcement**: Always check role on backend, never trust frontend
- **JWT payload**: Include role in access token (no DB lookup on every request)
- **Role changes**: Require re-login after role change (invalidate old tokens)
- **Audit trail**: Log all role checks and permission denials

## Exceptions

- **Development**: Allow `manager` role to access dashboard for testing (remove in production)
- **Emergency**: Provide super-admin override (requires 2FA)

---

**Source**: Industry standard RBAC pattern  
**Adapted for**: Mobile app (all roles) + Dashboard (admin only)  
**Last updated**: 2026-05-08
