import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {MatError, MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {Toolbar} from '../../../shared/presentation/components/toolbar/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatCalendar} from '@angular/material/datepicker';
import {MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow} from '@angular/material/chips';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatSelect, MatOption} from '@angular/material/select';
import {provideNativeDateAdapter} from '@angular/material/core';
import {DatePipe} from '@angular/common';
import {InventoryStore} from '../../application/inventory-store';
import {Medication} from '../../domain/medication.entity';


@Component({
  selector: 'app-medication-form-create',
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
    DatePipe,

  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './medication-form-create.html',
  styleUrl: './medication-form-create.css'
})
export class MedicationFormCreate {
  private fb = inject(FormBuilder);
  private store = inject(InventoryStore);
  private router = inject(Router);

  imagePreview: string | null = null;
  selectedFile: File | null = null;
  minExpirationDate = new Date();
  startDate = new Date();

  // Opciones para los selects
  typeOptions = ['Antibiótico', 'Analgésico', 'Antiinflamatorio', 'Antihipertensivo', 'Anticoagulante', 'Antidiabético', 'Vitamina', 'Suplemento', 'Otro'];
  unitOptions = ['mg', 'g', 'ml', 'L', 'comprimidos', 'cápsulas', 'ampollas', 'frascos', 'unidades'];
  pharmaceuticalFormOptions = ['Comprimido', 'Cápsula', 'Jarabe', 'Suspensión', 'Inyectable', 'Crema', 'Gel', 'Gotas', 'Parche', 'Supositorio'];
  administrationRouteOptions = ['Oral', 'Intravenosa', 'Intramuscular', 'Subcutánea', 'Tópica', 'Oftálmica', 'Ótica', 'Nasal', 'Rectal', 'Sublingual'];
  storageLocationOptions = ['Farmacia Principal', 'Refrigerador', 'Estación de Enfermería', 'Almacén', 'Sala de Emergencias', 'Carro de Medicamentos'];

  form = this.fb.group({
    // Información Básica
    name: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    image: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    type: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    concentration: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    pharmaceuticalForm: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),

    // Información de Inventario
    quantity: new FormControl<number>(0, {nonNullable: true, validators: [Validators.required, Validators.min(0)]}),
    unit: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    minimumStock: new FormControl<number>(0, {nonNullable: true, validators: [Validators.required, Validators.min(0)]}),
    maximumStock: new FormControl<number>(0, {nonNullable: true, validators: [Validators.required, Validators.min(0)]}),
    unitCost: new FormControl<number>(0, {nonNullable: true, validators: [Validators.required, Validators.min(0)]}),

    // Información de Lote y Proveedor
    batchNumber: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    registrationNumber: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    supplier: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    barcode: new FormControl<string>('', {nonNullable: true}),
    expirationDate: new FormControl<Date | null>(null, {validators: [Validators.required]}),
    lastUpdate: new FormControl<Date | null>(new Date(), {validators: [Validators.required]}),

    // Información de Almacenamiento
    storageLocation: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    administrationRoute: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    requiresRefrigeration: new FormControl<boolean>(false, {nonNullable: true}),
    requiresPrescription: new FormControl<boolean>(false, {nonNullable: true}),
    storageConditions: new FormControl<string[]>([], {nonNullable: false}),

    // Información Adicional
    contraindications: new FormControl<string[]>([], {nonNullable: false}),
    specialNotes: new FormControl<string>('', {nonNullable: false}),

    nursingHomeId: new FormControl<number>(1, {nonNullable: true, validators: [Validators.required]})
  });

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

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newMedication: Medication = new Medication({
      id: 0,
      name: this.form.value.name!,
      image: this.form.value.image!,
      type: this.form.value.type!,
      unit: this.form.value.unit!,
      expirationDate: this.form.value.expirationDate!,
      supplier: this.form.value.supplier!,
      unitCost: this.form.value.unitCost!,
      lastUpdate: this.form.value.lastUpdate!,
      quantity: this.form.value.quantity!,
      concentration: this.form.value.concentration!,
      pharmaceuticalForm: this.form.value.pharmaceuticalForm!,
      batchNumber: this.form.value.batchNumber!,
      administrationRoute: this.form.value.administrationRoute!,
      storageLocation: this.form.value.storageLocation!,
      minimumStock: this.form.value.minimumStock!,
      maximumStock: this.form.value.maximumStock!,
      requiresRefrigeration: this.form.value.requiresRefrigeration!,
      requiresPrescription: this.form.value.requiresPrescription!,
      contraindications: this.form.value.contraindications || [],
      specialNotes: this.form.value.specialNotes || '',
      barcode: this.form.value.barcode || undefined,
      registrationNumber: this.form.value.registrationNumber!,
      storageConditions: this.form.value.storageConditions || [],
      nursingHomeId: this.form.value.nursingHomeId!
    });

    this.store.addMedication(newMedication);
    this.router.navigate(['/inventory/medication/list']).then();
  }

  onCancel(): void {
    this.router.navigate(['/inventory/medication/list']).then();
  }

  // Métodos para manejar contraindications
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

  // Métodos para manejar storage conditions
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

  // Métodos para manejar fechas
  onExpirationDateSelected(date: Date | null): void {
    this.form.patchValue({expirationDate: date});
    this.form.get('expirationDate')?.markAsTouched();
  }

  onLastUpdateSelected(date: Date | null): void {
    this.form.patchValue({lastUpdate: date});
    this.form.get('lastUpdate')?.markAsTouched();
  }
}
