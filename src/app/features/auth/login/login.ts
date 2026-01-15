import { Component, inject } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) return;

    const email: string = this.loginForm.value.email || '';
    const password: string = this.loginForm.value.password || '';

    this.authService.login(email, password).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => console.log,
    });
  }
  
  isInvalidTouchedOrDirty(formControl: FormControl): boolean {
    return formControl.invalid && (formControl.touched || formControl.dirty);
  }
}
