import {Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatCard} from '@angular/material/card';
import {MatButton, MatFabButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatError} from '@angular/material/form-field';
import {MatDivider} from '@angular/material/divider';
import {MatChip} from '@angular/material/chips';
import {Toolbar} from '../../../shared/presentation/components/toolbar/toolbar';
import {DatePipe} from '@angular/common';
import {StaffManagementStore} from '../../application/staff-management.store';

@Component({
  selector: 'app-staff-detail',
  standalone: true,
  imports: [
    MatCard,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    MatError,
    MatDivider,
    MatChip,
    Toolbar,
    MatIconButton,
    MatFabButton,
    DatePipe
  ],
  templateUrl: './staff-detail.html',
  styleUrl: './staff-detail.css'
})
export class StaffDetail {
  protected store = inject(StaffManagementStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  staffId = signal<number | null>(null);

  staff = computed(() => {
    const id = this.staffId();
    if (!id) return undefined;
    const staffSignal = this.store.getStaffMemberById(id);
    return staffSignal();
  });

  constructor() {
    this.route.params.subscribe(params => {
      const id = params['id'] ? +params['id'] : null;
      this.staffId.set(id);

      if (!id) {
        this.router.navigate(['/employee/list']).then();
      }
    });
  }

  goBack() {
    this.router.navigate(['/employee/list']).then();
  }

  editStaff() {
    const id = this.staffId();
    if (id) {
      this.router.navigate(['staff', id, 'edit']).then();
    }
  }

  deleteStaff() {
    const id = this.staffId();
    if (id && confirm('¿Está seguro de eliminar este empleado?')) {
      this.store.deleteStaff(id);
      this.router.navigate(['/staff/list']).then();
    }
  }

  viewEmployeeRecords() {
    const id = this.staffId();
    if (id) {
      this.router.navigate(['staff', id, 'records']).then();
    }
  }
}
