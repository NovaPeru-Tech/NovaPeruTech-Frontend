import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { HcmStore } from '../../../application/hcm.store';
import { LayoutNursingHome } from '../../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import { MatInput } from '@angular/material/input';
import { PersonProfileDetail } from '../../../../profiles/presentation/components/person-profile-detail/person-profile-detail';

@Component({
  selector: 'app-staff-member-list',
  standalone: true,
  imports: [
    TranslatePipe,
    MatProgressSpinner,
    MatError,
    MatCard,
    MatIcon,
    MatButton,
    LayoutNursingHome,
    MatFormField,
    MatIconButton,
    MatInput,
    MatLabel,
    MatPrefix,
    MatSuffix,
    PersonProfileDetail
  ],
  templateUrl: './staff-member-list.html',
  styleUrl: './staff-member-list.css'
})
export class StaffMemberList {
  readonly store = inject(HcmStore);
  protected router = inject(Router);
  nursingHomeId: number = Number(localStorage.getItem('nursingHomeId'));

  constructor() {
    this.store.loadStaff(this.nursingHomeId);
  }

  selectedId: number | null = null;
  searchTerm = signal('');
  filteredPersonProfilesIds = signal<number[]>([]);
  staff = computed(() => this.store.staff());

  onFiltered(ids: number[]) {
    this.filteredPersonProfilesIds.set(ids);
  }

  filteredStaff = computed(() => {
    const ids = this.filteredPersonProfilesIds();
    const allStaff = this.staff();
    const term = this.searchTerm();

    if (!term) {
      return allStaff;
    }

    return allStaff.filter(staff => ids.includes(staff.personProfileId));
  });

  selectStaffMember(id: number) {
    this.selectedId = this.selectedId === id ? null : id;
  }

  viewDetails(id: number) {
    this.router.navigate(['hcm/staff', id, 'show']).then();
  }

  editStaffMember(id: number) {
    this.router.navigate(['hcm/staff', id, 'edit']).then();
    if (this.selectedId === id) {
      this.selectedId = null;
    }
  }

  navigateToNew() {
    this.router.navigate(['hcm/staff/new']).then();
  }

  navigateToNewContract(id: number) {
    this.router.navigate(['hcm/staff', id,'contracts', 'new']).then();
  }
}
