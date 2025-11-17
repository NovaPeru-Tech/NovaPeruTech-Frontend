import { computed, Injectable, Signal, signal } from '@angular/core';
import { Medication } from '../domain/medication.entity';
import { InventoryApi } from '../infrastructure/inventory-api';
import { retry } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
/**
 * Store service that manages medication state using Angular signals.
 * Handles API calls, loading states, and error management.
 */
export class InventoryStore {
  private readonly _medicationsSignal = signal<Medication[]>([]);
  private readonly _loadingSignal = signal<boolean>(false);
  private readonly _errorSignal = signal<string | null>(null);

  /** Read-only signal with the list of medications. */
  readonly medications = this._medicationsSignal.asReadonly();

  /** Read-only signal that indicates if a request is in progress. */
  readonly loading = this._loadingSignal.asReadonly();

  /** Read-only signal containing any error message. */
  readonly error = this._errorSignal.asReadonly();

  /**
   * Initializes the store and automatically loads all medications.
   * @param inventoryApi - Service used to perform API operations.
   */
  constructor(private inventoryApi: InventoryApi) {
    this.loadMedications();
  }

  /**
   * Retrieves a medication by ID as a reactive signal.
   * @param id - Medication unique identifier.
   * @returns A computed signal of the selected medication.
   */
  getMedicationById(id: number): Signal<Medication | undefined> {
    return computed(() => id ? this.medications().find(m => m.id === id) : undefined);
  }

  /**
   * Creates a new medication and updates the store state.
   * @param medication - Medication entity to create.
   */
  addMedication(medication: Medication): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);

    this.inventoryApi.createMedication(medication).pipe(retry(2)).subscribe({
      next: created => {
        this._medicationsSignal.update(list => [...list, created]);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to create medication'));
        this._loadingSignal.set(false);
      }
    });
  }

  /**
   * Updates an existing medication and refreshes the store.
   * @param medication - Medication entity with updated information.
   */
  updateMedication(medication: Medication): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);

    this.inventoryApi.updateMedication(medication).pipe(retry(2)).subscribe({
      next: updated => {
        this._medicationsSignal.update(list =>
          list.map(m => m.id === updated.id ? updated : m)
        );
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to update medication'));
        this._loadingSignal.set(false);
      }
    });
  }

  /**
   * Deletes a medication by ID and updates the local list.
   * @param id - ID of the medication to delete.
   */
  deleteMedication(id: number): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);

    this.inventoryApi.DeleteMedications(id).pipe(retry(2)).subscribe({
      next: () => {
        this._medicationsSignal.update(list => list.filter(m => m.id !== id));
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to delete medication'));
        this._loadingSignal.set(false);
      }
    });
  }

  /**
   * Loads all medications from the API into the store.
   */
  loadMedications(): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);

    this.inventoryApi.getMedications().pipe(takeUntilDestroyed()).subscribe({
      next: meds => {
        this._medicationsSignal.set(meds);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to load medications'));
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
  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found')
        ? `${fallback}: Not Found`
        : error.message;
    }
    return fallback;
  }
}
