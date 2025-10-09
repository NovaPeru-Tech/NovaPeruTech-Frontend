import { computed, Injectable, Signal, signal } from '@angular/core';
import { Residents } from '../domain/model/residents.entity';
import { ResidentApi } from '../infrastructure/resident-api';
import { retry } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
/**
 * Store service that manages resident state using Angular signals.
 * Handles API calls, loading states, and error management.
 */
export class ResidentStore {
  private readonly _residentSignal = signal<Residents[]>([]);
  private readonly _loadingSignal = signal<boolean>(false);
  private readonly _errorSignal = signal<string | null>(null);

  /** Read-only signal with the list of residents. */
  readonly residents = this._residentSignal.asReadonly();

  /** Read-only signal that indicates if a request is in progress. */
  readonly loading = this._loadingSignal.asReadonly();

  /** Read-only signal containing any error message. */
  readonly error = this._errorSignal.asReadonly();

  /**
   * Initializes the store and automatically loads all residents.
   * @param ResidentApi - Service used to perform API operations.
   */
  constructor(private ResidentApi: ResidentApi) {
    this.loadResidents();
  }

  /**
   * Retrieves a resident by ID as a reactive signal.
   * @param id - Resident unique identifier.
   * @returns A computed signal of the selected resident.
   */
  getResidentById(id: number): Signal<Residents | undefined> {
    return computed(() => id ? this.residents().find(r => r.id === id) : undefined);
  }

  /**
   * Creates a new resident and updates the store state.
   * @param Resident - Resident entity to create.
   */
  addResident(Resident: Residents): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.ResidentApi.createResident(Resident).pipe(retry(2)).subscribe({
      next: createdResident => {
        this._residentSignal.update(residents => [...residents, createdResident]);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to create resident'));
        this._loadingSignal.set(false);
      }
    });
  }

  /**
   * Updates an existing resident and refreshes the store.
   * @param resident - Resident entity with updated information.
   */
  updateResident(resident: Residents) {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.ResidentApi.updateResident(resident).pipe(retry(2)).subscribe({
      next: updatedResident => {
        this._residentSignal.update(residents =>
          residents.map(res => res.id === updatedResident.id ? updatedResident : res)
        );
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to update resident'));
        this._loadingSignal.set(false);
      }
    });
  }

  /**
   * Deletes a resident by ID and updates the local list.
   * @param id - ID of the resident to delete.
   */
  deleteResident(id: number) {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.ResidentApi.deleteResident(id).pipe(retry(2)).subscribe({
      next: () => {
        this._residentSignal.update(residents => residents.filter(resident => resident.id !== id));
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to delete resident'));
        this._loadingSignal.set(false);
      }
    });
  }

  /**
   * Loads all residents from the API into the store.
   */
  loadResidents() {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.ResidentApi.getResidents().pipe(takeUntilDestroyed()).subscribe({
      next: residents => {
        this._residentSignal.set(residents);
        this._loadingSignal.set(false);
      }
    });
  }

  /**
   * Handles and formats error messages for UI display.
   * @param error - Error object or response.
   * @param fallback - Default fallback message.
   * @returns A formatted error string.
   */
  formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found')
        ? `${fallback}: Not Found`
        : error.message;
    }
    return fallback;
  }
}
