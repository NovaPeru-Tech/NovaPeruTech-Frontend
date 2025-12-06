import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCard } from '@angular/material/card';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';
import { HcmStore } from '../../../application/hcm.store';
import { LayoutNursingHome } from '../../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import { TranslatePipe } from '@ngx-translate/core';
import { PersonProfileDetail } from '../../../../profiles/presentation/components/person-profile-detail/person-profile-detail';

@Component({
  selector: 'app-staff-member-detail',
  standalone: true,
  imports: [
    MatCard,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    MatError,
    MatFabButton,
    LayoutNursingHome,
    TranslatePipe,
    PersonProfileDetail
  ],
  templateUrl: './staff-member-detail.html',
  styleUrl: './staff-member-detail.css'
})
export class StaffMemberDetail {
  protected store = inject(HcmStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  staffMemberId = signal<number | null>(null);

  staffMember = computed(() => {
    const id = this.staffMemberId();
    if (!id) return undefined;
    const staffMemberSignal = this.store.getStaffMemberById(id);
    return staffMemberSignal();
  });

  personProfileId = computed(() => {
    const res = this.staffMember();
    return res ? res.personProfileId : null;
  });

  constructor() {
    this.route.params.subscribe(params => {
      const id = params['id'] ? +params['id'] : null;
      this.staffMemberId.set(id);

      if (!id) {
        this.router.navigate(['/hcm/staff']).then();
      }
    });
  }

  goBack() {
    this.router.navigate(['/hcm/staff']).then();
  }

  editStaffMember() {
    const id = this.staffMemberId();
    if (id) {
      this.router.navigate(['hcm/staff', id, 'edit']).then();
    }
  }

  viewEmploymentRecord() {
    const id = this.staffMemberId();
    if (id) {
      this.router.navigate(['hcm/staff', id, 'contracts']).then();
    }
  }
}
