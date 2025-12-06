import { Injectable } from '@angular/core';
import { NursingHome } from '../domain/model/nursing-home.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NursingHomesApiEndpoint } from './nursing-homes-api-endpoint';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Resident } from '../domain/model/resident.entity';
import { ResidentsApiEndpoint } from './residents-api-endpoint';
import { RoomsApiEndpoint } from './rooms-api-endpoint';
import { Room } from '../domain/model/room.entity';
import { MedicationsApiEndpoint } from './medications-api-endpoint';
import { Medication } from '../domain/model/medication.entity';
import { CreateResidentCommandsApiEndpoint } from './create-resident-commands-api-endpoint';
import { CreateResidentCommand } from '../domain/model/create-resident.command';
import { CreateRoomCommandsApiEndpoint } from './create-room-commands-api-endpoint';
import { CreateRoomCommand } from '../domain/model/create-room.command';
import { CreateMedicationCommandsApiEndpoint } from './create-medication-commands-api-endpoint';
import { CreateMedicationCommand } from '../domain/model/create-medication.command';
import { AssignRoomCommandsApiEndpoint } from './assign-room-commands-api-endpoint';
import { AssignRoomCommand } from '../domain/model/assign-room.command';
import { CreateNursingHomeCommandsApiEndpoint } from './create-nursing-home-commands-api-endpoint';
import { CreateNursingHomeCommand } from '../domain/model/create-nursing-home.command';
import { AllergiesApiEndpoint } from './allergies-api-endpoint';
import { CreateAllergyCommandsApiEndpoint } from './create-allergy-commands-api-endpoint';
import { Allergy } from '../domain/model/allergy.entity';
import { CreateAllergyCommand } from '../domain/model/create-allergy.command';

/**
 * @purpose: Service to interact with the Nursing Home API
 * @description: This service provides methods to create, update, and retrieve nursing home data by communicating with the Nursing Home API endpoint.
 */
@Injectable({
  providedIn: 'root'
})
/**
 * Service class to handle Resident and Nursing API operations.
 * Provides CRUD methods for managing residents through HTTP requests.
 */
export class NursingApi extends BaseApi{
  private readonly _nursingHomesApidEndpoint:NursingHomesApiEndpoint;
  private readonly _residentsApiEndPoint: ResidentsApiEndpoint;
  private readonly _roomsApiEndpoint: RoomsApiEndpoint;
  private readonly _medicationsApiEndpoint: MedicationsApiEndpoint;
  private readonly _residentCommandsApiEndpoint: CreateResidentCommandsApiEndpoint;
  private readonly _roomCommandsApiEndpoint: CreateRoomCommandsApiEndpoint;
  private readonly _medicationCommandsApiEndpoint: CreateMedicationCommandsApiEndpoint;
  private readonly _assignRoomCommandsApiEndpoint: AssignRoomCommandsApiEndpoint;
  private readonly _createNursingHomeCommandsApiEndpoint: CreateNursingHomeCommandsApiEndpoint;
  private readonly _allergiesApiEndpoint: AllergiesApiEndpoint;
  private readonly _createAllergyCommandsApiEndpoint: CreateAllergyCommandsApiEndpoint;

  /**
   * Initializes the Resident, Room and Nursing Home API service with the required HTTP client.
   * @param http - Angular HttpClient used to perform API requests.
   */
  constructor(http:HttpClient) {
    super();
    this._nursingHomesApidEndpoint=new NursingHomesApiEndpoint(http);
    this._residentsApiEndPoint = new ResidentsApiEndpoint(http);
    this._roomsApiEndpoint = new RoomsApiEndpoint(http);
    this._medicationsApiEndpoint = new MedicationsApiEndpoint(http);
    this._residentCommandsApiEndpoint = new CreateResidentCommandsApiEndpoint(http);
    this._roomCommandsApiEndpoint = new CreateRoomCommandsApiEndpoint(http);
    this._medicationCommandsApiEndpoint = new CreateMedicationCommandsApiEndpoint(http);
    this._assignRoomCommandsApiEndpoint = new AssignRoomCommandsApiEndpoint(http);
    this._createNursingHomeCommandsApiEndpoint = new CreateNursingHomeCommandsApiEndpoint(http);
    this._allergiesApiEndpoint = new AllergiesApiEndpoint(http);
    this._createAllergyCommandsApiEndpoint = new CreateAllergyCommandsApiEndpoint(http);
  }

  createNursingHome(administratorId: number, createNursingHomeCommand: CreateNursingHomeCommand):Observable<NursingHome>{
    return this._createNursingHomeCommandsApiEndpoint.create(administratorId, createNursingHomeCommand);
  }

  getNursingHome(administratorId: number):Observable<any>{
    return this._createNursingHomeCommandsApiEndpoint.getByAdministratorId(administratorId);
  }

  createResidentToNursingHome(nursingHomeId: number, command: CreateResidentCommand): Observable<Resident> {
    return this._residentCommandsApiEndpoint.create(nursingHomeId, command);
  }

  getResidentsByNursingHome(nursingHomeId: number): Observable<Resident[]> {
    return this._residentCommandsApiEndpoint.getAll(nursingHomeId);
  }

  createRoomToNursingHome(nursingHomeId: number, command: CreateRoomCommand): Observable<Room> {
    return this._roomCommandsApiEndpoint.create(nursingHomeId, command);
  }

  getRoomsByNursingHome(nursingHomeId: number): Observable<Room[]> {
    return this._roomCommandsApiEndpoint.getAll(nursingHomeId);
  }

  /**
   * Creates a new resident.
   * @param resident - Resident entity to be created.
   * @returns Observable with the created resident.
   */
  createResident(resident: Resident): Observable<Resident> {
    return this._residentsApiEndPoint.create(resident);
  }

  updateResident(residentId: number, residentCommand: CreateResidentCommand): Observable<Resident> {
    return this._residentCommandsApiEndpoint.update(residentId, residentCommand);
  }

  /**
   * Deletes a resident by ID.
   * @param id - Unique identifier of the resident to delete.
   * @returns Observable that completes when deletion is done.
   */
  deleteResident(id: number): Observable<void> {
    return this._residentsApiEndPoint.delete(id);
  }

  /**
   * Retrieves all residents.
   * @returns Observable containing a list of residents.
   */
  getResidents() {
    return this._residentsApiEndPoint.getAll();
  }

  getRooms(nursingHomeId: number): Observable<Room[]> {
    return this._roomCommandsApiEndpoint.getAll(nursingHomeId);
  }

  createRoom(nursingHomeId: number, roomCommand: CreateRoomCommand): Observable<Room> {
    return this._roomCommandsApiEndpoint.create(nursingHomeId, roomCommand);
  }

  getMedications(residentId: number): Observable<Medication[]> {
    return this._medicationCommandsApiEndpoint.getAll(residentId);
  }

  createMedication(residentId: number, medicationCommand: CreateMedicationCommand): Observable<Medication> {
    return this._medicationCommandsApiEndpoint.create(residentId, medicationCommand);
  }

  assignRoomToResident(nursingHomeId: number, residentId: number, assignRoomCommand: AssignRoomCommand): Observable<Resident> {
    return this._assignRoomCommandsApiEndpoint.assignRoom(nursingHomeId, residentId, assignRoomCommand);
  }

  getAllergies(residentId: number): Observable<Allergy[]> {
    return this._allergiesApiEndpoint.getAll(residentId);
  }

  createAllergy(residentId: number, createAllergyCommand: CreateAllergyCommand): Observable<Allergy> {
    return this._createAllergyCommandsApiEndpoint.create(residentId, createAllergyCommand);
  }
}
