import { Injectable } from '@angular/core';

export type UserRole = 'Admin' | 'Customer';

export interface AuthUser {
  email: string;
  role: UserRole;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly key = 'auth_user';

  login(email: string, password: string): boolean {
    // Mock accounts
    if (email === 'admin@biograf.dk' && password === 'admin') {
      this.setUser({ email, role: 'Admin' });
      return true;
    }

    if (email === 'kunde@biograf.dk' && password === 'kunde') {
      this.setUser({ email, role: 'Customer' });
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(this.key);
  }

  getUser(): AuthUser | null {
    const raw = localStorage.getItem(this.key);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  getRole(): UserRole | null {
    return this.getUser()?.role ?? null;
  }

  private setUser(user: AuthUser): void {
    localStorage.setItem(this.key, JSON.stringify(user));
  }
}
