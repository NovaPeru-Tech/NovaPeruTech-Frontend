import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {StaffMember} from '../../domain/model/staff-member.entity';
import {TranslatePipe} from '@ngx-translate/core';
import {MatError, MatFormField, MatHint} from '@angular/material/form-field';
import {MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {Toolbar} from '../../../shared/presentation/components/toolbar/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatCalendar} from '@angular/material/datepicker';
import {MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow} from '@angular/material/chips';
import {MatSelect, MatOption} from '@angular/material/select';
import {provideNativeDateAdapter} from '@angular/material/core';
import {DatePipe} from '@angular/common';
import {EmployeesStore} from '../../application/employees.store';

@Component({
  selector: 'app-staff-form-create',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatButton,
    MatIconButton,
    MatIcon,
    Toolbar,
    MatSelect,
    MatOption,
    MatChipRemove,
    MatChipRow,
    MatChipGrid,
    MatChipInput,
    MatHint,
    MatCalendar,
    DatePipe
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './staff-form-create.html',
  styleUrl: './staff-form-create.css'
})
export class StaffFormCreate {
  private fb = inject(FormBuilder);
  private store = inject(EmployeesStore);
  private router = inject(Router);

  imagePreview: string | null = null;
  selectedFile: File | null = null;
  maxDate = new Date();
  startDate = new Date(1950, 0, 1);
  minContractDate = new Date(2020, 0, 1);

  stateOptions = ['Active', 'Inactive', 'On Leave', 'Terminated'];
  postOptions = ['Nurse', 'Caregiver', 'Doctor', 'Therapist', 'Administrator', 'Receptionist', 'Cook', 'Maintenance', 'Social Worker', 'Cleaning Staff'];
  typeOfContractOptions = ['Permanent', 'Temporary', 'Part-Time', 'Full-Time', 'Internship'];
  workShiftOptions = ['Morning', 'Afternoon', 'Night', 'Rotating', 'On-Call'];

  form = this.fb.group({
    state: new FormControl<string>('Active', {nonNullable: true, validators: [Validators.required]}),
    name: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    lastname: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    dni: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    birthDate: new FormControl<Date | null>(null, {validators: [Validators.required]}),
    nationality: new FormControl<string>('', {nonNullable: true}),
    image: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),

    phoneNumber: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    email: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
    address: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),

    contractDate: new FormControl<Date | null>(new Date(), {validators: [Validators.required]}),
    contractEndDate: new FormControl<Date | null>(null),
    terminationDate: new FormControl<Date | null>(null),
    post: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    typeOfContract: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    workShift: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),

    certifications: new FormControl<string[]>([], {nonNullable: false}),

    emergencyContactName: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    emergencyContactPhone: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFile = file;

      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona una imagen válida');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no debe superar 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreview = e.target?.result as string;
        this.form.patchValue({
          image: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.imagePreview = null;
    this.selectedFile = null;
    this.form.patchValue({
      image: ''
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newStaff: StaffMember = new StaffMember({
      id: 0,

      state: this.form.value.state!,
      name: this.form.value.name!,
      lastname: this.form.value.lastname!,
      dni: this.form.value.dni!,
      birthDate: this.form.value.birthDate!,
      nationality: this.form.value.nationality || undefined,
      image: this.form.value.image!,

      phoneNumber: this.form.value.phoneNumber!,
      email: this.form.value.email!,
      address: this.form.value.address!,

      contractDate: this.form.value.contractDate!,
      contractEndDate: this.form.value.contractEndDate || undefined,
      terminationDate: this.form.value.terminationDate || undefined,
      post: this.form.value.post!,
      typeOfContract: this.form.value.typeOfContract!,
      workShift: this.form.value.workShift!,

      certifications: this.form.value.certifications || [],

      emergencyContactName: this.form.value.emergencyContactName!,
      emergencyContactPhone: this.form.value.emergencyContactPhone!,
    });

    this.store.addStaff(newStaff);
    this.router.navigate(['/employee/list']).then();
  }

  onCancel(): void {
    this.router.navigate(['/employee/list']).then();
  }

  addCertification(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      const certifications = this.form.value.certifications || [];
      this.form.patchValue({
        certifications: [...certifications, value]
      });
      event.chipInput!.clear();
    }
  }

  removeCertification(certification: string): void {
    const certifications = this.form.value.certifications || [];
    const index = certifications.indexOf(certification);
    if (index >= 0) {
      certifications.splice(index, 1);
      this.form.patchValue({
        certifications: [...certifications]
      });
    }
  }

  onBirthDateSelected(date: Date | null): void {
    this.form.patchValue({ birthDate: date });
    this.form.get('birthDate')?.markAsTouched();
  }

  onContractDateSelected(date: Date | null): void {
    this.form.patchValue({ contractDate: date });
    this.form.get('contractDate')?.markAsTouched();
  }

  onContractEndDateSelected(date: Date | null): void {
    this.form.patchValue({ contractEndDate: date });
    this.form.get('contractEndDate')?.markAsTouched();
  }

  onTerminationDateSelected(date: Date | null): void {
    this.form.patchValue({ terminationDate: date });
    this.form.get('terminationDate')?.markAsTouched();
  }
}
