import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffMember } from '../../domain/model/staff-member.entity';
import { TranslatePipe } from '@ngx-translate/core';
import { MatError, MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRow } from '@angular/material/chips';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatCalendar } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { StaffManagementStore } from '../../application/staff-management.store';
import { LayoutNursingHome } from '../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';

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
    MatIconButton,
    MatIcon,
    MatProgressSpinner,
    MatSelect,
    MatOption,
    MatHint,
    MatChipRow,
    MatChipGrid,
    MatChipInput,
    MatCalendar,
    DatePipe,
    LayoutNursingHome,
    MatCard,
    MatDivider
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './staff-member-form.html',
  styleUrl: './staff-member-form.css'
})
export class StaffMemberForm {
  private fb = inject(FormBuilder);
  protected store = inject(StaffManagementStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  imagePreview: string | null = null;
  selectedFile: File | null = null;
  maxDate = new Date();
  startDate = new Date(1950, 0, 1);
  minContractDate = new Date(2020, 0, 1);

  stateOptions          = ['Active', 'Inactive', 'On Leave', 'Terminated'];
  postOptions           = ['Nurse', 'Caregiver', 'Doctor', 'Therapist', 'Administrator', 'Receptionist', 'Cook', 'Maintenance', 'Social Worker', 'Cleaning Staff'];
  typeOfContractOptions = ['Permanent', 'Temporary', 'Part-Time', 'Full-Time', 'Internship'];
  workShiftOptions      = ['Morning', 'Afternoon', 'Night', 'Rotating', 'On-Call'];

  form = this.fb.group({
    // Basic Information
    state:                 new FormControl<string>      ('Active', { nonNullable: true, validators: [Validators.required] }),
    name:                  new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    lastname:              new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    dni:                   new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    birthDate:             new FormControl<Date | null> (null,     { validators: [Validators.required] }),
    nationality:           new FormControl<string>      ('',       { nonNullable: true }),
    image:                 new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),

    // Contact Information
    phoneNumber:           new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    email:                 new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required, Validators.email] }),
    address:               new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),

    // Employment Information
    contractDate:          new FormControl<Date | null> (new Date(),     { validators: [Validators.required] }),
    contractEndDate:       new FormControl<Date | null> (null),
    terminationDate:       new FormControl<Date | null> (null),
    post:                  new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    typeOfContract:        new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    workShift:             new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),

    // Professional Information
    certifications:        new FormControl<string[]>    ([],             { nonNullable: false }),

    // Emergency Contacts
    emergencyContactName:  new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    emergencyContactPhone: new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] })
  });
  isEdit = false;
  staffMemberId: number | null = null;

  constructor() {
    this.route.params.subscribe(params => {
      this.staffMemberId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.staffMemberId;
      if (this.isEdit && this.staffMemberId) {
        let id = this.staffMemberId;
        const staffMember = this.store.getStaffMemberById(id)();
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
            emergencyContactPhone: staffMember.emergencyContactPhone
          });

          if (staffMember.image) {
            this.imagePreview = staffMember.image;
          }

          this.form.get('name')?.disable();
          this.form.get('lastname')?.disable();
          this.form.get('dni')?.disable();
          this.form.get('birthDate')?.disable();
        }
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
    if (this.form.invalid) return;

    if (this.isEdit) {
      const formValue = this.form.getRawValue();

      const staffMember: StaffMember = new StaffMember({
        id: this.staffMemberId ?? 0,

        // Basic Information
        state: formValue.state!,
        name: formValue.name!,
        lastname: formValue.lastname!,
        dni: formValue.dni!,
        birthDate: formValue.birthDate!,
        nationality: formValue.nationality! || undefined,
        image: formValue.image!,

        // Contact Information
        phoneNumber: formValue.phoneNumber!,
        email: formValue.email!,
        address: formValue.address!,

        // Employment Information
        contractDate: formValue.contractDate!,
        contractEndDate: formValue.contractEndDate! || undefined,
        terminationDate: formValue.terminationDate! || undefined,
        post: formValue.post!,
        typeOfContract: formValue.typeOfContract!,
        workShift: formValue.workShift!,

        // Professional Information
        certifications: formValue.certifications! || [],

        // Emergency Contacts
        emergencyContactName: formValue.emergencyContactName!,
        emergencyContactPhone: formValue.emergencyContactPhone!,
      });

      this.store.updateStaff(staffMember);
    } else {
      const staffMember: StaffMember = new StaffMember({
        id: this.staffMemberId ?? 0,

        // Basic Information
        state: this.form.value.state!,
        name: this.form.value.name!,
        lastname: this.form.value.lastname!,
        dni: this.form.value.dni!,
        birthDate: this.form.value.birthDate!,
        nationality: this.form.value.nationality! || undefined,
        image: this.form.value.image!,

        // Contact Information
        phoneNumber: this.form.value.phoneNumber!,
        email: this.form.value.email!,
        address: this.form.value.address!,

        // Employment Information
        contractDate: this.form.value.contractDate!,
        contractEndDate: this.form.value.contractEndDate! || undefined,
        terminationDate: this.form.value.terminationDate! || undefined,
        post: this.form.value.post!,
        typeOfContract: this.form.value.typeOfContract!,
        workShift: this.form.value.workShift!,

        // Professional Information
        certifications: this.form.value.certifications! || [],

        // Emergency Contacts
        emergencyContactName: this.form.value.emergencyContactName!,
        emergencyContactPhone: this.form.value.emergencyContactPhone!,
      });

      this.store.addStaffMember(staffMember);
    }

    this.router.navigate(['/employee/list']).then();
  }

  onCancel(): void {
    this.router.navigate(['/employee/list']).then();
  }
}
