import {Component, computed, inject, signal, ViewChild} from '@angular/core';
import {NursingStore} from '../../../application/nursing.store';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {DatePipe} from '@angular/common';
import {LayoutNursingHome} from '../../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import {MatButton, MatIconButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import {MatInput, MatLabel} from '@angular/material/input';
import {TranslatePipe} from '@ngx-translate/core';
import {MatError, MatFormField, MatPrefix, MatSuffix} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-device-list',
  imports: [
    LayoutNursingHome,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatError,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatPaginator,
    MatPrefix,
    MatProgressSpinner,
    MatRow,
    MatRowDef,
    MatSuffix,
    MatTable,
    TranslatePipe,
    MatHeaderCellDef,
    MatNoDataRow
  ],
  templateUrl: './device-list.html',
  styleUrl: './device-list.css'
})
export class DeviceList {
  readonly store = inject(NursingStore);
  protected router = inject(Router);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'deviceId',
    'assignedBy',
    'assignedAt',
    'status'
  ];

  constructor() {
    this.store.loadDevices();
  }
  searchTerm = signal('');
  selectedColumn = signal<string>('deviceId');
  sortDirection = signal<'asc'|'desc'>('asc');

  filteredDevices = computed(() => {
    const term = this.removeAccents(this.searchTerm().toLowerCase().trim());
    const devi = this.store.devices();
    const col = this.selectedColumn();
    const dir = this.sortDirection();
    let result = devi;

    if (term) {
      result = devi.filter(m => {
        const name = this.removeAccents(m.deviceId?.toLowerCase() || '');
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
}
