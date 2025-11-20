import {Component, effect, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {SignInCommand} from '../../../domain/model/sign-in.command';
import {IamStore} from '../../../application/iam.store';

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
    RouterLink
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  private fb = inject(FormBuilder);
  protected store = inject(IamStore);
  private router = inject(Router);

  form = this.fb.group({
    username: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.minLength(3)]}),
    password: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.minLength(6)]})
  });
  hidePassword = true;

  constructor() {
    // Navigate to home when sign-in is successful
    effect(() => {
      const user = this.store.user();
      if (user && 'token' in user) {
        // Store token in localStorage
        localStorage.setItem('authToken', user.token);
        this.router.navigate(['/']).then();
      }
    });
  }

  /**
   * Handles form submission for sign-in.
   */
  onSubmit(): void {
    if (this.form.valid) {
      const command = new SignInCommand({
        username: this.form.value.username!,
        password: this.form.value.password!
      });
      this.store.signIn(command);
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
}
