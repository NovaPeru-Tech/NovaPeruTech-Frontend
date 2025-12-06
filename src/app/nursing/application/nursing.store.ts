import { computed, Injectable, Signal, signal } from '@angular/core';
import { NursingHome } from '../domain/model/nursing-home.entity';
import { NursingApi } from '../infrastructure/nursing-api';
import {Observable, retry, throwError} from 'rxjs';
import { Resident } from '../domain/model/resident.entity';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Room } from '../domain/model/room.entity';
import { Medication } from '../domain/model/medication.entity';
import { CreateResidentCommand } from '../domain/model/create-resident.command';
import { CreateRoomCommand } from '../domain/model/create-room.command';
import { CreateMedicationCommand } from '../domain/model/create-medication.command';
import { AssignRoomCommand } from '../domain/model/assign-room.command';
import { CreateNursingHomeCommand } from '../domain/model/create-nursing-home.command';
import { Allergy } from '../domain/model/allergy.entity';
import {CreateAllergyCommand} from '../domain/model/create-allergy.command';
import {Device} from '../domain/model/device.entity';
import {VitalSign} from '../domain/model/vital-sign.entity';

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
  private readonly _allergiesSignal = signal<Allergy[]>([]);
  private readonly _devicesSignal = signal<Device[]>([]);
  private readonly _vitalSignsSignal = signal<VitalSign[]>([]);
  private readonly _loadingSignal=signal<boolean>(false);
  private readonly _errorSignal=signal<string|null>(null);
  readonly loading=this._loadingSignal.asReadonly();
  readonly error = this._errorSignal.asReadonly();
  readonly devices = this._devicesSignal.asReadonly();
  readonly allergies = this._allergiesSignal.asReadonly();
  readonly medications = this._medicationsSignal.asReadonly();
  readonly residents = this._residentSignal.asReadonly();
  readonly rooms = this._roomsSignal.asReadonly();
  readonly vitalSigns = this._vitalSignsSignal.asReadonly();

  constructor(private nursingApi: NursingApi) {}

  /*
* @purpose: Add a new nursing home
* @description: This method sets the loading state to true, clears any previous errors, and calls the API to create a new nursing home. On success, it updates the nursing homes signal and sets loading to false. On error, it sets an appropriate error message and sets loading to false.
* */
  addNursingHome(administratorId: number, createNursingHomeCommand: CreateNursingHomeCommand):void{
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.nursingApi.createNursingHome(administratorId, createNursingHomeCommand).pipe(retry(2)).subscribe({
      next:createdNursingHome=>{
        this._nursingHomesSignal.update(nursingHome=>[...nursingHome,createdNursingHome]);
        localStorage.setItem('nursingHomeId', createdNursingHome.id.toString());
        this._loadingSignal.set(false);
      },
      error:err=>{
        this._errorSignal.set(this.formatError(err,'Failed to create nursing home'));
        this._loadingSignal.set(false);
      }
    });
  }

  getNursingHomeById(administratorId: number) {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.nursingApi.getNursingHome(administratorId).pipe(retry(2)).subscribe({
      next: nursingHome => {
        this._nursingHomesSignal.set(nursingHome);
        localStorage.setItem('nursingHomeId', nursingHome.id.toString());
        this._loadingSignal.set(false);
      },
      error: err=>{
        this._errorSignal.set(this.formatError(err,'Failed to get nursing home'));
        this._loadingSignal.set(false);
      }
    })
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

  assignRoom(nursingHomeId: number, residentId: number, assignRoomCommand: AssignRoomCommand): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.nursingApi.assignRoomToResident(nursingHomeId, residentId, assignRoomCommand).pipe(retry(2)).subscribe({
      next: updatedResident => {
        this._residentSignal.update(residents =>
          residents.map(res => res.id === updatedResident.id ? updatedResident : res));
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to assign room to resident'));
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

  addAllergy(residentId: number, createAllergyCommand: CreateAllergyCommand): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.nursingApi.createAllergy(residentId, createAllergyCommand).pipe(retry(2)).subscribe({
      next: createdAllergy => {
        this._allergiesSignal.update(allergies => [...allergies, createdAllergy]);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to create allergy'));
        this._loadingSignal.set(false);
      }
    });
  }

  loadAllergies(residentId: number): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.nursingApi.getAllergies(residentId).pipe(takeUntilDestroyed()).subscribe({
      next: allergies => {
        this._allergiesSignal.set(allergies);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to get allergies'));
        this._loadingSignal.set(false);
      }
    });
  }

  loadDevices(): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.nursingApi.getDevices().pipe(takeUntilDestroyed()).subscribe({
      next: devices => {
        this._devicesSignal.set(devices);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to get devices'));
        this._loadingSignal.set(false);
      }
    });
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

  loadVitalSigns(residentId: number): void {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.nursingApi.getVitalSigns(residentId).pipe(takeUntilDestroyed()).subscribe({
      next: vitalSigns => {
        this._vitalSignsSignal.set(vitalSigns);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to load vital signs'));
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
