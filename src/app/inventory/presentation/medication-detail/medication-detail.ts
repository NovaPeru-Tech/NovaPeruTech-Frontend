import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryStore } from '../../application/inventory-store';
import { TranslatePipe } from '@ngx-translate/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatFabButton, MatIconButton } from '@angular/material/button';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatChip } from '@angular/material/chips';
import { LayoutNursingHome } from '../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';

@Component({
  selector: 'app-medication-detail',
  standalone: true,
  imports: [
    TranslatePipe,
    MatProgressSpinner,
    MatIcon,
    MatIconButton,
    MatButton,
    DatePipe,
    MatChip,
    DecimalPipe,
    MatFabButton,
    LayoutNursingHome
  ],
  templateUrl: './medication-detail.html',
  styleUrl: './medication-detail.css'
})
export class MedicationDetail {
  protected store = inject(InventoryStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  medicationId: number | null = null;

  medication = computed(() => {
    if (!this.medicationId) return undefined;
    const medicationSignal = this.store.getMedicationById(this.medicationId);
    return medicationSignal();
  });

  constructor() {
    this.route.params.subscribe(params => {
      this.medicationId = params['id'] ? +params['id'] : null;

      if (!this.medicationId) {
        this.router.navigate(['inventory/medication/list']).then();
        return;
      }

      const medication = this.store.getMedicationById(this.medicationId)();

      if (!medication) {
        console.warn('Medication not found');
      }
    });
  }

  navigateToEdit(): void {
    if (this.medicationId) {
      this.router.navigate(['inventory/medication', this.medicationId, 'edit']).then();
    }
  }

  navigateToList(): void {
    this.router.navigate(['/inventory/medication/list']).then();
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
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
