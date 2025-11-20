import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl,
  ValidationErrors, FormControl } from '@angular/forms';
import {Router, RouterLink } from '@angular/router';
import { IamStore } from '../../../application/iam.store';
import { SignUpCommand } from '../../../domain/model/sign-up.command';

/**
 * Component for user sign-up functionality.
 * Provides a form for new users to register with username and password.
 */
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  private fb = inject(FormBuilder);
  protected store = inject(IamStore);
  private router = inject(Router);

  // Available roles for selection
  availableRoles = [
    { value: 'ROLE_USER',       label: 'User',       description: 'Standard user access' },
    { value: 'ROLE_ADMIN',      label: 'Admin',      description: 'Administrative access' },
    { value: 'ROLE_INSTRUCTOR', label: 'Instructor', description: 'Content moderation access' }
  ];

  form = this.fb.group({
    username:        new FormControl<string>   ('',      { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)] }),
    password:        new FormControl<string>   ('',      { nonNullable: true, validators: [Validators.required, Validators.minLength(6), this.passwordStrengthValidator] }),
    confirmPassword: new FormControl<string>   ('',      { nonNullable: true, validators: [Validators.required] }),
    roles:           new FormControl<string[]> (['ROLE_USER'], { nonNullable: true, validators: [Validators.required] })
  }, { validators: this.passwordMatchValidator });
  hidePassword = true;
  hideConfirmPassword = true;

  constructor() {
    // Navigate to sign-in when sign-up is successful
    effect(() => {
      const user = this.store.user();
      if (user && !('token' in user)) {
        // User created successfully, redirect to sign-in
        this.router.navigate(['/sign-in'], {
          queryParams: { registered: 'true' }
        }).then();
      }
    });
  }

  /**
   * Custom validator to check password strength.
   */
  private passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasNumber = /[0-9]/.test(value);
    const hasLetter = /[a-zA-Z]/.test(value);

    const passwordValid = hasNumber && hasLetter;

    return !passwordValid ? { passwordStrength: true } : null;
  }

  /**
   * Custom validator to check if passwords match.
   */
  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  /**
   * Selects a role (only one can be selected at a time).
   */
  selectRole(roleValue: string): void {
    this.form.patchValue({ roles: roleValue ? [roleValue] : [] });
  }

  /**
   * Checks if a role is selected.
   */
  isRoleSelected(roleValue: string): boolean {
    const currentRoles = this.form.get('roles')?.value || [];
    return currentRoles.includes(roleValue);
  }

  /**
   * Handles form submission for sign-up.
   */
  onSubmit(): void {
    if (this.form.valid) {
      const command = new SignUpCommand({
        username: this.form.value.username!,
        password: this.form.value.password!,
        roles: this.form.value.roles!,
      });
      this.store.signUp(command);
    } else {
      this.markFormGroupTouched(this.form);
    }
  }

  /**
   * Toggles password visibility.
   */
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  /**
   * Toggles confirm password visibility.
   */
  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  /**
   * Marks all form fields as touched to trigger validation messages.
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Gets error message for username field.
   */
  getUsernameError(): string {
    const control = this.form.get('username');
    if (control?.hasError('required')) {
      return 'Username is required';
    }
    if (control?.hasError('minlength')) {
      return 'Username must be at least 3 characters';
    }
    if (control?.hasError('maxlength')) {
      return 'Username must not exceed 20 characters';
    }
    return '';
  }

  /**
   * Gets error message for password field.
   */
  getPasswordError(): string {
    const control = this.form.get('password');
    if (control?.hasError('required')) {
      return 'Password is required';
    }
    if (control?.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }
    if (control?.hasError('passwordStrength')) {
      return 'Password must contain at least one letter and one number';
    }
    return '';
  }

  /**
   * Gets error message for confirm password field.
   */
  getConfirmPasswordError(): string {
    const control = this.form.get('confirmPassword');
    if (control?.hasError('required')) {
      return 'Please confirm your password';
    }
    if (this.form.hasError('passwordMismatch')) {
      return 'Passwords do not match';
    }
    return '';
  }

  /**
   * Gets error message for role field.
   */
  getRoleError(): string {
    const control = this.form.get('roles');
    if (control?.hasError('required')) {
      return 'Please select a role';
    }
    return '';
  }

  /**
   * Calculates password strength score.
   */
  getPasswordStrength(): number {
    const password = this.form.get('password')?.value || '';
    let strength = 0;

    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    return strength;
  }

  /**
   * Gets password strength label.
   */
  getPasswordStrengthLabel(): string {
    const strength = this.getPasswordStrength();
    if (strength <= 1) return 'Weak';
    if (strength <= 3) return 'Medium';
    return 'Strong';
  }

  /**
   * Gets password strength color.
   */
  getPasswordStrengthColor(): string {
    const strength = this.getPasswordStrength();
    if (strength <= 1) return '#f56565';
    if (strength <= 3) return '#ed8936';
    return '#48bb78';
  }
}
