import {Component, computed, effect, EventEmitter, inject, Input, Output} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonProfile } from '../../../domain/model/person-profile.entity';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { MatCalendar } from '@angular/material/datepicker';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { ProfilesStore } from '../../../application/profiles.store';
import { catchError, map, Observable, of } from 'rxjs';
import { provideNativeDateAdapter } from '@angular/material/core';

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
    MatIconButton
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

      if (this.isEdit && this.personProfileId) {
        let id = this.personProfileId;

        const personProfile = this.store.getPersonProfileById(id)();

        if(personProfile) {
          this.form.patchValue({
            dni: personProfile.dni,
            firstName: personProfile.firstName,
            lastName: personProfile.lastName,
            birthDate: personProfile.birthDate,
            emailAddress: personProfile.emailAddress,
            street: personProfile.street,
            number: personProfile.number,
            city: personProfile.city,
            postalCode: personProfile.postalCode,
            country: personProfile.country,
            photo: personProfile.photo,
            phoneNumber: personProfile.phoneNumber
          });

          this.photoPreview = personProfile.photo;
        }
      }
    });
  }

  submit(): Observable<number | null>  {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return of(null);
    }

    const formValue = this.form.getRawValue();

    const personProfile = new PersonProfile({
      id: this.personProfileId ?? 0,
      dni: formValue.dni!,
      firstName: formValue.firstName!,
      lastName: formValue.lastName!,
      birthDate: formValue.birthDate!,
      age: this.calculateAge(formValue.birthDate!),
      emailAddress: formValue.emailAddress!,
      street: formValue.street!,
      number: formValue.number!,
      city: formValue.city!,
      postalCode: formValue.postalCode!,
      country: formValue.country!,
      photo: formValue.photo!,
      phoneNumber: formValue.phoneNumber!
    });

    if (this.isEdit) {
      return this.store.updatePersonProfile(personProfile).pipe(
        map(updatedProfile => {
          return updatedProfile.id;
        })
      );
    }
    else {
      return this.store.addPersonProfile(personProfile).pipe(
        map((createdProfile: { id: any; }) => {
          return createdProfile.id;
        })
      );
    }
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

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.photoPreview = e.target?.result as string;
        this.form.patchValue({
          photo: e.target?.result as string
        });
      };

      reader.readAsDataURL(file);
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

  private calculateAge(birthDate: Date): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }
}
