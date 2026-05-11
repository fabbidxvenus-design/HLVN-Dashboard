# Standards Index

| Area | Standard | Description |
|------|----------|-------------|
| api | [multi-key-fallback](api/multi-key-fallback.md) | Backend-managed API keys with automatic fallback |
| api | [retry-backoff](api/retry-backoff.md) | Exponential backoff retry for transient errors |
| auth | [password-hashing](auth/password-hashing.md) | Bcrypt password hashing with validation (deprecated - use Supabase Auth) |
| auth | [rbac-admin-gate](auth/rbac-admin-gate.md) | Role-based access control with admin-only dashboard |
| auth | [supabase-auth-rls](auth/supabase-auth-rls.md) | Supabase Auth + Row Level Security (replaces jwt-refresh-tokens) |

## Notes

- **Deprecated**: `jwt-refresh-tokens.md` - Replaced by Supabase Auth
- **Updated for Vercel + Supabase**: All standards compatible with new stack
