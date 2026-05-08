import type { UserProfile } from './user';

export interface AuthSession {
  accessToken: string;
  refreshToken?: string;
  user: UserProfile;
}