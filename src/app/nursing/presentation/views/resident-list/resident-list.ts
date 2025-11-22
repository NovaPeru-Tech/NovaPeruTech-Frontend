import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { LayoutNursingHome } from '../../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule }  from '@angular/forms';
import { NursingStore } from '../../../application/nursing.store';
import { PersonProfileDetail } from '../../../../profiles/presentation/components/person-profile-detail/person-profile-detail';

@Component({
  selector: 'app-resident-list',
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
    MatLabel,
    MatInput,
    FormsModule,
    MatIconButton,
    MatInputModule,
    MatFormFieldModule,
    PersonProfileDetail
  ],
  templateUrl: './resident-list.html',
  styleUrl: './resident-list.css'
})
export class ResidentList {
  readonly store = inject(NursingStore);
  protected router = inject(Router);

  selectedId: number | null = null;
  searchTerm = signal('');
  filteredPersonProfilesIds = signal<number[]>([]);
  residents = computed(() => this.store.residents());

  onFiltered(ids: number[]) {
    this.filteredPersonProfilesIds.set(ids);
  }

  filteredResidents = computed(() => {
    const ids = this.filteredPersonProfilesIds();
    const allResidents = this.residents();
    const term = this.searchTerm();

    if (term && ids.length === 0) {
      return [];
    }

    return allResidents.filter(r => ids.includes(r.personProfileId));
  });

  selectResident(id: number) {
    this.selectedId = this.selectedId === id ? null : id;
  }

  viewDetails(id: number) {
    this.router.navigate(['residents/list', id, 'detail']).then();
  }

  viewMedications(id: number) {
    this.router.navigate(['medications/list', id]).then();
  }

  editResident(id: number) {
    this.router.navigate(['residents/list', id, 'edit']).then();
    if (this.selectedId === id) {
      this.selectedId = null;
    }
  }

  deleteResident(id: number) {
    if (!confirm("¿Estás seguro de que deseas eliminar este residente? Esta acción no se puede deshacer.")) {
      return;
    }

    this.store.deleteResident(id);
  };

  navigateToNew(){
    this.router.navigate(['residents/list/new']).then();
  }
}
