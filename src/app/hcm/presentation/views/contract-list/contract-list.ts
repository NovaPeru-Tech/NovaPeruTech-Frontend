import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { LayoutNursingHome } from '../../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { HcmStore } from '../../../application/hcm.store';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef, MatTable } from '@angular/material/table';
import { TranslatePipe } from '@ngx-translate/core';
import { MatError } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-contract-list',
  imports: [
    LayoutNursingHome,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatError,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatPaginator,
    MatProgressSpinner,
    MatRow,
    MatRowDef,
    MatTable,
    TranslatePipe,
    MatHeaderCellDef,
    MatNoDataRow
  ],
  templateUrl: './contract-list.html',
  styleUrl: './contract-list.css'
})
export class ContractList {
  readonly store = inject(HcmStore);
  protected router = inject(Router);
  private route = inject(ActivatedRoute);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'status',
    'startDate',
    'endDate',
    'typeOfContract',
    'staffRole',
    'workShift',
    'actions'
  ];

  staffMemberId = signal<number | null>(null);

  constructor() {
    this.route.params.subscribe(params => {
      const id = params['id'] ? +params['id'] : null;
      this.staffMemberId.set(id);
      if (!id) {
        this.router.navigate(['hcm/staff']).then();
        return;
      }
    });

    this.store.loadContracts(this.staffMemberId()!);
  }
  selectedColumn = signal<string>('status');
  sortDirection = signal<'asc'|'desc'>('asc');
  contracts = computed(() => this.store.contracts());

  filteredContracts = computed(() => {
    const contracts = this.store.contracts().filter(contract => contract.staffMemberId === this.staffMemberId());
    const col = this.selectedColumn();
    const dir = this.sortDirection();
    return [...(contracts)].sort((a, b) => {
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

  toggleSort(col: string) {
    if (this.selectedColumn() === col) {
      this.sortDirection.update(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      this.selectedColumn.set(col);
      this.sortDirection.set('asc');
    }
  }

  updateStatus(id: number) {
    this.router.navigate([`/hcm/staff/${this.staffMemberId()}/contracts`, id, 'edit']).then();
  }

  goBack() {
    this.router.navigate([`/hcm/staff/${this.staffMemberId()}/detail`]).then();
  }
}
