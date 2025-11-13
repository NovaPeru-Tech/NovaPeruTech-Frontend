import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Resident } from '../../../domain/model/resident.entity';
import { TranslatePipe } from '@ngx-translate/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { LayoutNursingHome } from '../../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import { MatCard } from '@angular/material/card';
import { NursingStore } from '../../../application/nursing.store';
import { PersonProfileForm } from '../../../../profiles/presentation/components/person-profile-form/person-profile-form';

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
  templateUrl: './resident-form.html',
  styleUrl: './resident-form.css'
})
export class ResidentForm {
  @ViewChild(PersonProfileForm) personProfileForm!: PersonProfileForm;

  private fb = inject(FormBuilder);
  private store = inject(NursingStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

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

  constructor() {
    this.route.params.subscribe(params => {
      this.residentId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.residentId;

      if (this.isEdit && this.residentId) {
        let id = this.residentId;
        const resident = this.store.getResidentById(id)();
        if(resident) {
          this.form.patchValue({
            legalRepresentativeFirstName: resident.legalRepresentativeFirstName,
            legalRepresentativeLastName: resident.legalRepresentativeLastName,
            legalRepresentativePhoneNumber: resident.legalRepresentativePhoneNumber,
            emergencyContactFirstName: resident.emergencyContactFirstName,
            emergencyContactLastName: resident.emergencyContactLastName,
            emergencyContactPhoneNumber: resident.emergencyContactPhoneNumber
          });

          this.personProfileId = resident.personProfileId;
        }
      }
    });
  }

  submit(){
    if (this.form.invalid) {
      alert("Datos incompletos");
      this.form.markAllAsTouched();
      return;
    }

    this.personProfileForm.submit().subscribe({
      next: (profileId: number | null) => {

        if (profileId === null) {
          alert("Datos incompletos");
          return;
        }

        const formValue = this.form.getRawValue();

        const resident = new Resident({
          id: this.residentId ?? 0,
          personProfileId: profileId,

          legalRepresentativeFirstName: formValue.legalRepresentativeFirstName!,
          legalRepresentativeLastName: formValue.legalRepresentativeLastName!,
          legalRepresentativePhoneNumber: formValue.legalRepresentativePhoneNumber!,

          emergencyContactFirstName: formValue.emergencyContactFirstName!,
          emergencyContactLastName: formValue.emergencyContactLastName!,
          emergencyContactPhoneNumber: formValue.emergencyContactPhoneNumber!
        });

        if (this.isEdit) {
          this.store.updateResident(resident);
        } else {
          this.store.addResident(resident);
        }

        this.router.navigate(['/residents/list']).then();
      },
      error: () => {
        console.error('Ocurrió un error en la llamada API al guardar el perfil.');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/residents/list']).then();
  }
}
