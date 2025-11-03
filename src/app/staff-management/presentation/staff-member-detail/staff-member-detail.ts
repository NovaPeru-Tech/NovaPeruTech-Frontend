import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCard } from '@angular/material/card';
import { MatButton, MatFabButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';
import { MatDivider } from '@angular/material/divider';
import { MatChip } from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { StaffManagementStore } from '../../application/staff-management.store';
import { LayoutNursingHome } from '../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-staff-member-detail',
  standalone: true,
  imports: [
    MatCard,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    MatError,
    MatDivider,
    MatChip,
    MatIconButton,
    MatFabButton,
    DatePipe,
    LayoutNursingHome,
    TranslatePipe
  ],
  templateUrl: './staff-member-detail.html',
  styleUrl: './staff-member-detail.css'
})
export class StaffMemberDetail {
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

  editStaffMember() {
    const id = this.staffId();
    if (id) {
      this.router.navigate(['staff', id, 'edit']).then();
    }
  }

  deleteStaffMember() {
    const id = this.staffId();
    if (id && confirm('¿Está seguro de eliminar este empleado?')) {
      this.store.deleteStaff(id);
      this.router.navigate(['/staff/list']).then();
    }
  }

  viewEmploymentRecord() {
    const id = this.staffId();
    if (id) {
      this.router.navigate(['staff', id, 'records']).then();
    }
  }
}
