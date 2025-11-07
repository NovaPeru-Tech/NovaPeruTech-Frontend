import { Component, computed, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltip } from '@angular/material/tooltip';
import { InventoryStore } from '../../application/inventory-store';
import { LayoutNursingHome } from '../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';

@Component({
  selector: 'app-medication-form-list',
  standalone: true,
  imports: [
    TranslatePipe,
    MatProgressSpinner,
    MatError,
    MatIcon,
    MatIconButton,
    MatButton,
    DatePipe,
    MatTableModule,
    MatCheckbox,
    MatPaginatorModule,
    MatTooltip,
    DecimalPipe,
    LayoutNursingHome
  ],
  templateUrl: './medication-form-list.html',
  styleUrl: './medication-form-list.css'
})
export class MedicationFormList {
  readonly store = inject(InventoryStore);
  protected router = inject(Router);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'select',
    'name',
    'type',
    'unit',
    'expirationDate',
    'supplier',
    'unitCost',
    'lastUpdate',
    'quantity',
    'actions'
  ];

  selectedId: number | null = null;
  medications = computed(() => this.store.medications());

  selectMedication(id: number) {
    this.selectedId = this.selectedId === id ? null : id;
  }

  viewDetails(id: number) {
    this.router.navigate(['inventory/medication', id, 'detail']).then();
  }

  editMedication(id: number) {
    this.router.navigate(['inventory/medication', id, 'edit']).then();
  }

  deleteMedication(id: number) {
    if (confirm('¿Está seguro de eliminar este medicamento?')) {
      this.store.deleteMedication(id);
    }
  }

  navigateToNew() {
    this.router.navigate(['inventory/medication/create']).then();
  }

  getStatusClass(medication: any): string {
    return medication.getStatus();
  }
}
