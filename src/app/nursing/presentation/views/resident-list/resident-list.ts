import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { LayoutNursingHome } from '../../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule }  from '@angular/forms';
import { NursingStore } from '../../../application/nursing.store';
@Component({
  selector: 'app-resident-list',
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
    MatLabel,
    MatInput,
    FormsModule,
    MatIconButton,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './resident-list.html',
  styleUrl: './resident-list.css'
})
export class ResidentList {
  readonly store = inject(NursingStore);
  protected router = inject(Router);

  selectedId: number | null = null;
  imageLoadedMap: Record<number, boolean> = {};
  searchTerm = signal('');
  residents = computed(() => this.store.residents());
  filteredResidents = computed(() => {
    const term = this.removeAccents(this.searchTerm().toLowerCase().trim());
    const residents = this.residents();

    if (!term) return residents;

    return residents.filter(r => {
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

  removeAccents(word: string) {
    return word.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').trim();
  }

  selectResident(id: number) {
    this.selectedId = this.selectedId === id ? null : id;
  }

  viewDetails(id: number) {
    this.router.navigate(['residents/list', id, 'detail']).then();
  }

  editResident(id: number) {
    this.router.navigate(['residents/list', id, 'edit']).then();
    if (this.selectedId === id) {
      this.selectedId = null;
    }
  }

  deleteResident(id: number) {
    this.store.deleteResident(id);
  };

  navigateToNew(){
    this.router.navigate(['residents/list/new']).then();
  }
}
