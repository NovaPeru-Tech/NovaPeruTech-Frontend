import {Component, computed, inject} from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ResidentsStore} from '../../../application/residents-store';
import {ActivatedRoute, Router} from '@angular/router';
import {Resident} from '../../../domain/model/resident.entity';
import {TranslatePipe} from '@ngx-translate/core';
import {MatError, MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {Toolbar} from '../../../../shared/presentation/components/toolbar/toolbar';
import {MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRow} from '@angular/material/chips';
import {MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatCalendar} from '@angular/material/datepicker';
import {DatePipe} from '@angular/common';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-resident-form-edit',
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
    DatePipe,
    MatCheckbox
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './resident-form-edit.html',
  styleUrl: './resident-form-edit.css'
})
export class ResidentFormEdit {
  private fb = inject(FormBuilder);
  protected store = inject(ResidentsStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  residentId: number | null = null;
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

  resident = computed(() => {
    if (!this.residentId) return undefined;
    const residentSignal = this.store.getResidentById(this.residentId);
    return residentSignal();
  });

  constructor() {
    this.route.params.subscribe(params => {
      this.residentId = params['id'] ? +params['id'] : null;

      if (!this.residentId) {
        this.router.navigate(['resident/list']).then();
        return;
      }

      const resident = this.store.getResidentById(this.residentId)();

      if (resident) {
        this.form.patchValue({
          state: resident.state,
          name: resident.name,
          lastname: resident.lastname,
          dni: resident.dni,
          birthDate: resident.birthDate,
          phoneNumber: resident.phoneNumber,
          email: resident.email,
          room: resident.room,
          image: resident.image,

          bloodType: resident.bloodType,
          allergies: resident.allergies,
          chronicDiseases: resident.chronicDiseases,
          currentMedications: resident.currentMedications,
          specialDiet: resident.specialDiet,

          mobilityLevel: resident.mobilityLevel,
          dependencyLevel: resident.dependencyLevel,
          needsBathingAssistance: resident.needsBathingAssistance,
          needsFeedingAssistance: resident.needsFeedingAssistance,
          needsDressingAssistance: resident.needsDressingAssistance,

          emergencyContactName: resident.emergencyContactName,
          emergencyPhone: resident.emergencyPhone,
          contactRelation: resident.contactRelation,
          secondaryContact: resident.secondaryContact,
          secondaryPhone: resident.secondaryPhone,

          admissionDate: resident.admissionDate,
          attendingPhysician: resident.attendingPhysician,
          medicalInsurance: resident.medicalInsurance,
          socialSecurityNumber: resident.socialSecurityNumber,

          legalGuardian: resident.legalGuardian,
          guardianPhone: resident.guardianPhone,
        });

        // Cargar imagen si existe
        if (resident.image) {
          this.imagePreview = resident.image;
        }

        // Deshabilitar campos de solo lectura después de cargar datos
        this.form.get('name')?.disable();
        this.form.get('lastname')?.disable();
        this.form.get('dni')?.disable();
      } else {
        console.warn('Resident not found');
        this.router.navigate(['resident/list']).then();
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
    this.form.patchValue({birthDate: date});
    this.form.get('birthDate')?.markAsTouched();
  }

  onAdmissionDateSelected(date: Date | null): void {
    this.form.patchValue({admissionDate: date});
    this.form.get('admissionDate')?.markAsTouched();
  }
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.residentId) {
      console.warn('No resident ID provided for update');
      return;
    }
    const formValue = this.form.getRawValue();
    const updatedResident: Resident = new Resident({
      id: this.residentId,
      state: formValue.state!,
      name: formValue.name!,
      lastname: formValue.lastname!,
      dni: formValue.dni!,
      birthDate: formValue.birthDate!,
      phoneNumber: formValue.phoneNumber!,
      email: formValue.email!,
      room: formValue.room!,
      image: formValue.image!,

      bloodType: formValue.bloodType!,
      allergies: formValue.allergies || 'None',
      chronicDiseases: formValue.chronicDiseases || [],
      currentMedications: formValue.currentMedications || 'None',
      specialDiet: formValue.specialDiet || 'Normal',

      mobilityLevel: formValue.mobilityLevel!,
      dependencyLevel: formValue.dependencyLevel!,
      needsBathingAssistance: formValue.needsBathingAssistance!,
      needsFeedingAssistance: formValue.needsFeedingAssistance!,
      needsDressingAssistance: formValue.needsDressingAssistance!,

      emergencyContactName: formValue.emergencyContactName!,
      emergencyPhone: formValue.emergencyPhone!,
      contactRelation: formValue.contactRelation!,
      secondaryContact: formValue.secondaryContact || undefined,
      secondaryPhone: formValue.secondaryPhone || undefined,

      admissionDate: formValue.admissionDate!,
      attendingPhysician: formValue.attendingPhysician!,
      medicalInsurance: formValue.medicalInsurance || undefined,
      socialSecurityNumber: formValue.socialSecurityNumber || undefined,

      legalGuardian: formValue.legalGuardian || undefined,
      guardianPhone: formValue.guardianPhone || undefined,
    });

    this.store.updateResident(updatedResident);
    this.router.navigate(['/resident/list']).then();
  }

  onCancel(): void {
    this.router.navigate(['/resident/list']).then();
  }
}
