import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { NursingStore } from '../../../application/nursing.store';
import { LayoutNursingHome } from '../../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef, MatTable } from '@angular/material/table';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatError, MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-room-list',
  imports: [
    LayoutNursingHome,
    MatButton,
    MatCell,
    MatCellDef,
    MatCheckbox,
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
    MatNoDataRow,
    MatHeaderCellDef
  ],
  templateUrl: './room-list.html',
  styleUrl: './room-list.css'
})
export class RoomList {
  readonly store = inject(NursingStore);
  protected router = inject(Router);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'select',
    'number',
    'type',
    'capacity',
    'available',
    'occupied',
    'status'
  ];

  selectedId: number | null = null;
  searchTerm = signal('');
  selectedColumn = signal<string>('number');
  sortDirection = signal<'asc'|'desc'>('asc');
  rooms = computed(() => this.store.rooms());

  filteredRooms = computed(() => {
    const term = this.removeAccents(this.searchTerm().toLowerCase().trim());
    const rooms = this.store.rooms();
    const col = this.selectedColumn();
    const dir = this.sortDirection();
    let result = rooms;

    if (term) {
      result = rooms.filter(m => {
        const name = this.removeAccents(m.number?.toLowerCase() || '');
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

  selectRoom(id: number) {
    this.selectedId = this.selectedId === id ? null : id;
  }

  editRoom(id: number) {
    this.router.navigate(['rooms/list', id, 'edit']).then();
  }

  deleteRoom(id: number) {
    if (confirm('¿Está seguro de eliminar esta habitación?')) {
      this.store.deleteRoom(id);
    }
  }

  navigateToNew() {
    this.router.navigate(['rooms/list/new']).then();
  }
}
