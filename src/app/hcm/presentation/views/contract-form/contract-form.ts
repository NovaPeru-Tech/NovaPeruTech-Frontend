import {Component, inject} from '@angular/core';
import {LayoutNursingHome} from '../../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {HcmStore} from '../../../application/hcm.store';
import {ActivatedRoute, Router} from '@angular/router';
import {CreateContractCommand} from '../../../domain/model/create-contract.command';
import {MatCard} from '@angular/material/card';
import {TranslatePipe} from '@ngx-translate/core';
import {MatError, MatFormField} from '@angular/material/form-field';
import {MatLabel} from '@angular/material/form-field';
import {MatCalendar} from '@angular/material/datepicker';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {provideNativeDateAdapter} from '@angular/material/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-contract-form',
  standalone: true,
  imports: [
    LayoutNursingHome,
    ReactiveFormsModule,
    MatIcon,
    MatCard,
    TranslatePipe,
    MatFormField,
    MatLabel,
    MatError,
    MatSelect,
    MatOption,
    MatButton,
    MatCalendar,
    DatePipe
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './contract-form.html',
  styleUrl: './contract-form.css'
})
export class ContractForm {
  private fb = inject(FormBuilder);
  protected store = inject(HcmStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form = this.fb.group({
    startDate:      new FormControl<Date>   (new Date(), { nonNullable: true, validators: [Validators.required] }),
    endDate:        new FormControl<Date>   (new Date(), { nonNullable: true, validators: [Validators.required] }),
    typeOfContract: new FormControl<string> ('',   { nonNullable: true, validators: [Validators.required] }),
    staffRole:      new FormControl<string> ('',   { nonNullable: true, validators: [Validators.required] }),
    workShift:      new FormControl<string> ('',   { nonNullable: true, validators: [Validators.required] })
  });
  staffMemberId: number | null = null;

  constructor() {
    this.route.params.subscribe(params => {
      this.staffMemberId = params['id'] ? +params['id'] : null;
    });
  }

  onStartDateChange(date: Date | null): void {
    if (date) {
      this.form.patchValue({ startDate: date });
      this.form.get('startDate')?.markAsTouched();
    }
  }

  onEndDateChange(date: Date | null): void {
    if (date) {
      this.form.patchValue({ endDate: date });
      this.form.get('endDate')?.markAsTouched();
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

  submit() {
    if (this.form.invalid) {
      alert("Datos incompletos");
      this.form.markAllAsTouched();
      return;
    }

    const contractCommand = new CreateContractCommand({
      startDate:      this.formatDateToISO(this.form.value.startDate!),
      endDate:        this.formatDateToISO(this.form.value.endDate!),
      typeOfContract: this.form.value.typeOfContract!,
      staffRole:      this.form.value.staffRole!,
      workShift:      this.form.value.workShift!
    });

    const confirmMessage = "¿Deseas crear este nuevo contrato?";

    if (!confirm(confirmMessage)) {
      return;
    }

    this.store.addContract(this.staffMemberId!, contractCommand);

    setTimeout(() => {
      if (this.store.error()) {
        alert(this.store.error()!);
        return;
      }

      alert("Contrato creado correctamente");

      this.router.navigate(['/staff/list']).then();
    }, 300);
  }

  onCancel(): void {
    if (confirm('¿Estás seguro de que deseas cancelar? Los datos no guardados se perderán.')) {
      this.router.navigate(['/staff/list']).then();
    }
  }
}
