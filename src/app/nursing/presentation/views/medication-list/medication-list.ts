import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInput } from '@angular/material/input';
import { LayoutNursingHome } from '../../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import { NursingStore } from '../../../application/nursing.store';

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
    MatPaginatorModule,
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
  readonly store = inject(NursingStore);
  protected router = inject(Router);
  private route = inject(ActivatedRoute);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'name',
    'description',
    'amount',
    'expirationDate',
    'drugPresentation',
    'dosage'
  ];

  residentId = signal<number | null>(null);

  constructor() {
    this.route.params.subscribe(params => {
      const id = params['id'] ? +params['id'] : null;
      this.residentId.set(id);
      if (!id) {
        this.router.navigate(['nursing/residents']).then();
        return;
      }
    });

    this.store.loadMedications(this.residentId()!);
  }
  searchTerm = signal('');
  selectedColumn = signal<string>('name');
  sortDirection = signal<'asc'|'desc'>('asc');
  medications = computed(() => this.store.medications());

  filteredMedications = computed(() => {
    const term = this.removeAccents(this.searchTerm().toLowerCase().trim());
    const meds = this.store.medications().filter(medication => medication.residentId === this.residentId());
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

  navigateToNew(id: number) {
    this.router.navigate(['nursing/residents', id, 'medications','new']).then();
  }

  goBack() {
    this.router.navigate(['/nursing/residents']).then();
  }
}
