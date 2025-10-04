import { Component } from '@angular/core';
import { BaseForm } from '../../../../shared/presentation/base-form';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { SignIn } from '../../../domain/model/sign-in.entity';
import { IamStore } from '../../../application/iam.store';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatError,
    MatLabel,
    MatInput,
    MatButton
  ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css'
})
export class SignInComponent extends BaseForm {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private iamStore: IamStore) {
    super();
  }

  showError(controlName: string) {
    return this.isInvalidControl(this.form, controlName);
  }

  getError(controlName: string) {
    return this.errorMessagesForControl(this.form, controlName);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const signIn = new SignIn({
        id: 0,
        email: this.form.value.email ?? '',
        password: this.form.value.password ?? ''
      });

      this.iamStore.createSignIn(signIn);

    } else {
      console.log('Formulario inválido');
      this.form.markAllAsTouched();
    }
  }
  get error() {
    return this.iamStore.error();
  }
}
