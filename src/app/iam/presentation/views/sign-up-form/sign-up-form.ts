import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl,
  ValidationErrors, FormControl } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { IamStore } from '../../../application/iam.store';
import { SignUpCommand } from '../../../domain/model/sign-up.command';
import { CreateAdministratorCommand } from '../../../domain/model/create-administrator.command';

/**
 * Component for user sign-up functionality.
 * Supports both regular user and administrator account creation.
 */
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './sign-up-form.html',
  styleUrls: ['./sign-up-form.css']
})
export class SignUpForm implements OnInit {
  protected store = inject(IamStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Determines if this is admin or user registration
  isAdminMode = false;

  form = new FormGroup({
    username:        new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)] }),
    password:        new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6), this.passwordStrengthValidator] }),
    confirmPassword: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  }, { validators: this.passwordMatchValidator });

  hidePassword = true;
  hideConfirmPassword = true;

  ngOnInit() {
    // Check route to determine if this is admin or user registration
    this.route.queryParams.subscribe(params => {
      this.isAdminMode = params['mode'] === 'admin';
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
   * Handles form submission for sign-up.
   */
  onSubmit(): void {
    if (this.form.valid) {
      if (this.isAdminMode) {
        // Create administrator
        const createAdminCommand = new CreateAdministratorCommand({
          username: this.form.value.username!,
          password: this.form.value.password!
        });
        this.store.createAdministrator(createAdminCommand, this.router);
      } else {
        // Create regular user with ROLE_USER
        const signUpCommand = new SignUpCommand({
          username: this.form.value.username!,
          password: this.form.value.password!,
          roles: ['ROLE_USER']
        });
        this.store.signUp(signUpCommand, this.router);
      }
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

  /**
   * Gets the title based on mode.
   */
  getTitle(): string {
    return this.isAdminMode ? 'Create Administrator Account' : 'Create User Account';
  }

  /**
   * Gets the subtitle based on mode.
   */
  getSubtitle(): string {
    return this.isAdminMode
      ? 'Register a new administrator with full system access.'
      : 'Sign up to get started with your account.';
  }

  /**
   * Gets the submit button text based on mode.
   */
  getSubmitButtonText(): string {
    return this.isAdminMode ? 'Create Administrator' : 'Create Account';
  }
}
