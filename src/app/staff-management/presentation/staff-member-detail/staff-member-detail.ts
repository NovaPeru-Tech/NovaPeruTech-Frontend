import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCard } from '@angular/material/card';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';
import { MatDivider } from '@angular/material/divider';
import { MatChip } from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { StaffManagementStore } from '../../application/staff-management.store';
import { LayoutNursingHome } from '../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import { TranslatePipe } from '@ngx-translate/core';

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

  imageLoadedMap: Record<number, boolean> = {};
  staffMemberId = signal<number | null>(null);
  staffMember = computed(() => {
    const id = this.staffMemberId();
    if (!id) return undefined;
    const staffMemberSignal = this.store.getStaffMemberById(id);
    return staffMemberSignal();
  });

  constructor() {
    this.route.params.subscribe(params => {
      const id = params['id'] ? +params['id'] : null;
      this.staffMemberId.set(id);

      if (!id) {
        this.router.navigate(['/staff/list']).then();
      }
    });
  }

  onImageLoad(id: number) {
    this.imageLoadedMap[id] = true;
  }

  onImageError(event: Event, id: number) {
    const img = event.target as HTMLImageElement;
    img.src = 'images/shared/veyra-placeholder.png';
    this.imageLoadedMap[id] = true;
  }

  goBack() {
    this.router.navigate(['/staff/list']).then();
  }

  editStaffMember() {
    const id = this.staffMemberId();
    if (id) {
      this.router.navigate(['staff/list', id, 'edit']).then();
    }
  }

  deleteStaffMember() {
    const id = this.staffMemberId();
    if (id && confirm('¿Está seguro de eliminar este empleado?')) {
      this.store.deleteStaff(id);
      this.router.navigate(['/staff/list']).then();
    }
  }

  viewEmploymentRecord() {
    const id = this.staffMemberId();
    if (id) {
      this.router.navigate(['staff/list', id, 'records']).then();
    }
  }
}
