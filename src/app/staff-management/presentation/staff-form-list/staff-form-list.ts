import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { StaffManagementStore } from '../../application/staff-management.store';
import { LayoutNursingHome } from '../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';

@Component({
  selector: 'app-staff-form-list',
  standalone: true,
  imports: [
    TranslatePipe,
    MatProgressSpinner,
    MatError,
    MatCard,
    MatCardContent,
    MatIcon,
    MatIconButton,
    MatButton,
    LayoutNursingHome
  ],
  templateUrl: './staff-form-list.html',
  styleUrl: './staff-form-list.css'
})
export class StaffFormList {
  readonly store = inject(StaffManagementStore);
  protected router = inject(Router);
  selectedId: number | null = null;

  selectStaff(id: number) {
    this.selectedId = this.selectedId === id ? null : id;
  }

  staff = computed(() => this.store.staffMembers());

  viewDetails(id: number) {
    this.router.navigate(['employee', id, 'detail']).then();
  }

  editStaff(id: number) {
    this.router.navigate(['employee', id, 'edit']).then();
    if (this.selectedId === id) {
      this.selectedId = null;
    }
  }

  deleteStaff(id: number) {
    this.store.deleteStaff(id);
  }

  navigateToNew() {
    this.router.navigate(['employee/register']).then();
  }
}
