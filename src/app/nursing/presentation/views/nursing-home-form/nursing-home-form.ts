import { Component, inject } from '@angular/core';
import { Toolbar } from '../../../../shared/presentation/components/toolbar/toolbar';
import { Router } from '@angular/router';
import { NursingStore } from '../../../application/nursing.store';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatInput, MatLabel } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { CreateNursingHomeCommand } from '../../../domain/model/create-nursing-home.command';
import { retry } from 'rxjs';

@Component({
  selector: 'app-nursing-home-form',
  imports: [
    Toolbar,
    FormsModule,
    MatButton,
    MatCard,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './nursing-home-form.html',
  styleUrl: './nursing-home-form.css'
})
export class NursingHomeForm {
  protected store = inject(NursingStore);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  adminId: number = Number(localStorage.getItem('userId'));
  showForm: boolean = false;

  constructor() {
    const adminId = Number(localStorage.getItem('userId'));

    if (!adminId) {
      this.router.navigate(['/iam/sign-in']).then();
      return;
    }

    this.store['nursingApi'].getNursingHome(adminId).pipe(retry(2)).subscribe({
      next: nursingHome => {
        this.store['_nursingHomesSignal'].set(nursingHome);
        localStorage.setItem('nursingHomeId', nursingHome.id.toString());
        this.router.navigate(['/analytics/dashboard']).then();
      },
      error: err => {
        this.showForm = true;
        this.store['_errorSignal'].set('No nursing home found');
      }
    });
  }

  photoPreview: string | null = null;
  selectedFile: File | null = null;

  form = this.fb.group({
    businessName: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    phoneNumber: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    emailAddress: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
    street: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    number: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    city: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    postalCode: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    country: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    photo: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    ruc: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]})
  });

  submit() {
    if (this.form.invalid) {
      alert("Datos incompletos");
      this.form.markAllAsTouched();
      return;
    }

    const nursingHome = this.form.getRawValue();

    const createNursingHomeCommand = new CreateNursingHomeCommand({
      businessName: nursingHome.businessName,
      phoneNumber: nursingHome.phoneNumber,
      emailAddress: nursingHome.emailAddress,
      street: nursingHome.street,
      number: nursingHome.number,
      city: nursingHome.city,
      postalCode: nursingHome.postalCode,
      country: nursingHome.country,
      photo: nursingHome.photo,
      ruc: nursingHome.ruc
    });

    this.store.addNursingHome(this.adminId, createNursingHomeCommand);

    setTimeout(() => {
      if (this.store.error()) {
        alert(this.store.error()!);
        return;
      }

      this.router.navigate(['/analytics/dashboard']).then();
    }, 300);
  }

  private resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = event => {
        const img = new Image();
        img.src = event.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement('canvas');

          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height = height * (maxWidth / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = width * (maxHeight / height);
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx!.drawImage(img, 0, 0, width, height);

          const result = canvas.toDataURL('image/jpeg', 0.8);
          resolve(result);
        };
      };

      reader.onerror = err => reject(err);
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFile = file;

      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona una imagen válida');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no debe superar los 5MB');
        return;
      }

      this.resizeImage(file, 400, 400).then(resized => {
        this.photoPreview = resized;

        this.form.patchValue({
          photo: resized
        });

        console.log('Tamaño Base64:', resized.length, 'caracteres');
      });
    }
  }

  removeImage(): void {
    this.photoPreview = null;
    this.selectedFile = null;
    this.form.patchValue({
      photo: ''
    });
  }
}
