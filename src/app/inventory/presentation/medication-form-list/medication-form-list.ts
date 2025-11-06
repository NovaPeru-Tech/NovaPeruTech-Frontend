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
import { SelectionModel } from '@angular/cdk/collections';
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

  selection = new SelectionModel<number>(true, []);
  medications = computed(() => this.store.medications());

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.medications().length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.medications().map(m => m.id));
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row.id) ? 'deselect' : 'select'} row ${row.id}`;
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
      this.selection.deselect(id);
    }
  }

  deleteSelected() {
    if (this.selection.selected.length === 0) return;

    if (confirm(`¿Está seguro de eliminar ${this.selection.selected.length} medicamento(s)?`)) {
      this.selection.selected.forEach(id => {
        this.store.deleteMedication(id);
      });
      this.selection.clear();
    }
  }

  navigateToNew() {
    this.router.navigate(['inventory/medication/create']).then();
  }

  getStatusClass(medication: any): string {
    return medication.getStatus();
  }
}
