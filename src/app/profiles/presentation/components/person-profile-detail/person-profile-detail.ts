import { Component, computed, effect, EventEmitter, inject, input, Input, Output } from '@angular/core';
import {MatCard, MatCardContent} from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';
import { ProfilesStore } from '../../../application/profiles.store';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-person-profile-detail',
  imports: [
    MatCardContent,
    TranslatePipe,
    FormsModule,
    MatCard,
    MatIcon,
    ReactiveFormsModule
  ],
  templateUrl: './person-profile-detail.html',
  styleUrl: './person-profile-detail.css'
})
export class PersonProfileDetail {
  @Input() personProfileCard?: boolean;
  @Input() personProfileId: number | null = null;
  @Output() idsFiltered = new EventEmitter<number[]>();
  searchTerm = input('');

  readonly store = inject(ProfilesStore);

  imageLoaded: boolean = false;
  personProfiles = computed(() => this.store.personProfiles());
  personProfile = computed(() => {
    if (this.personProfileId === null) return undefined;
    return this.personProfiles().find(p => p.id === this.personProfileId);
  });

  constructor() {
    effect(() => {
      if (this.personProfileCard) {
        return;
      }

      const term = this.removeAccents(this.searchTerm());
      const personProfiles = this.personProfiles();

      if (!term) {
        this.idsFiltered.emit(personProfiles.map(pp => pp.id));
      } else {
        const filtered = personProfiles.filter(pp =>
          this.removeAccents(pp.fullName).toLowerCase().includes(term)
        );
        this.idsFiltered.emit(filtered.map(pp => pp.id));
      }
    });
  }

  removeAccents(word: string) {
    return word.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').trim();
  }

  onImageLoad() {
    this.imageLoaded = true;
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'images/shared/veyra-placeholder.png';
    this.imageLoaded = true;
  }
}
