import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltip } from '@angular/material/tooltip';
import { InventoryStore } from '../../application/inventory-store';
import { LayoutNursingHome } from '../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-medication-list',
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
    LayoutNursingHome,
    MatFormField,
    MatInput,
    MatLabel,
    MatPrefix,
    MatSuffix
  ],
  templateUrl: './medication-list.html',
  styleUrl: './medication-list.css'
})
export class MedicationList {
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
  searchTerm = signal('');
  selectedColumn = signal<string>('name');
  sortDirection = signal<'asc'|'desc'>('asc');
  medications = computed(() => this.store.medications());

  filteredMedications = computed(() => {
    const term = this.removeAccents(this.searchTerm().toLowerCase().trim());
    const meds = this.store.medications();
    const col = this.selectedColumn();
    const dir = this.sortDirection();
    let result = meds;

    if (term) {
      result = meds.filter(m => {
        const name = this.removeAccents(m.name?.toLowerCase() || '');
        return name.startsWith(term);
      });
    }

    return [...result].sort((a, b) => {
      let valA = (a as any)[col];
      let valB = (b as any)[col];

      if (valA == null) return 1;
      if (valB == null) return -1;

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      return dir === 'asc'
        ? valA > valB ? 1 : -1
        : valA < valB ? 1 : -1;
    });
  });

  removeAccents(word: string) {
    return word.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').trim();
  }

  toggleSort(col: string) {
    if (this.selectedColumn() === col) {
      this.sortDirection.update(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      this.selectedColumn.set(col);
      this.sortDirection.set('asc');
    }
  }

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
    this.router.navigate(['inventory/medication/new']).then();
  }

  getStatusClass(medication: any): string {
    return medication.getStatus();
  }
}
