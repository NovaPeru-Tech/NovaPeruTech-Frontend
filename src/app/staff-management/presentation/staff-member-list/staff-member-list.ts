import {Component, computed, inject, signal} from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import {MatError, MatFormField, MatLabel, MatPrefix, MatSuffix} from '@angular/material/form-field';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import { StaffManagementStore } from '../../application/staff-management.store';
import { LayoutNursingHome } from '../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-staff-member-list',
  standalone: true,
  imports: [
    TranslatePipe,
    MatProgressSpinner,
    MatError,
    MatCard,
    MatCardContent,
    MatIcon,
    MatButton,
    LayoutNursingHome,
    MatFormField,
    MatIconButton,
    MatInput,
    MatLabel,
    MatPrefix,
    MatSuffix
  ],
  templateUrl: './staff-member-list.html',
  styleUrl: './staff-member-list.css'
})
export class StaffMemberList {
  readonly store = inject(StaffManagementStore);
  protected router = inject(Router);

  selectedId: number | null = null;
  imageLoadedMap: Record<number, boolean> = {};
  searchTerm = signal('');
  staffMembers = computed(() => this.store.staffMembers());
  filteredStaffMembers = computed(() => {
    const term = this.removeAccents(this.searchTerm().toLowerCase().trim());
    const staffMembers = this.staffMembers();

    if (!term) return staffMembers;

    return staffMembers.filter(r => {
      const name = this.removeAccents(r.name);
      const lastname = this.removeAccents(r.lastname);
      return name.startsWith(term) || lastname.startsWith(term);
    });
  });

  onImageLoad(id: number) {
    this.imageLoadedMap[id] = true;
  }

  onImageError(event: Event, id: number) {
    const img = event.target as HTMLImageElement;
    img.src = 'images/shared/veyra-placeholder.png';
    this.imageLoadedMap[id] = true;
  }

  removeAccents(text: string) {
    return text.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').trim();
  }

  selectStaff(id: number) {
    this.selectedId = this.selectedId === id ? null : id;
  }

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
