import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Resident } from '../../../domain/model/resident.entity';
import { TranslatePipe } from '@ngx-translate/core';
import { MatError, MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCalendar } from '@angular/material/datepicker';
import { MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow } from '@angular/material/chips';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSelect, MatOption } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { LayoutNursingHome } from '../../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NursingStore } from '../../../application/nursing.store';

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
    MatIconButton,
    MatIcon,
    MatSelect,
    MatOption,
    MatChipRemove,
    MatChipRow,
    MatChipGrid,
    MatChipInput,
    MatHint,
    MatCheckbox,
    MatCalendar,
    DatePipe,
    LayoutNursingHome,
    MatCard,
    MatDivider,
    MatLabel
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './resident-form.html',
  styleUrl: './resident-form.css'
})
export class ResidentForm {
  private fb = inject(FormBuilder);
  private store = inject(NursingStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  imagePreview: string | null = null;
  selectedFile: File | null = null;
  maxDate = new Date();
  startDate = new Date(1950, 0, 1);
  minAdmissionDate = new Date(2020, 0, 1);

  stateOptions     = ['Active', 'Inactive', 'Under Evaluation'];
  bloodTypes       = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  mobilityLevels   = ['Autonomous', 'Partial Assistance', 'Wheelchair', 'Bedridden'];
  dependencyLevels = ['Independent', 'Semi-dependent', 'Fully Dependent'];
  contactRelations = ['Son/Daughter', 'Spouse', 'Sibling', 'Nephew/Niece', 'Friend', 'Other'];

  form = this.fb.group({
    state:                   new FormControl<string>      ('Active', { nonNullable: true, validators: [Validators.required] }),
    name:                    new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    lastname:                new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    dni:                     new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    birthDate:               new FormControl<Date | null> (null,     { validators: [Validators.required] }),
    room:                    new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    image:                   new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    phoneNumber:             new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    email:                   new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required, Validators.email] }),
    bloodType:               new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    allergies:               new FormControl<string>      ('',       { nonNullable: false }),
    chronicDiseases:         new FormControl<string[]>    ([],             { nonNullable: false }),
    currentMedications:      new FormControl<string>      ('',       { nonNullable: false }),
    specialDiet:             new FormControl<string>      ('',       { nonNullable: false }),
    mobilityLevel:           new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    dependencyLevel:         new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    needsBathingAssistance:  new FormControl<boolean>     (false,    { nonNullable: true }),
    needsFeedingAssistance:  new FormControl<boolean>     (false,    { nonNullable: true }),
    needsDressingAssistance: new FormControl<boolean>     (false,    { nonNullable: true }),
    emergencyContactName:    new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    emergencyPhone:          new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    contactRelation:         new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    secondaryContact:        new FormControl<string>      ('',       { nonNullable: true }),
    secondaryPhone:          new FormControl<string>      ('',       { nonNullable: true }),
    admissionDate:           new FormControl<Date | null> (new Date(),     { validators: [Validators.required] }),
    attendingPhysician:      new FormControl<string>      ('',       { nonNullable: true, validators: [Validators.required] }),
    medicalInsurance:        new FormControl<string>      ('',       { nonNullable: true }),
    socialSecurityNumber:    new FormControl<string>      ('',       { nonNullable: true }),
    legalGuardian:           new FormControl<string>      ('',       { nonNullable: true }),
    guardianPhone:           new FormControl<string>      ('',       { nonNullable: true })
  });
  residents = this.store.residents;
  isEdit = false;
  residentId: number | null = null;

  constructor() {
    this.route.params.subscribe(params => {
      this.residentId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.residentId;
      if(this.isEdit && this.residentId) {
        let id = this.residentId;
        const resident = this.store.getResidentById(id)();
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

          if (resident.image) {
            this.imagePreview = resident.image;
          }

          this.form.get('name')?.disable();
          this.form.get('lastname')?.disable();
          this.form.get('dni')?.disable();
        }
      }
    })
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
        alert('La imagen no debe superar los 5MB');
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

  submit(){
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if(this.isEdit)
    {
      const formValue = this.form.getRawValue();
      const resident: Resident = new Resident({
        id: this.residentId!,
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
      this.store.updateResident(resident);
    } else {
      const resident: Resident = new Resident({
        id: this.residentId ?? 0,
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

      this.store.addResident(resident);
    }

    this.router.navigate(['/residents/list']).then();
  }

  onCancel(): void {
    this.router.navigate(['/residents/list']).then();
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
