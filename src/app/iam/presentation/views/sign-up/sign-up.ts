import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import {BaseForm} from '../../../../shared/presentation/base-form';
import {IamStore} from '../../../application/iam.store';
import {SignUp} from '../../../domain/model/sign-up.entity';
import {take} from 'rxjs';
import {Toolbar} from '../../../../shared/presentation/components/toolbar/toolbar';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatButton,
    Toolbar
  ],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.css']
})
export class SignUpComponent extends BaseForm {
  form: FormGroup;
  submitted = false;
  userRole: 'administrator' | 'family';

  constructor(
    private fb: FormBuilder,
    public iamStore: IamStore,
    private route: ActivatedRoute,
  private router: Router
) {
    super();
    this.userRole = this.route.snapshot.data['role'];

    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const signUp = new SignUp({
      id: 0,
      firstName: this.form.value.firstName ?? '',
      lastName: this.form.value.lastName ?? '',
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? '',
      role: this.userRole
    });

    this.iamStore.createSignUp(signUp).pipe(take(1)).subscribe({
      next: createdUser => {
        if (createdUser.rol === 'administrator') {
          this.router.navigate(['register/nursingHome'], { queryParams: { adminId: createdUser.id } })
            .catch(err => console.error('Navigation error', err));
        } else if (createdUser.rol === 'family') {
          this.router.navigate(['/elders/add'], { queryParams: { familyId: createdUser.id } })
            .catch(err => console.error('Navigation error', err));
        } else {
          this.router.navigate(['/']).catch(err => console.error('Navigation error', err));
        }
      },
      error: err => {
        console.error('Error registrando usuario', err);
      }
    });
  }


  showError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  getError(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control || !control.errors) {
      return '';
    }
    if (control.errors['required']) {
      return `El campo ${controlName} es obligatorio`;
    }
    if (control.errors['email']) {
      return `Formato de correo inválido`;
    }
    if (control.errors['minlength']) {
      const requiredLength = control.errors['minlength'].requiredLength;
      return `Mínimo ${requiredLength} caracteres`;
    }
    return `Valor inválido`;
  }
}
