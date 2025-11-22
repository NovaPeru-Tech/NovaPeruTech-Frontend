import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { HcmStore } from '../../../application/hcm.store';
import { LayoutNursingHome } from '../../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import { MatCard } from '@angular/material/card';
import { PersonProfileForm, PersonProfileFormValue } from '../../../../profiles/presentation/components/person-profile-form/person-profile-form';
import { CreateStaffMemberCommand } from '../../../domain/commands/create-staff-member-command';

@Component({
  selector: 'app-staff-member-form',
  standalone: true,
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    LayoutNursingHome,
    MatCard,
    PersonProfileForm
  ],
  templateUrl: './staff-member-form.html',
  styleUrl: './staff-member-form.css'
})
export class StaffMemberForm {
  @ViewChild(PersonProfileForm) personProfileForm!: PersonProfileForm;

  private fb = inject(FormBuilder);
  protected store = inject(HcmStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form = this.fb.group({
    emergencyContactFirstName:      new FormControl<string> ('',        { nonNullable: true, validators: [Validators.required] }),
    emergencyContactLastName:       new FormControl<string> ('',        { nonNullable: true, validators: [Validators.required] }),
    emergencyContactPhoneNumber:    new FormControl<string> ('',        { nonNullable: true, validators: [Validators.required] })
  });
  isEdit = false;
  staffMemberId: number | null = null;
  personProfileId: number | null = null;

  constructor() {
    this.route.params.subscribe(params => {
      this.staffMemberId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.staffMemberId;

      if (this.isEdit && this.staffMemberId) {
        let id = this.staffMemberId;
        const resident = this.store.getStaffMemberById(id)();
        if(resident) {
          this.form.patchValue({
            emergencyContactFirstName: resident.emergencyContactFirstName,
            emergencyContactLastName: resident.emergencyContactLastName,
            emergencyContactPhoneNumber: resident.emergencyContactPhoneNumber
          });

          this.personProfileId = resident.personProfileId;
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

    const staffMember = this.form.getRawValue();

    const command = new CreateStaffMemberCommand({
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
      emergencyContactFirstName: staffMember.emergencyContactFirstName,
      emergencyContactLastName: staffMember.emergencyContactLastName,
      emergencyContactPhoneNumber: staffMember.emergencyContactPhoneNumber
    })

    if (!confirm("¿Deseas guardar los cambios del empleado?")) {
      return;
    }

    if(this.isEdit){
      this.store.updateStaffMember(this.staffMemberId ?? 0, command).subscribe({
        next: () => {
          this.router.navigate(['/staff/list']).then();
          alert('Datos guardados exitosamente');
        },
        error: (err) => {
          let errorMessage = 'Error al guardar el empleado.';

          if (err.error?.message) {
            errorMessage = `Error al guardar el empleado: ${err.error.message}`;
          } else if (typeof err.error === 'string') {
            errorMessage = `Error al guardar el empleado: ${err.error}`;
          }

          alert(errorMessage);
        }
      });
    } else {
      this.store.createStaffMemberInNursingHome(1, command).subscribe({
        next: () => {
          this.router.navigate(['/staff/list']).then();
          alert('Empleado registrado exitosamente');
        },
        error: (err) => {
          let errorMessage = 'Error al guardar el empleado.';

          if (err.error?.message) {
            errorMessage = `Error al guardar el empleado: ${err.error.message}`;
          } else if (typeof err.error === 'string') {
            errorMessage = `Error al guardar el empleado: ${err.error}`;
          }

          alert(errorMessage);
        }
      });
    }
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
    this.router.navigate(['/staff/list']).then();
  }
}
