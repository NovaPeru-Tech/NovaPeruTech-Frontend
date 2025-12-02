import { computed, Injectable, Signal, signal } from '@angular/core';
import { NursingHome } from '../domain/model/nursing-home.entity';
import { NursingApi } from '../infrastructure/nursing-api';
import { retry, throwError } from 'rxjs';
import { Resident } from '../domain/model/resident.entity';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Room } from '../domain/model/room.entity';
import { Medication } from '../domain/model/medication.entity';
import { CreateResidentCommand } from '../domain/model/create-resident.command';
import { CreateRoomCommand } from '../domain/model/create-room.command';
import {CreateMedicationCommand} from '../domain/model/create-medication.command';

/*
* @purpose: Manage the state of nursing homes in the application
* @description: This service uses Angular's signal to manage the state of nursing homes, loading status, and error messages.
* */

@Injectable({
  providedIn: 'root'
})
export class NursingStore {
  private readonly _medicationsSignal = signal<Medication[]>([]);
  private readonly _residentSignal = signal<Resident[]>([]);
  private readonly _nursingHomesSignal= signal<NursingHome[]>([]);
  private readonly _roomsSignal = signal<Room[]>([]);
  private readonly _loadingSignal=signal<boolean>(false);
  private readonly _errorSignal=signal<string|null>(null);
  readonly loading=this._loadingSignal.asReadonly();
  readonly error = this._errorSignal.asReadonly();
  readonly medications = this._medicationsSignal.asReadonly();
  readonly nursingHomes=this._nursingHomesSignal.asReadonly();
  readonly residents = this._residentSignal.asReadonly();
  readonly rooms = this._roomsSignal.asReadonly();
  readonly roomCount = computed(() => this.rooms().length);

  constructor(private nursingApi: NursingApi) {}

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

  createResidentInNursingHome(nursingHomeId: number, createResidentCommand: CreateResidentCommand) {
    this.nursingApi.createResidentToNursingHome(nursingHomeId, createResidentCommand).pipe(retry(2)).subscribe({
      next: createdResident => {
        this._residentSignal.update(residents => [...residents, createdResident]);
        this._loadingSignal.set(false);
      },
      error: err => {
      this._errorSignal.set(this.formatError(err, 'Failed to create resident in nursing home'));
      this._loadingSignal.set(false);
      }
    });
  }

  loadResidentsByNursingHome(nursingHomeId: number): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);

    this.nursingApi.getResidentsByNursingHome(nursingHomeId).pipe(takeUntilDestroyed()).subscribe({
      next: residents => {
        this._residentSignal.set(residents);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to load residents for nursing home'));
        this._loadingSignal.set(false);
      }
    });
  }

  loadRoomsByNursingHome(nursingHomeId: number): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);

    this.nursingApi.getRoomsByNursingHome(nursingHomeId).pipe(takeUntilDestroyed()).subscribe({
      next: rooms => {
        this._roomsSignal.set(rooms);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to load rooms for nursing home'));
        this._loadingSignal.set(false);
      }
    });
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

  updateResident(residentId: number, createResidentCommand: CreateResidentCommand) {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.nursingApi.updateResident(residentId, createResidentCommand).pipe(retry(2)).subscribe({
      next: updatedResident => {
        this._residentSignal.update(residents =>
          residents.map(res => res.id === updatedResident.id ? updatedResident : res));
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to update resident'));
        this._loadingSignal.set(false);
        return throwError(() => err);
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

  addRoom(nursingHomeId: number, createRoomCommand: CreateRoomCommand): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.nursingApi.createRoom(nursingHomeId, createRoomCommand).pipe(retry(2)).subscribe({
      next: createdRoom => {
        this._roomsSignal.update(rooms => [...rooms, createdRoom]);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to create room'));
        this._loadingSignal.set(false);
      }
    });
  }

  addMedication(residentId: number, createMedicationCommand: CreateMedicationCommand): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.nursingApi.createMedication(residentId, createMedicationCommand).pipe(retry(2)).subscribe({
      next: createdMedication => {
        this._medicationsSignal.update(medications => [...medications, createdMedication]);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to create medication'));
        this._loadingSignal.set(false);
      }
    });
  }

  getMedicationById(id: number | null | undefined): Signal<Medication | undefined> {
    return computed(() => id
      ? this.medications().find(medication => medication.id === id)
      : undefined
    );
  }

  getMedicationsByResidentId(residentId: number): Signal<Medication[]> {
    return computed(() => this.medications().filter(medication => medication.residentId === residentId));
  }
  /**
   * Loads all residents from the API into the store.
   */
  loadMedications(residentId: number): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.nursingApi.getMedications(residentId).pipe(takeUntilDestroyed()).subscribe({
      next: medications => {
        this._medicationsSignal.set(medications);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to load medications'));
        this._loadingSignal.set(false);
      }
    });
  }

  /**
   *  @purpose: Format error messages
   *  @description: This private method takes an error object and a fallback string.
   *  If the error is an instance of Error, it checks if the message includes 'Resource not found' and returns a formatted message.
   *  Otherwise, it returns the fallback string.
   */
  private formatError(error:any,fallback:string):string{
    if(error instanceof Error){
      return error.message.includes('Resource not found ')?`${fallback}:Not Found`:error.message;

    }
    return fallback;
  }
}
