import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { LayoutNursingHome } from '../../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import { MatCard } from '@angular/material/card';
import { NursingStore } from '../../../application/nursing.store';
import { PersonProfileForm, PersonProfileFormValue } from '../../../../profiles/presentation/components/person-profile-form/person-profile-form';
import { CreateResidentCommand } from '../../../domain/model/create-resident.command';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-resident-form',
  standalone: true,
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    FormsModule,
    MatFormField,
    MatInput,
    MatError,
    MatButton,
    MatIcon,
    LayoutNursingHome,
    MatCard,
    MatLabel,
    PersonProfileForm
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './resident-form.html',
  styleUrl: './resident-form.css'
})
export class ResidentForm {
  @ViewChild(PersonProfileForm) personProfileForm!: PersonProfileForm;

  private fb = inject(FormBuilder);
  private store = inject(NursingStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  nursingHomeId: number = Number(localStorage.getItem('nursingHomeId'));

  form = this.fb.group({
    legalRepresentativeFirstName:   new FormControl<string> ('',       { nonNullable: true, validators: [Validators.required] }),
    legalRepresentativeLastName:    new FormControl<string> ('',       { nonNullable: true, validators: [Validators.required] }),
    legalRepresentativePhoneNumber: new FormControl<string> ('',       { nonNullable: true, validators: [Validators.required] }),
    emergencyContactFirstName:      new FormControl<string> ('',       { nonNullable: true, validators: [Validators.required] }),
    emergencyContactLastName:       new FormControl<string> ('',       { nonNullable: true, validators: [Validators.required] }),
    emergencyContactPhoneNumber:    new FormControl<string> ('',       { nonNullable: true, validators: [Validators.required] })
  });
  isEdit = false;
  residentId: number | null = null;
  personProfileId: number | null = null;
  residentData: any = null;

  constructor() {
    this.route.params.subscribe(params => {
      this.residentId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.residentId;

      if (this.isEdit && this.residentId) {
        let id = this.residentId;
        const resident = this.store.getResidentById(id)();

        if(resident) {
          this.residentData = resident;
          this.personProfileId = resident.personProfileId;

          this.form.patchValue({
            legalRepresentativeFirstName: resident.legalRepresentativeFirstName,
            legalRepresentativeLastName: resident.legalRepresentativeLastName,
            legalRepresentativePhoneNumber: resident.legalRepresentativePhoneNumber,
            emergencyContactFirstName: resident.emergencyContactFirstName,
            emergencyContactLastName: resident.emergencyContactLastName,
            emergencyContactPhoneNumber: resident.emergencyContactPhoneNumber
          });
        }
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      alert("Datos incompletos");
      this.form.markAllAsTouched();
      return;
    }

    const personProfile: PersonProfileFormValue | null = this.personProfileForm.getProfileData();
    if (!personProfile) {
      alert("Datos incompletos");
      this.form.markAllAsTouched();
      return;
    }

    const resident = this.form.getRawValue();

    const createResidentCommand = new CreateResidentCommand({
      dni: personProfile.dni,
      firstName: personProfile.firstName,
      lastName: personProfile.lastName,
      birthDate: this.formatDateToISO(personProfile.birthDate),
      age: this.calculateAge(personProfile.birthDate),
      emailAddress: personProfile.emailAddress,
      street: personProfile.street,
      number: personProfile.number,
      city: personProfile.city,
      postalCode: personProfile.postalCode,
      country: personProfile.country,
      photo: personProfile.photo,
      phoneNumber: personProfile.phoneNumber,
      legalRepresentativeFirstName: resident.legalRepresentativeFirstName,
      legalRepresentativeLastName: resident.legalRepresentativeLastName,
      legalRepresentativePhoneNumber: resident.legalRepresentativePhoneNumber,
      emergencyContactFirstName: resident.emergencyContactFirstName,
      emergencyContactLastName: resident.emergencyContactLastName,
      emergencyContactPhoneNumber: resident.emergencyContactPhoneNumber
    });

    if(this.isEdit){
      this.store.updateResident(this.residentId ?? 0, createResidentCommand);
    } else {
      this.store.createResidentInNursingHome(this.nursingHomeId, createResidentCommand);
    }

    this.router.navigate(['/nursing/residents']).then();
  }

  private formatDateToISO(date: Date): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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

  onCancel(): void {
    this.router.navigate(['/nursing/residents']).then();
  }
}
