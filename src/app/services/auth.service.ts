import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthResponseDto {
  userId: number;
  username: string;

  // ✅ kan komme som "role" (camelcase) eller "Role" (PascalCase)
  role?: string;
  Role?: string;

  token: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  password: string;
}

export interface AuthUser {
  userId: number;
  username: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = '/api/Auth';

  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'auth_user';

  constructor(private http: HttpClient) {}

  login(dto: LoginDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.baseUrl}/login`, dto).pipe(
      tap(res => this.persistAuth(res))
    );
  }

  register(dto: RegisterDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.baseUrl}/register`, dto).pipe(
      tap(res => this.persistAuth(res))
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): AuthUser | null {
    const raw = localStorage.getItem(this.USER_KEY);
    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw) as Partial<AuthUser>;
      return {
        userId: Number(parsed.userId),
        username: String(parsed.username ?? ''),
        role: String((parsed as any).role ?? 'Customer'),
      };
    } catch {
      return null;
    }
  }

  getRole(): string | null {
    return this.getUser()?.role ?? null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }

  private persistAuth(res: AuthResponseDto): void {
    // ✅ tager både role og Role, fallback til Customer
    const role = (res.role ?? res.Role ?? 'Customer').trim() || 'Customer';

    localStorage.setItem(this.TOKEN_KEY, res.token);
    localStorage.setItem(
      this.USER_KEY,
      JSON.stringify({ userId: res.userId, username: res.username, role })
    );
  }
}
