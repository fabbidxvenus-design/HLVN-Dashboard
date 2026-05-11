# JWT Authentication with Refresh Tokens

## Rule

Both mobile app and dashboard MUST use JWT-based authentication with access tokens (short-lived) and refresh tokens (long-lived). Backend issues tokens, frontend stores and refreshes them automatically.

## Token Structure

```typescript
// Access Token (short-lived: 15 minutes)
interface AccessTokenPayload {
  userId: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  iat: number; // issued at
  exp: number; // expires at (15 min from iat)
}

// Refresh Token (long-lived: 7 days)
interface RefreshTokenPayload {
  userId: string;
  tokenId: string; // unique ID for revocation
  iat: number;
  exp: number; // expires at (7 days from iat)
}
```

## Backend Implementation

```typescript
// Backend: Token generation
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET;

function generateTokens(user: User) {
  const accessToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    {
      userId: user.id,
      tokenId: generateTokenId(), // UUID for revocation
    },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
}

// Backend: Token verification middleware
function verifyAccessToken(token: string): AccessTokenPayload {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as AccessTokenPayload;
  } catch (error) {
    throw new Error('INVALID_TOKEN');
  }
}

// Backend: Refresh endpoint
async function refreshAccessToken(refreshToken: string) {
  const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as RefreshTokenPayload;
  
  // Check if refresh token is revoked
  const isRevoked = await checkTokenRevocation(payload.tokenId);
  if (isRevoked) {
    throw new Error('TOKEN_REVOKED');
  }

  // Get user and generate new access token
  const user = await getUserById(payload.userId);
  const accessToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );

  return { accessToken };
}
```

## Frontend Implementation

```typescript
// Frontend: Token storage
class AuthTokenManager {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  setTokens(access: string, refresh: string) {
    this.accessToken = access;
    this.refreshToken = refresh;
    localStorage.setItem('refreshToken', refresh);
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  async refreshAccessToken(): Promise<string> {
    const refresh = localStorage.getItem('refreshToken');
    if (!refresh) {
      throw new Error('NO_REFRESH_TOKEN');
    }

    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: refresh }),
    });

    if (!response.ok) {
      this.clearTokens();
      throw new Error('REFRESH_FAILED');
    }

    const { accessToken } = await response.json();
    this.accessToken = accessToken;
    return accessToken;
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('refreshToken');
  }
}

// Frontend: Auto-refresh interceptor
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  let token = authManager.getAccessToken();

  // Try request with current token
  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  });

  // If 401, try to refresh and retry
  if (response.status === 401) {
    try {
      token = await authManager.refreshAccessToken();
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      // Refresh failed, redirect to login
      window.location.href = '/login';
      throw error;
    }
  }

  return response;
}
```

## Why

**Problem**: Session-based auth requires server-side session storage (Redis/DB), doesn't scale well for serverless. Long-lived tokens are insecure if stolen.

**Solution**: JWT access tokens are stateless (no DB lookup), short expiry limits damage from theft. Refresh tokens allow seamless re-authentication without re-login.

**Benefits**:
- Stateless authentication (no session DB)
- Works with serverless (Lambda)
- Short access token expiry (15 min) limits theft damage
- Long refresh token (7 days) reduces login friction
- Refresh tokens can be revoked (logout all devices)

## How to Apply

### Backend Setup
1. Generate strong secrets: `openssl rand -base64 64`
2. Store in AWS Secrets Manager: `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`
3. Implement `/api/auth/login` (returns both tokens)
4. Implement `/api/auth/refresh` (returns new access token)
5. Implement `/api/auth/logout` (revoke refresh token)
6. Add middleware to verify access token on protected routes

### Frontend Setup
1. Store refresh token in `localStorage` (survives page reload)
2. Store access token in memory only (cleared on page reload)
3. Add interceptor to auto-refresh on 401
4. Clear tokens on logout
5. Redirect to login if refresh fails

### Token Revocation
1. Store active refresh tokens in DB with `tokenId`
2. On logout: mark token as revoked
3. On refresh: check if token is revoked
4. Implement "logout all devices" by revoking all user's tokens

## Security Notes

- **Access token**: Never store in localStorage (XSS risk), use memory only
- **Refresh token**: Store in localStorage (acceptable risk, httpOnly cookie better but complex for mobile)
- **HTTPS only**: Tokens must only be sent over HTTPS
- **Token rotation**: Consider rotating refresh token on each refresh (optional)

## Exceptions

- **Development**: Allow longer access token expiry (1 hour) for easier testing
- **Remember me**: Extend refresh token to 30 days if user checks "Remember me"

---

**Source**: Industry standard JWT pattern  
**Adapted for**: Serverless backend (Lambda) + React frontend  
**Last updated**: 2026-05-08
