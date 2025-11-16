import { Component, inject } from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NursingStore } from '../../../application/nursing.store';
import { Medication } from '../../../domain/model/medication.entity';
import {LayoutNursingHome} from '../../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import {TranslatePipe} from '@ngx-translate/core';
import {DatePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatCalendar} from '@angular/material/datepicker';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatError, MatFormField} from '@angular/material/form-field';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatIcon} from '@angular/material/icon';

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
    ReactiveFormsModule
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
        this.router.navigate(['residents/list']).then();
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
    const medication = new Medication({
      id: 0,
      residentId: this.residentId!,
      name: formValue.name!,
      description: formValue.description!,
      amount: formValue.amount!,
      expirationDate: formValue.expirationDate!,
      drugPresentation: formValue.drugPresentation!,
      dosage: formValue.dosage!
    });

    this.store.addMedication(medication);

    this.router.navigate(['medications/list', this.residentId]).then();
  }

  onCancel(): void {
    this.router.navigate(['medications/list', this.residentId]).then();
  }
}
