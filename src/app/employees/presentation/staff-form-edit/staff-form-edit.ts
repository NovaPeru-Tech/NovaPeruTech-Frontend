import {Component, computed, inject} from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Staff} from '../../domain/model/staff.entity';
import {TranslatePipe} from '@ngx-translate/core';
import {MatError, MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {Toolbar} from '../../../shared/presentation/components/toolbar/toolbar';
import {MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRow} from '@angular/material/chips';
import {MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatCalendar} from '@angular/material/datepicker';
import {DatePipe} from '@angular/common';
import {EmployeesStore} from '../../application/employees.store';

@Component({
  selector: 'app-staff-form-edit',
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
    MatIconButton,
    MatIcon,
    MatProgressSpinner,
    Toolbar,
    MatSelect,
    MatOption,
    MatHint,
    MatChipRow,
    MatChipGrid,
    MatChipInput,
    MatCalendar,
    DatePipe
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './staff-form-edit.html',
  styleUrl: './staff-form-edit.css'
})
export class StaffFormEdit {
  private fb = inject(FormBuilder);
  protected store = inject(EmployeesStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  staffId: number | null = null;
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
    // Basic Information
    state: new FormControl<string>('Active', {nonNullable: true, validators: [Validators.required]}),
    name: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    lastname: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    dni: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    birthDate: new FormControl<Date | null>(null, {validators: [Validators.required]}),
    nationality: new FormControl<string>('', {nonNullable: true}),
    image: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),

    // Contact Information
    phoneNumber: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    email: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
    address: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),

    // Employment Information
    contractDate: new FormControl<Date | null>(new Date(), {validators: [Validators.required]}),
    contractEndDate: new FormControl<Date | null>(null),
    terminationDate: new FormControl<Date | null>(null),
    post: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    typeOfContract: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    workShift: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),

    // Professional Information
    certifications: new FormControl<string[]>([], {nonNullable: false}),

    // Emergency Contacts
    emergencyContactName: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    emergencyContactPhone: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
  });

  staff = computed(() => {
    if (!this.staffId) return undefined;
    const staffSignal = this.store.getStaffById(this.staffId);
    return staffSignal();
  });

  constructor() {
    this.route.params.subscribe(params => {
      this.staffId = params['id'] ? +params['id'] : null;

      if (!this.staffId) {
        this.router.navigate(['employee/list']).then();
        return;
      }

      const staffMember = this.store.getStaffById(this.staffId)();

      if (staffMember) {
        this.form.patchValue({
          state: staffMember.state,
          name: staffMember.name,
          lastname: staffMember.lastname,
          dni: staffMember.dni,
          birthDate: staffMember.birthDate,
          nationality: staffMember.nationality,
          image: staffMember.image,

          phoneNumber: staffMember.phoneNumber,
          email: staffMember.email,
          address: staffMember.address,

          contractDate: staffMember.contractDate,
          contractEndDate: staffMember.contractEndDate,
          terminationDate: staffMember.terminationDate,
          post: staffMember.post,
          typeOfContract: staffMember.typeOfContract,
          workShift: staffMember.workShift,

          certifications: staffMember.certifications,

          emergencyContactName: staffMember.emergencyContactName,
          emergencyContactPhone: staffMember.emergencyContactPhone,
        });

        // Cargar imagen si existe
        if (staffMember.image) {
          this.imagePreview = staffMember.image;
        }

        // Deshabilitar campos de solo lectura después de cargar datos
        this.form.get('name')?.disable();
        this.form.get('lastname')?.disable();
        this.form.get('dni')?.disable();
        this.form.get('birthDate')?.disable();
      } else {
        console.warn('Staff member not found');
        this.router.navigate(['employee/list']).then();
      }
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
    this.form.patchValue({birthDate: date});
    this.form.get('birthDate')?.markAsTouched();
  }

  onContractDateSelected(date: Date | null): void {
    this.form.patchValue({contractDate: date});
    this.form.get('contractDate')?.markAsTouched();
  }

  onContractEndDateSelected(date: Date | null): void {
    this.form.patchValue({contractEndDate: date});
    this.form.get('contractEndDate')?.markAsTouched();
  }

  onTerminationDateSelected(date: Date | null): void {
    this.form.patchValue({terminationDate: date});
    this.form.get('terminationDate')?.markAsTouched();
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.staffId) {
      console.warn('No staff ID provided for update');
      return;
    }

    const formValue = this.form.getRawValue();
    const updatedStaff: Staff = new Staff({
      id: this.staffId,

      // Basic Information
      state: formValue.state!,
      name: formValue.name!,
      lastname: formValue.lastname!,
      dni: formValue.dni!,
      birthDate: formValue.birthDate!,
      nationality: formValue.nationality || undefined,
      image: formValue.image!,

      // Contact Information
      phoneNumber: formValue.phoneNumber!,
      email: formValue.email!,
      address: formValue.address!,

      // Employment Information
      contractDate: formValue.contractDate!,
      contractEndDate: formValue.contractEndDate || undefined,
      terminationDate: formValue.terminationDate || undefined,
      post: formValue.post!,
      typeOfContract: formValue.typeOfContract!,
      workShift: formValue.workShift!,

      // Professional Information
      certifications: formValue.certifications || [],

      // Emergency Contacts
      emergencyContactName: formValue.emergencyContactName!,
      emergencyContactPhone: formValue.emergencyContactPhone!,
    });

    this.store.updateStaff(updatedStaff);
    this.router.navigate(['/employee/list']).then();
  }

  onCancel(): void {
    this.router.navigate(['/employee/list']).then();
  }
}
