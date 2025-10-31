import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResidentsStore } from '../../application/residents-store';
import { MatCard } from '@angular/material/card';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';
import { MatDivider } from '@angular/material/divider';
import { MatChip } from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { LayoutNursingHome } from '../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-resident-detail',
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
  templateUrl: './resident-detail.html',
  styleUrl: './resident-detail.css'
})
export class ResidentDetail {
  protected store = inject(ResidentsStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  imageLoadedMap: Record<number, boolean> = {};
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
        this.router.navigate(['/residents/list']).then();
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
