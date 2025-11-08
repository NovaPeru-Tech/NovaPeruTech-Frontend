import {computed, Injectable, Signal, signal} from '@angular/core';
import {NursingHome} from '../domain/model/nursing-home.entity';
import {NursingApi} from '../infrastructure/nursing-api';
import {retry} from 'rxjs';
import {Resident} from '../domain/model/resident.entity';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

/*
* @purpose: Manage the state of nursing homes in the application
* @description: This service uses Angular's signal to manage the state of nursing homes, loading status, and error messages.
* */

@Injectable({
  providedIn: 'root'
})
export class NursingStore {
  private readonly _residentSignal = signal<Resident[]>([]);
  private readonly _nursingHomesSignal= signal<NursingHome[]>([]);
  private readonly _loadingSignal=signal<boolean>(false);
  private readonly _errorSignal=signal<string|null>(null);
  readonly loading=this._loadingSignal.asReadonly();
  readonly error = this._errorSignal.asReadonly();
  readonly nursingHomes=this._nursingHomesSignal.asReadonly();
  readonly residents = this._residentSignal.asReadonly();

  constructor(private nursingApi: NursingApi) {
    this.loadResidents();
  }

  /*
* @purpose: Add a new nursing home
* @description: This method sets the loading state to true, clears any previous errors, and calls the API to create a new nursing home. On success, it updates the nursing homes signal and sets loading to false. On error, it sets an appropriate error message and sets loading to false.
* */

  addNursingHome(nursingHome:NursingHome){
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.nursingApi.createNursingHome(nursingHome).pipe(retry(2)).subscribe({
      next:createdNursingHome=>{
        this._nursingHomesSignal.update(nursingHome=>[...nursingHome,createdNursingHome]);
        this._loadingSignal.set(false);

      },
      error:err=>{
        this._errorSignal.set(this.formatError(err,'failed to create '));
        this._loadingSignal.set(false);
      }
    });
  }

  /**
   * Retrieves a resident by ID as a reactive signal.
   * @param id - Resident unique identifier.
   * @returns A computed signal of the selected resident.
   */
  getResidentById(id: number): Signal<Resident | undefined> {
    return computed(() => id ? this.residents().find(r => r.id === id) : undefined);
  }

  /**
   * Creates a new resident and updates the store state.
   * @param Resident - Resident entity to create.
   */
  addResident(Resident: Resident): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.nursingApi.createResident(Resident).pipe(retry(2)).subscribe({
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
  updateResident(resident: Resident) {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.nursingApi.updateResident(resident).pipe(retry(2)).subscribe({
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
    this.nursingApi.deleteResident(id).pipe(retry(2)).subscribe({
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
    this.nursingApi.getResidents().pipe(takeUntilDestroyed()).subscribe({
      next: residents => {
        this._residentSignal.set(residents);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to load medications'));
        this._loadingSignal.set(false);
      }
    });
  }

  /*
* @purpose: Format error messages
* @description: This private method takes an error object and a fallback string. If the error is an instance of Error, it checks if the message includes 'Resource not found' and returns a formatted message. Otherwise, it returns the fallback string.
* */

  private formatError(error:any,fallback:string):string{
    if(error instanceof Error){
      return error.message.includes('Resource not found ')?`${fallback}:Not Found`:error.message;

    }
    return fallback;
  }
}
