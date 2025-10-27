import { Component, computed, inject } from '@angular/core';
import { ResidentStore } from '../../application/resident-store';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { LayoutNursingHome } from '../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
@Component({
  selector: 'app-resident-form-list',
  standalone: true,
  imports: [
    TranslatePipe,
    MatProgressSpinner,
    MatError,
    MatCard,
    MatCardContent,
    MatIcon,
    MatButton,
    LayoutNursingHome

  ],
  templateUrl: './resident-form-list.html',
  styleUrl: './resident-form-list.css'
})
export class ResidentFormList {
  readonly store = inject(ResidentStore);
  protected router = inject(Router);
  selectedId: number | null = null;
  imageLoaded = false;

  selectResident(id: number) {
    this.selectedId = this.selectedId === id ? null : id;
  }

  residents = computed(() => this.store.residents());

  viewDetails(id: number) {
    this.router.navigate(['resident', id, 'detail']).then();
  }

  editResident(id: number) {
    this.router.navigate(['resident', id, 'edit']).then();
    if (this.selectedId === id) {
      this.selectedId = null;
    }
  }

  deleteResident(id: number) {
    this.store.deleteResident(id);
  };

  navigateToNew(){
    this.router.navigate(['resident/register']).then();
  }
}
