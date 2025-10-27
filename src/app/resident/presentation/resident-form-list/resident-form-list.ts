import {Component, computed, inject, signal} from '@angular/core';
import { ResidentStore } from '../../application/resident-store';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { LayoutNursingHome } from '../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule}  from '@angular/forms';
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
    LayoutNursingHome,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    MatIconButton,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './resident-form-list.html',
  styleUrl: './resident-form-list.css'
})
export class ResidentFormList {
  readonly store = inject(ResidentStore);
  protected router = inject(Router);

  selectedId: number | null = null;
  imageLoaded = false;
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

  removeAccents(word: string) {
    return word.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').trim();
  }

  selectResident(id: number) {
    this.selectedId = this.selectedId === id ? null : id;
  }

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
