import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import {Residents} from '../../domain/model/residents.entity';
import {ResidentStore} from '../../application/resident-store';
import {TranslatePipe} from '@ngx-translate/core';
import {MatError, MatFormField, MatHint} from '@angular/material/form-field';
import {MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {Toolbar} from '../../../shared/presentation/components/toolbar/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

import {MatCalendar} from '@angular/material/datepicker';
import {MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow} from '@angular/material/chips';
import {MatCheckbox} from '@angular/material/checkbox';
import { MatSelect, MatOption } from '@angular/material/select';
import {provideNativeDateAdapter} from '@angular/material/core';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-resident-form-create',
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
    MatCheckbox,
    MatCalendar,
    DatePipe
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './resident-form-create.html',
  styleUrl: './resident-form-create.css'
})
export class ResidentFormCreate {
  private fb=inject(FormBuilder);
  private store= inject(ResidentStore);
  private router=inject(Router);
  imagePreview: string | null = null;
  selectedFile: File | null = null;
  maxDate = new Date();
  startDate = new Date(1950, 0, 1);
  minAdmissionDate = new Date(2020, 0, 1);
  stateOptions = ['Active', 'Inactive', 'Under Evaluation'];
  bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  mobilityLevels = ['Autonomous', 'Partial Assistance', 'Wheelchair', 'Bedridden'];
  dependencyLevels = ['Independent', 'Semi-dependent', 'Fully Dependent'];
  contactRelations = ['Son/Daughter', 'Spouse', 'Sibling', 'Nephew/Niece', 'Friend', 'Other'];
  form = this.fb.group({
    state: new FormControl<string>('Active', {nonNullable: true, validators: [Validators.required]}),
    name: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    lastname: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    dni: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    birthDate: new FormControl<Date | null>(null, {validators: [Validators.required]}),
    room: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    image: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),

    phoneNumber: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    email: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.email]}),

    bloodType: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),


    allergies: new FormControl<string>('', { nonNullable: false }),
    chronicDiseases: new FormControl<string[]>([], { nonNullable: false }),
    currentMedications: new FormControl<string>('', { nonNullable: false }),
    specialDiet: new FormControl<string>('', { nonNullable: false }),

    mobilityLevel: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    dependencyLevel: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    needsBathingAssistance: new FormControl<boolean>(false, {nonNullable: true}),
    needsFeedingAssistance: new FormControl<boolean>(false, {nonNullable: true}),
    needsDressingAssistance: new FormControl<boolean>(false, {nonNullable: true}),

    emergencyContactName: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    emergencyPhone: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    contactRelation: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),

    secondaryContact: new FormControl<string>('', {nonNullable: true}),
    secondaryPhone: new FormControl<string>('', {nonNullable: true}),

    admissionDate: new FormControl<Date | null>(new Date(), {validators: [Validators.required]}),
    attendingPhysician: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),

    medicalInsurance: new FormControl<string>('', {nonNullable: true}),
    socialSecurityNumber: new FormControl<string>('', {nonNullable: true}),

    legalGuardian: new FormControl<string>('', {nonNullable: true}),
    guardianPhone: new FormControl<string>('', {nonNullable: true}),
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
        // Guardar en el formulario como base64
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
  submit(){
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const newResident: Residents = new Residents({
      id: 0,

      state: this.form.value.state!,
      name: this.form.value.name!,
      lastname: this.form.value.lastname!,
      dni: this.form.value.dni!,
      birthDate: this.form.value.birthDate!,
      phoneNumber: this.form.value.phoneNumber!,
      email: this.form.value.email!,
      room: this.form.value.room!,
      image: this.form.value.image!,

      bloodType: this.form.value.bloodType!,
      allergies: this.form.value.allergies || 'None',
      chronicDiseases: this.form.value.chronicDiseases || [],
      currentMedications: this.form.value.currentMedications || 'None',
      specialDiet: this.form.value.specialDiet || 'Normal',

      mobilityLevel: this.form.value.mobilityLevel!,
      dependencyLevel: this.form.value.dependencyLevel!,
      needsBathingAssistance: this.form.value.needsBathingAssistance!,
      needsFeedingAssistance: this.form.value.needsFeedingAssistance!,
      needsDressingAssistance: this.form.value.needsDressingAssistance!,

      emergencyContactName: this.form.value.emergencyContactName!,
      emergencyPhone: this.form.value.emergencyPhone!,
      contactRelation: this.form.value.contactRelation!,
      secondaryContact: this.form.value.secondaryContact || undefined,
      secondaryPhone: this.form.value.secondaryPhone || undefined,

      admissionDate: this.form.value.admissionDate!,
      attendingPhysician: this.form.value.attendingPhysician!,
      medicalInsurance: this.form.value.medicalInsurance || undefined,
      socialSecurityNumber: this.form.value.socialSecurityNumber || undefined,

      legalGuardian: this.form.value.legalGuardian || undefined,
      guardianPhone: this.form.value.guardianPhone || undefined,
    });
    this.store.addResident(newResident);
    this.router.navigate(['/resident/list']).then();
  }
  onCancel(): void {
    this.router.navigate(['/resident/list']).then();
  }

  addChronicDisease(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      const diseases = this.form.value.chronicDiseases || [];
      this.form.patchValue({
        chronicDiseases: [...diseases, value]
      });
      event.chipInput!.clear();
    }
  }

  removeChronicDisease(disease: string): void {
    const diseases = this.form.value.chronicDiseases || [];
    const index = diseases.indexOf(disease);
    if (index >= 0) {
      diseases.splice(index, 1);
      this.form.patchValue({
        chronicDiseases: [...diseases]
      });
    }
  }
  onBirthDateSelected(date: Date | null): void {
    this.form.patchValue({ birthDate: date });
    this.form.get('birthDate')?.markAsTouched();
  }

  onAdmissionDateSelected(date: Date | null): void {
    this.form.patchValue({ admissionDate: date });
    this.form.get('admissionDate')?.markAsTouched();
  }
}
