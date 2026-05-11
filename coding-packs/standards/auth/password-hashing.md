# Password Hashing with Bcrypt

## Rule

All user passwords MUST be hashed using bcrypt with a minimum cost factor of 10. NEVER store plaintext passwords. Hash on backend only, never send plaintext over network.

## Implementation

```typescript
// Backend: Password hashing
import bcrypt from 'bcryptjs';

const BCRYPT_ROUNDS = 10; // Cost factor (2^10 iterations)

async function hashPassword(plainPassword: string): Promise<string> {
  return bcrypt.hash(plainPassword, BCRYPT_ROUNDS);
}

async function verifyPassword(
  plainPassword: string, 
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

// Backend: User registration
async function registerUser(email: string, password: string, role: UserRole) {
  // Validate password strength
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }
  
  // Hash password
  const passwordHash = await hashPassword(password);
  
  // Store user with hashed password
  const user = await db.users.create({
    email,
    passwordHash, // ✅ Store hash, not plaintext
    role,
  });
  
  return user;
}

// Backend: User login
async function loginUser(email: string, password: string) {
  // Find user by email
  const user = await db.users.findByEmail(email);
  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }
  
  // Verify password
  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    throw new Error('INVALID_CREDENTIALS');
  }
  
  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user);
  
  return { user, accessToken, refreshToken };
}
```

## Frontend Implementation

```typescript
// Frontend: Login form
async function handleLogin(email: string, password: string) {
  // Send plaintext password over HTTPS (encrypted in transit)
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      email, 
      password, // ✅ Plaintext OK over HTTPS, backend will hash
    }),
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  const { user, accessToken, refreshToken } = await response.json();
  return { user, accessToken, refreshToken };
}
```

## Password Requirements

```typescript
// Backend: Password validation
interface PasswordPolicy {
  minLength: 8;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumber: boolean;
  requireSpecial: boolean;
}

const PASSWORD_POLICY: PasswordPolicy = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecial: false, // Optional for warehouse workers
};

function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < PASSWORD_POLICY.minLength) {
    errors.push(`Mật khẩu phải có ít nhất ${PASSWORD_POLICY.minLength} ký tự`);
  }
  
  if (PASSWORD_POLICY.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Mật khẩu phải có ít nhất 1 chữ hoa');
  }
  
  if (PASSWORD_POLICY.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Mật khẩu phải có ít nhất 1 chữ thường');
  }
  
  if (PASSWORD_POLICY.requireNumber && !/[0-9]/.test(password)) {
    errors.push('Mật khẩu phải có ít nhất 1 số');
  }
  
  if (PASSWORD_POLICY.requireSpecial && !/[!@#$%^&*]/.test(password)) {
    errors.push('Mật khẩu phải có ít nhất 1 ký tự đặc biệt');
  }
  
  return { valid: errors.length === 0, errors };
}
```

## Why

**Problem**: Storing plaintext passwords means database breach = all passwords stolen. Weak hashing (MD5, SHA1) can be cracked quickly.

**Solution**: Bcrypt is designed for password hashing with adaptive cost factor. Slow by design (prevents brute force), includes salt automatically (prevents rainbow tables).

**Benefits**:
- Industry standard for password hashing
- Automatic salt generation (no need to manage separately)
- Adaptive cost factor (can increase as hardware improves)
- Slow hashing prevents brute force attacks
- Even if DB is breached, passwords are protected

## How to Apply

### Backend Setup
1. Install bcryptjs: `npm install bcryptjs @types/bcryptjs`
2. Use `bcrypt.hash()` on registration and password change
3. Use `bcrypt.compare()` on login
4. Never log or return password hashes to client
5. Set cost factor to 10 (balance security vs performance)

### Frontend Setup
1. Send plaintext password over HTTPS only
2. Validate password strength before submission
3. Show clear password requirements to user
4. Never store password in localStorage or state
5. Clear password input after submission

### Password Reset
1. Generate secure random token (32 bytes)
2. Store token hash in DB with expiry (1 hour)
3. Send reset link via email
4. Verify token on reset page
5. Hash new password with bcrypt

## Security Notes

- **HTTPS required**: Plaintext password sent over HTTPS (encrypted in transit)
- **No client-side hashing**: Hash on backend only (client-side hashing doesn't add security)
- **Timing attacks**: Use constant-time comparison for password verification (bcrypt.compare does this)
- **Rate limiting**: Limit login attempts to prevent brute force (5 attempts per 15 min)

## Exceptions

- **Development**: Allow weaker passwords for testing (min 4 chars)
- **Migration**: If migrating from old system, force password reset on first login

---

**Source**: Adapted from `ocr-mobile-web` bcryptjs usage (was for PIN, now for passwords)  
**Industry standard**: OWASP password storage guidelines  
**Last updated**: 2026-05-08
