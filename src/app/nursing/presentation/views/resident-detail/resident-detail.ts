import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCard } from '@angular/material/card';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';
import { LayoutNursingHome } from '../../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import { TranslatePipe } from '@ngx-translate/core';
import { NursingStore } from '../../../application/nursing.store';
import { PersonProfileDetail } from '../../../../profiles/presentation/components/person-profile-detail/person-profile-detail';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-resident-detail',
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
    PersonProfileDetail,
    ReactiveFormsModule
  ],
  templateUrl: './resident-detail.html',
  styleUrl: './resident-detail.css'
})
export class ResidentDetail {
  protected store = inject(NursingStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  residentId = signal<number | null>(null);

  resident = computed(() => {
    const id = this.residentId();
    if (!id) return undefined;
    const residentSignal = this.store.getResidentById(id);
    return residentSignal();
  });

  personProfileId = computed(() => {
    const res = this.resident();
    return res ? res.personProfileId : null;
  });

  constructor() {
    this.route.params.subscribe(params => {
      const id = params['id'] ? +params['id'] : null;
      this.residentId.set(id);

      if (!id) {
        this.router.navigate(['/residents/list']).then();
      }
    });
  }

  goBack() {
    this.router.navigate(['/residents/list']).then();
  }

  editResident() {
    const id = this.residentId();
    if (id) {
      this.router.navigate(['residents/list', id, 'edit']).then();
    }
  }

  deleteResident() {
    const id = this.residentId();
    if (id && confirm('¿Está seguro de eliminar este residente?')) {
      this.store.deleteResident(id);
      this.router.navigate(['/residents/list']).then();
    }
  }

  viewMedicalHistory() {
    const id = this.residentId();
    if (id) {
      this.router.navigate(['residents/list', id, 'medical-history']).then();
    }
  }
}
