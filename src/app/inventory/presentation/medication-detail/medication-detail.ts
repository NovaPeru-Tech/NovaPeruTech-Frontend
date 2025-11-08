import {Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {InventoryStore} from '../../application/inventory-store';
import {TranslatePipe} from '@ngx-translate/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {DatePipe, DecimalPipe} from '@angular/common';
import {MatChip} from '@angular/material/chips';
import {LayoutNursingHome} from '../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import {MatCard} from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-medication-detail',
  standalone: true,
  imports: [
    TranslatePipe,
    MatProgressSpinner,
    MatIcon,
    MatButton,
    DatePipe,
    MatChip,
    DecimalPipe,
    LayoutNursingHome,
    MatCard,
    ReactiveFormsModule,
    MatDivider
  ],
  templateUrl: './medication-detail.html',
  styleUrl: './medication-detail.css'
})
export class MedicationDetail {
  protected store = inject(InventoryStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  imageLoadedMap: Record<number, boolean> = {};
  medicationId = signal<number | null>(null);

  medication = computed(() => {
    const id = this.medicationId();
    if (!id) return undefined;
    const medicationSignal = this.store.getMedicationById(id);
    return medicationSignal();
  });

  constructor() {
    this.route.params.subscribe(params => {
      const id = params['id'] ? +params['id'] : null;
      this.medicationId.set(id);
      if (!id) {
        this.router.navigate(['inventory/medication/list']).then();
        return;
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
    this.router.navigate(['/inventory/medication/list']).then();
  }

  editMedication() {
    const id = this.medicationId();
    if (id) {
      this.router.navigate(['/inventory/medication/list', id, 'edit']).then();
    }
  }

  deleteMedication() {
    const id = this.medicationId();
    if (id && confirm('¿Está seguro de eliminar este medicamento?')) {
      this.store.deleteMedication(id);
      this.router.navigate(['/inventory/medication/list']).then();
    }
  }

  getStockPercentage(): number {
    const med = this.medication();
    if (!med) return 0;
    return (med.quantity / med.maximumStock) * 100;
  }

  getStockStatusClass(): string {
    const med = this.medication();
    if (!med) return 'normal';

    if (med.isLowStock()) return 'low';
    if (med.quantity >= med.maximumStock * 0.8) return 'high';
    return 'normal';
  }

  getExpirationStatusClass(): string {
    const med = this.medication();
    if (!med) return 'normal';

    if (med.isExpired()) return 'expired';
    if (med.isNearExpiration()) return 'warning';
    return 'normal';
  }

  getDaysUntilExpiration(): number {
    const med = this.medication();
    if (!med) return 0;

    const today = new Date();
    const expiration = new Date(med.expirationDate);
    const diffTime = expiration.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
