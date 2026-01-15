import { Component, inject } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { Registration } from '@core/models/interfaces/registration.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  registerForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      ],
    ],
    confirmPassword: ['', [Validators.required, this.confirmPwdValidator]],
  });

  confirmPwdValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.parent?.get('password')?.value;
    return password === control.value ? null : { mismatch: true };
  }

  onSubmit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;

    const formData: Registration = {
      email: this.registerForm.value.email ?? '',
      password: this.registerForm.value.password ?? '',
      first_name: this.registerForm.value.firstName ?? '',
      last_name: this.registerForm.value.lastName ?? '',
      confirm_password: this.registerForm.value.confirmPassword ?? '',
    };

    this.authService.register(formData).subscribe({
      next: () => this.router.navigate(['login']),
      error: (err) => console.log,
    });
  }

  isInvalidTouchedOrDirty(formControl: FormControl): boolean {
    return formControl.invalid && (formControl.touched || formControl.dirty);
  }
}
