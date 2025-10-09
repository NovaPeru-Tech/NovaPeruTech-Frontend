import {Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ResidentStore} from '../../application/resident-store';
import {MatCard} from '@angular/material/card';
import {MatButton, MatFabButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatError} from '@angular/material/form-field';
import {MatDivider} from '@angular/material/divider';
import {MatChip} from '@angular/material/chips';
import {Toolbar} from '../../../shared/presentation/components/toolbar/toolbar';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-resident-detail',
  standalone: true,
  imports: [MatCard,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    MatError,
    MatDivider,
    MatChip,
    Toolbar,
    MatIconButton,
    MatFabButton, DatePipe
  ],
  templateUrl: './resident-detail.html',
  styleUrl: './resident-detail.css'
})
export class ResidentDetail {
  protected store = inject(ResidentStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  residentId = signal<number | null>(null);

  resident = computed(() => {
    const id = this.residentId();
    if (!id) return undefined;
    const residentSignal = this.store.getResidentById(id);
    return residentSignal();
  });

  constructor() {
    this.route.params.subscribe(params => {
      const id = params['id'] ? +params['id'] : null;
      this.residentId.set(id);

      if (!id) {
        this.router.navigate(['/resident/list']).then();
      }
    });
  }

  goBack() {
    this.router.navigate(['/resident/list']).then();
  }

  editResident() {
    const id = this.residentId();
    if (id) {
      this.router.navigate(['resident', id, 'edit']).then();
    }
  }

  deleteResident() {
    const id = this.residentId();
    if (id && confirm('¿Está seguro de eliminar este residente?')) {
      this.store.deleteResident(id);
      this.router.navigate(['/resident/list']).then();
    }
  }

  viewMedicalHistory() {
    const id = this.residentId();
    if (id) {
      this.router.navigate(['resident', id, 'medical-history']).then();
    }
  }
}
