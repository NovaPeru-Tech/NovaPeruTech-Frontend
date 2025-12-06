import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInCommand } from '../../../domain/model/sign-in.command';
import { IamStore } from '../../../application/iam.store';
import { Toolbar } from '../../../../shared/presentation/components/toolbar/toolbar';

/**
 * Component for user sign-in functionality.
 * Provides a form for users to authenticate with username and password.
 */
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Toolbar
  ],
  templateUrl: './sign-in-form.html',
  styleUrls: ['./sign-in-form.css']
})
export class SignInForm {
  protected store = inject(IamStore);
  private router = inject(Router);

  form = new FormGroup({
    username: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.minLength(3)]}),
    password: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.minLength(6)]})
  });
  hidePassword = true;

  /**
   * Handles form submission for sign-in.
   */
  onSubmit(): void {
    if (this.form.valid) {
      const signInCommand = new SignInCommand({
        username: this.form.value.username!,
        password: this.form.value.password!
      });
      this.store.signIn(signInCommand, this.router);
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
    return '';
  }

  performSignUpUser(): void {
    this.router.navigate(['/iam/sign-up'], {
      queryParams: { role: 'user' }
    }).then();
  }

  performSignUpAdmin(): void {
    this.router.navigate(['/iam/sign-up'], {
      queryParams: { role: 'admin' }
    }).then();
  }
}
