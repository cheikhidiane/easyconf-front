import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core/primitives/di';
import { User } from '../../models/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = `http://localhost:8080/api/v1/users/me`;

  getMe() {
    return this.http.get<User>(this.baseUrl);
  }

  changePassword(currentPassword: string, newPassword: string, confirmPassword: string) {
    return this.http.post(`${this.baseUrl}/password`, {
      current_password: currentPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    });
  }

  updateMe(dto: User) {
    const payload: any = {};
    if (dto.first_name) payload.firstName = dto.first_name;
    if (dto.last_name) payload.lastName = dto.last_name;
    if (dto.email) payload.email = dto.email;
    if (dto.bio) payload.bio = dto.bio;
    return this.http.patch(`${this.baseUrl}/users/me`, payload);
  }
}
