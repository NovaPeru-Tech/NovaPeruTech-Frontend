import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffMember } from '../../../domain/model/staff-member.entity';
import { TranslatePipe } from '@ngx-translate/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { HcmStore } from '../../../application/hcm.store';
import { LayoutNursingHome } from '../../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import { MatCard } from '@angular/material/card';
import { PersonProfileForm } from '../../../../profiles/presentation/components/person-profile-form/person-profile-form';

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
    emergencyContactPhoneNumber:    new FormControl<string> ('',        { nonNullable: true, validators: [Validators.required] }),
    status:                         new FormControl<string> ('PENDING', { nonNullable: true, validators: [Validators.required] })
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
        const staffMember = this.store.getStaffMemberById(id)();
        if (staffMember) {
          this.form.patchValue({
            emergencyContactFirstName: staffMember.emergencyContactFirstName,
            emergencyContactLastName: staffMember.emergencyContactLastName,
            emergencyContactPhoneNumber: staffMember.emergencyContactPhoneNumber,
            status: staffMember.status
          });

          this.personProfileId = staffMember.personProfileId;
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

    this.personProfileForm.submit().subscribe({
      next: (personProfileId: number | null) => {

        if (personProfileId === null) {
          alert("Datos incompletos");
          return;
        }

        const formValue = this.form.getRawValue();

        const staffMember = new StaffMember({
          id: this.staffMemberId ?? 0,
          personProfileId: personProfileId,

          emergencyContactFirstName: formValue.emergencyContactFirstName!,
          emergencyContactLastName: formValue.emergencyContactLastName!,
          emergencyContactPhoneNumber: formValue.emergencyContactPhoneNumber!,
          status: formValue.status
        });

        if (this.isEdit) {
          this.store.updateStaffMember(staffMember);
        } else {
          this.store.addStaffMember(staffMember);
        }

        this.router.navigate(['/staff/list']).then();
      },
      error: () => {
        console.error('Ocurrió un error en la llamada API al guardar el perfil.');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/staff/list']).then();
  }
}
