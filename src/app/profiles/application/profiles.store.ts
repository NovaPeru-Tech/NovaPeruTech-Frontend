import { computed, Injectable, Signal, signal } from '@angular/core';
import { BusinessProfile } from '../domain/model/business-profile.entity';
import { PersonProfile } from '../domain/model/person-profile.entity';
import { ProfilesApi } from '../infrastructure/profiles-api';
import { retry } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class ProfilesStore {
  // Signals
  private readonly _businessProfilesSignal = signal<BusinessProfile[]>([]);
  private readonly _personProfilesSignal = signal<PersonProfile[]>([]);
  private readonly _loadingSignal = signal<boolean>(false);
  private readonly _errorSignal = signal<string | null>(null);

  // Properties
  readonly businessProfiles = this._businessProfilesSignal.asReadonly();
  readonly personProfiles = this._personProfilesSignal.asReadonly();
  readonly loading = this._loadingSignal.asReadonly();
  readonly error = this._errorSignal.asReadonly();
  readonly businessProfileCount = computed(() => this.businessProfiles().length);
  readonly personProfileCount = computed(() => this.personProfiles().length);

  constructor(private profilesApi: ProfilesApi) {
    this.loadBusinessProfiles();
    this.loadPersonProfiles();
  }

  getBusinessProfileById(id: number | null | undefined): Signal<BusinessProfile | undefined> {
    return computed(() => id
      ? this.businessProfiles().find(businessProfile => businessProfile.id === id)
      : undefined
    );
  }

  addBusinessProfile(businessProfile: BusinessProfile): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.profilesApi.createBusinessProfile(businessProfile).pipe(retry(2)).subscribe({
      next: createdBusinessProfile => {
        this._businessProfilesSignal.update(businessProfiles => [...businessProfiles, createdBusinessProfile]);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to create business profile'));
        this._loadingSignal.set(false);
      }
    });
  }

  updateBusinessProfile(businessProfile: BusinessProfile): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.profilesApi.updateBusinessProfile(businessProfile).pipe(retry(2)).subscribe({
      next: updatedBusinessProfile => {
        this._businessProfilesSignal.update(businessProfiles =>
          businessProfiles.map(bp => bp.id === updatedBusinessProfile.id
            ? updatedBusinessProfile
            : bp
          ));
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to update business profile'));
        this._loadingSignal.set(false);
      }
    });
  }

  deleteBusinessProfile(id: number): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.profilesApi.deleteBusinessProfile(id).pipe(retry(2)).subscribe({
      next: () => {
        this._businessProfilesSignal.update(businessProfiles => businessProfiles.filter(businessProfile => businessProfile.id !== id));
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to delete business profile'));
        this._loadingSignal.set(false);
      }
    });
  }

  getPersonProfileById(id: number | null | undefined): Signal<PersonProfile | undefined> {
    return computed(() => id
      ? this.personProfiles().find(personProfile => personProfile.id === id)
      : undefined
    );
  }

  addPersonProfile(personProfile: PersonProfile): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.profilesApi.createPersonProfile(personProfile).pipe(retry(2)).subscribe({
      next: createdPersonProfile => {
        this._personProfilesSignal.update(personProfiles => [...personProfiles, createdPersonProfile]);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to create person profile'));
        this._loadingSignal.set(false);
      }
    });
  }

  updatePersonProfile(personProfile: PersonProfile): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.profilesApi.updatePersonProfile(personProfile).pipe(retry(2)).subscribe({
      next: updatedPersonProfile => {
        this._personProfilesSignal.update(personProfiles =>
          personProfiles.map(pp => pp.id === updatedPersonProfile.id
            ? updatedPersonProfile
            : pp
          ));
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to update person profile'));
        this._loadingSignal.set(false);
      }
    });
  }

  deletePersonProfile(id: number): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.profilesApi.deletePersonProfile(id).pipe(retry(2)).subscribe({
      next: () => {
        this._personProfilesSignal.update(personProfiles => personProfiles.filter(personProfile => personProfile.id !== id));
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to delete person profile'));
        this._loadingSignal.set(false);
      }
    });
  }

  loadBusinessProfiles(): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.profilesApi.getBusinessProfiles().pipe(takeUntilDestroyed()).subscribe({
      next: businessProfiles => {
        this._businessProfilesSignal.set(businessProfiles);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to load business profile list'));
        this._loadingSignal.set(false);
      }
    });
  }

  loadPersonProfiles(): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.profilesApi.getPersonProfiles().pipe(takeUntilDestroyed()).subscribe({
      next: personProfiles => {
        this._personProfilesSignal.set(personProfiles);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to load person profile list'));
        this._loadingSignal.set(false);
      }
    });
  }

  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found')
        ? `${fallback}: Not Found`
        : error.message;
    }
    return fallback;
  }
}
