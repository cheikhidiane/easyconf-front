import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Token } from '@core/models/interfaces/token.interface';
import { tap } from 'rxjs';
import { Registration } from '@core/models/interfaces/registration.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = `/api/v1/auth`;

  register(payload: Registration) {
    return this.http.post(`${this.baseUrl}/register`, payload);
  }

  login(email: string, password: string) {
    return this.http.post<Token>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap((data) => {
        this.setItems(data);
      }),
    );
  }

  refresh(refreshToken: string) {
    return this.http.post<Token>(`${this.baseUrl}/refresh`, { refreshToken }).pipe(
      tap((data) => {
        this.setItems(data);
      }),
    );
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenType');
  }

  setItems(dto: Token) {
    if (dto.access_token) localStorage.setItem('accessToken', dto.access_token);
    if (dto.refresh_token) localStorage.setItem('refreshToken', dto.refresh_token);
    if (dto.token_type) localStorage.setItem('tokenType', dto.token_type ?? 'Bearer');
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  getTokenType() {
    return localStorage.getItem('tokenType');
  }
}
