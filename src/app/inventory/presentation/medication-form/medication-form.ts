import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryStore } from '../../application/inventory-store';
import { ActivatedRoute, Router } from '@angular/router';
import { Medication } from '../../domain/medication.entity';
import { TranslatePipe } from '@ngx-translate/core';
import { MatError, MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow } from '@angular/material/chips';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatCalendar } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { LayoutNursingHome } from '../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-medication-form',
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
    MatChipRemove,
    MatCalendar,
    DatePipe,
    MatCheckbox,
    LayoutNursingHome,
    MatCard
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './medication-form.html',
  styleUrl: './medication-form.css'
})
export class MedicationForm {
  private fb = inject(FormBuilder);
  protected store = inject(InventoryStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  imagePreview: string | null = null;
  selectedFile: File | null = null;
  minExpirationDate = new Date();
  startDate = new Date();

  // Opciones para los selects
  typeOptions                = ['Antibiótico', 'Analgésico', 'Antiinflamatorio', 'Antihipertensivo', 'Anticoagulante', 'Antidiabético', 'Vitamina', 'Suplemento', 'Otro'];
  unitOptions                = ['mg', 'g', 'ml', 'L', 'comprimidos', 'cápsulas', 'ampollas', 'frascos', 'unidades'];
  pharmaceuticalFormOptions  = ['Comprimido', 'Cápsula', 'Jarabe', 'Suspensión', 'Inyectable', 'Crema', 'Gel', 'Gotas', 'Parche', 'Supositorio'];
  administrationRouteOptions = ['Oral', 'Intravenosa', 'Intramuscular', 'Subcutánea', 'Tópica', 'Oftálmica', 'Ótica', 'Nasal', 'Rectal', 'Sublingual'];
  storageLocationOptions     = ['Farmacia Principal', 'Refrigerador', 'Estación de Enfermería', 'Almacén', 'Sala de Emergencias', 'Carro de Medicamentos'];

  form = this.fb.group({
    // Información Básica
    name:                  new FormControl<string>      ('',    { nonNullable: true, validators: [Validators.required] }),
    image:                 new FormControl<string>      ('',    { nonNullable: true, validators: [Validators.required] }),
    type:                  new FormControl<string>      ('',    { nonNullable: true, validators: [Validators.required] }),
    concentration:         new FormControl<string>      ('',    { nonNullable: true, validators: [Validators.required] }),
    pharmaceuticalForm:    new FormControl<string>      ('',    { nonNullable: true, validators: [Validators.required] }),

    quantity:              new FormControl<number>      (0,     { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    unit:                  new FormControl<string>      ('',    { nonNullable: true, validators: [Validators.required] }),
    minimumStock:          new FormControl<number>      (0,     { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    maximumStock:          new FormControl<number>      (0,     { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    unitCost:              new FormControl<number>      (0,     { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),

    batchNumber:           new FormControl<string>      ('',    { nonNullable: true, validators: [Validators.required] }),
    registrationNumber:    new FormControl<string>      ('',    { nonNullable: true, validators: [Validators.required] }),
    supplier:              new FormControl<string>      ('',    { nonNullable: true, validators: [Validators.required] }),
    barcode:               new FormControl<string>      ('',    { nonNullable: true }),
    expirationDate:        new FormControl<Date | null> (null,  { validators: [Validators.required] }),

    storageLocation:       new FormControl<string>      ('',    { nonNullable: true, validators: [Validators.required] }),
    administrationRoute:   new FormControl<string>      ('',    { nonNullable: true, validators: [Validators.required] }),
    requiresRefrigeration: new FormControl<boolean>     (false, { nonNullable: true }),
    requiresPrescription:  new FormControl<boolean>     (false, { nonNullable: true }),
    storageConditions:     new FormControl<string[]>    ([],          { nonNullable: false }),

    contraindications:     new FormControl<string[]>    ([],          { nonNullable: false }),
    specialNotes:          new FormControl<string>      ('',    { nonNullable: false }),

    nursingHomeId:         new FormControl<number>(1,           { nonNullable: true, validators: [Validators.required] })
  });
  medications = this.store.medications;
  isEdit = false;
  medicationId: number | null = null;

  constructor() {
    this.route.params.subscribe(params => {
      this.medicationId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.medicationId;
      if (this.isEdit && this.medicationId) {
        let id = this.medicationId;
        const medication = this.store.getMedicationById(id)();
        if (medication) {
          this.form.patchValue({
            name: medication.name,
            image: medication.image,
            type: medication.type,
            concentration: medication.concentration,
            pharmaceuticalForm: medication.pharmaceuticalForm,
            quantity: medication.quantity,
            unit: medication.unit,
            minimumStock: medication.minimumStock,
            maximumStock: medication.maximumStock,
            unitCost: medication.unitCost,
            batchNumber: medication.batchNumber,
            registrationNumber: medication.registrationNumber,
            supplier: medication.supplier,
            barcode: medication.barcode,
            expirationDate: medication.expirationDate,
            storageLocation: medication.storageLocation,
            administrationRoute: medication.administrationRoute,
            requiresRefrigeration: medication.requiresRefrigeration,
            requiresPrescription: medication.requiresPrescription,
            storageConditions: medication.storageConditions,
            contraindications: medication.contraindications,
            specialNotes: medication.specialNotes,
            nursingHomeId: medication.nursingHomeId
          });

          if (medication.image) {
            this.imagePreview = medication.image;
          }

          this.form.get('name')?.disable();
          this.form.get('batchNumber')?.disable();
          this.form.get('registrationNumber')?.disable();
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

  addContraindication(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      const contraindications = this.form.value.contraindications || [];
      this.form.patchValue({
        contraindications: [...contraindications, value]
      });
      event.chipInput!.clear();
    }
  }

  removeContraindication(contraindication: string): void {
    const contraindications = this.form.value.contraindications || [];
    const index = contraindications.indexOf(contraindication);
    if (index >= 0) {
      contraindications.splice(index, 1);
      this.form.patchValue({
        contraindications: [...contraindications]
      });
    }
  }

  addStorageCondition(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      const conditions = this.form.value.storageConditions || [];
      this.form.patchValue({
        storageConditions: [...conditions, value]
      });
      event.chipInput!.clear();
    }
  }

  removeStorageCondition(condition: string): void {
    const conditions = this.form.value.storageConditions || [];
    const index = conditions.indexOf(condition);
    if (index >= 0) {
      conditions.splice(index, 1);
      this.form.patchValue({
        storageConditions: [...conditions]
      });
    }
  }

  onExpirationDateSelected(date: Date | null): void {
    this.form.patchValue({expirationDate: date});
    this.form.get('expirationDate')?.markAsTouched();
  }

  submit() {
    if (this.form.invalid) return;

    if(this.isEdit) {
      const formValue = this.form.getRawValue();
      const medication: Medication = new Medication({
        id: this.medicationId!,
        name: formValue.name!,
        image: formValue.image!,
        type: formValue.type!,
        concentration: formValue.concentration!,
        pharmaceuticalForm: formValue.pharmaceuticalForm!,
        quantity: formValue.quantity!,
        unit: formValue.unit!,
        minimumStock: formValue.minimumStock!,
        maximumStock: formValue.maximumStock!,
        unitCost: formValue.unitCost!,
        batchNumber: formValue.batchNumber!,
        registrationNumber: formValue.registrationNumber!,
        supplier: formValue.supplier!,
        barcode: formValue.barcode || undefined,
        expirationDate: formValue.expirationDate!,
        lastUpdate: new Date(),
        storageLocation: formValue.storageLocation!,
        administrationRoute: formValue.administrationRoute!,
        requiresRefrigeration: formValue.requiresRefrigeration!,
        requiresPrescription: formValue.requiresPrescription!,
        storageConditions: formValue.storageConditions || [],
        contraindications: formValue.contraindications || [],
        specialNotes: formValue.specialNotes || '',
        nursingHomeId: formValue.nursingHomeId!
      });

      this.store.updateMedication(medication);
    } else {
      const medication: Medication = new Medication({
        id: this.medicationId ?? 0,
        name: this.form.value.name!,
        image: this.form.value.image!,
        type: this.form.value.type!,
        concentration: this.form.value.concentration!,
        pharmaceuticalForm: this.form.value.pharmaceuticalForm!,
        quantity: this.form.value.quantity!,
        unit: this.form.value.unit!,
        minimumStock: this.form.value.minimumStock!,
        maximumStock: this.form.value.maximumStock!,
        unitCost: this.form.value.unitCost!,
        batchNumber: this.form.value.batchNumber!,
        registrationNumber: this.form.value.registrationNumber!,
        supplier: this.form.value.supplier!,
        barcode: this.form.value.barcode || undefined,
        expirationDate: this.form.value.expirationDate!,
        lastUpdate: new Date(),
        storageLocation: this.form.value.storageLocation!,
        administrationRoute: this.form.value.administrationRoute!,
        requiresRefrigeration: this.form.value.requiresRefrigeration!,
        requiresPrescription: this.form.value.requiresPrescription!,
        storageConditions: this.form.value.storageConditions || [],
        contraindications: this.form.value.contraindications || [],
        specialNotes: this.form.value.specialNotes || '',
        nursingHomeId: this.form.value.nursingHomeId!
      });

      this.store.addMedication(medication);
    }

    this.router.navigate(['/inventory/medication/list']).then();
  }

  onCancel(): void {
    this.router.navigate(['/inventory/medication/list']).then();
  }
}
