import { Component, inject } from '@angular/core';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NursingStore } from '../../../application/nursing.store';
import { LayoutNursingHome } from '../../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCalendar } from '@angular/material/datepicker';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { CreateMedicationCommand } from '../../../domain/model/create-medication.command';
import { MatCard } from '@angular/material/card';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-medication-form',
  standalone: true,
  imports: [
    LayoutNursingHome,
    TranslatePipe,
    MatError,
    MatProgressSpinner,
    DatePipe,
    MatButton,
    MatCalendar,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatCard,
    MatSelect,
    MatOption
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './medication-form.html',
  styleUrl: './medication-form.css'
})
export class MedicationForm {
  private fb = inject(FormBuilder);
  protected store = inject(NursingStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  minExpirationDate = new Date();
  startDate = new Date();

  form = this.fb.group({
    name:             new FormControl<string>        ('',   { nonNullable: true, validators: [Validators.required] }),
    description:      new FormControl<string>        ('',   { nonNullable: true, validators: [Validators.required] }),
    amount:           new FormControl<number | null> (null, { nonNullable: true, validators: [Validators.required] }),
    expirationDate:   new FormControl<Date | null>   (null, { validators: [Validators.required] }),
    drugPresentation: new FormControl<string>        ('',   { nonNullable: true, validators: [Validators.required] }),
    dosage:           new FormControl<string>        ('',   { nonNullable: true, validators: [Validators.required] })
  });
  medications = this.store.medications;
  residentId: number | null = null;

  constructor() {
    this.route.params.subscribe(params => {
      const id = params['id'] ? +params['id'] : null;
      this.residentId = id;
      if (!id) {
        this.router.navigate(['nursing/medications']).then();
        return;
      }
    });
  }

  onExpirationDateSelected(date: Date | null): void {
    this.form.patchValue({expirationDate: date});
    this.form.get('expirationDate')?.markAsTouched();
  }

  submit() {
    if (this.form.invalid) {
      alert("Datos incompletos");
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    const createMedicationCommand = new CreateMedicationCommand({
      name: formValue.name!,
      description: formValue.description!,
      amount: formValue.amount!,
      expirationDate: this.formatDateToISO(formValue.expirationDate!),
      drugPresentation: formValue.drugPresentation!,
      dosage: formValue.dosage!
    });

    this.store.addMedication(this.residentId!, createMedicationCommand);

    this.router.navigate(['nursing/medications', this.residentId]).then();
  }

  private formatDateToISO(date: Date): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  onCancel(): void {
    this.router.navigate(['nursing/medications', this.residentId]).then();
  }
}
