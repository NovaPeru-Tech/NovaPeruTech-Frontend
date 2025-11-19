import { Component, effect, inject, Input } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePipe, NgIf } from '@angular/common';
import { MatCalendar } from '@angular/material/datepicker';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { ProfilesStore } from '../../../application/profiles.store';
import { provideNativeDateAdapter } from '@angular/material/core';

export interface PersonProfileFormValue {
  dni: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  emailAddress: string;
  street: string;
  number: string;
  city: string;
  postalCode: string;
  country: string;
  photo: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-person-profile-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatIcon,
    TranslatePipe,
    DatePipe,
    MatCalendar,
    MatCard,
    MatError,
    MatButton,
    MatIconButton,
    MatHint,
    NgIf
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './person-profile-form.html',
  styleUrl: './person-profile-form.css'
})
export class PersonProfileForm {
  @Input() personProfileId: number | null = null;

  private fb = inject(FormBuilder);
  private store = inject(ProfilesStore);

  photoPreview: string | null = null;
  selectedFile: File | null = null;
  maxDate = new Date();

  form = this.fb.group({
    // Person Profile Data
    dni:                   new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    firstName:             new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    lastName:              new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    birthDate:             new FormControl<Date>        (new Date(),     { validators: [Validators.required] }),

    // Profile Data
    emailAddress:          new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required, Validators.email] }),
    street:                new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    number:                new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    city:                  new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    postalCode:            new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    country:               new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    photo:                 new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    phoneNumber:           new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] })
  });
  isEdit = false;

  constructor() {
    effect(() => {
      this.isEdit = !!this.personProfileId;

      if(this.isEdit && this.personProfileId) {
        let id = this.personProfileId;

        const personProfile = this.store.getPersonProfileById(id)();

        if(personProfile) {
          const fullNameParts = personProfile.fullName.trim().split(/\s+/);

          let firstName = "";
          let lastName = "";

          if (fullNameParts.length === 2) {
            firstName = fullNameParts[0];
            lastName = fullNameParts[1];
          }
          else if (fullNameParts.length >= 3) {
            lastName = fullNameParts.slice(-2).join(" ");
            firstName = fullNameParts.slice(0, -2).join(" ");
          }
          else {
            firstName = fullNameParts[0] ?? "";
            lastName = "";
          }

          const streetAddressParts = personProfile.streetAddress.split(',');
          const streetAndNumber = streetAddressParts[0]?.trim() ?? '';
          const postalCode = streetAddressParts[1]?.trim() ?? '';
          const city = streetAddressParts[2]?.trim() ?? '';
          const country = streetAddressParts[3]?.trim() ?? '';
          const streetParts = streetAndNumber.split(' ');
          const number = streetParts.pop() ?? '';
          const street = streetParts.join(' ');

          this.form.patchValue({
            dni: personProfile.dni,
            firstName: firstName,
            lastName: lastName,
            birthDate: new Date(personProfile.birthDate),
            emailAddress: personProfile.emailAddress,
            street: street,
            number: number,
            city: city,
            postalCode: postalCode,
            country: country,
            photo: personProfile.photo,
            phoneNumber: personProfile.phoneNumber
          });

          this.maxDate = new Date(personProfile.birthDate);
          this.photoPreview = personProfile.photo;
        }
      }
    });
  }

  getProfileData(): PersonProfileFormValue | null {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return null;
    }

    return this.form.getRawValue() as PersonProfileFormValue;
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

  onBirthDateSelected(date: Date | null): void {
    this.form.patchValue({ birthDate: date });
    this.form.get('birthDate')?.markAsTouched();
  }
}
