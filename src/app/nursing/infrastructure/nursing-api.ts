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
import { ResidentCommandsApiEndpoint } from './resident-commands-api-endpoint';
import { ResidentCommand } from '../domain/model/resident.command';
import { RoomCommandsApiEndpoint } from './room-commands-api-endpoint';
import { RoomCommand } from '../domain/model/room.command';
import { MedicationCommandsApiEndpoint } from './medication-commands-api-endpoint';
import { MedicationCommand } from '../domain/model/medication.command';

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
  private readonly _residentCommandsApiEndpoint: ResidentCommandsApiEndpoint;
  private readonly _roomCommandsApiEndpoint: RoomCommandsApiEndpoint;
  private readonly _medicationCommandsApiEndpoint: MedicationCommandsApiEndpoint;

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
    this._residentCommandsApiEndpoint = new ResidentCommandsApiEndpoint(http);
    this._roomCommandsApiEndpoint = new RoomCommandsApiEndpoint(http);
    this._medicationCommandsApiEndpoint = new MedicationCommandsApiEndpoint(http);
  }

  createNursingHome(nursingHome:NursingHome):Observable<NursingHome>{
    return this._nursingHomesApidEndpoint.create(nursingHome);
  }

  updateNursingHome(nursingHome:NursingHome):Observable<NursingHome>{
    return this._nursingHomesApidEndpoint.update(nursingHome,nursingHome.id);
  }

  getNursingHome(id:number):Observable<any>{
    return this._nursingHomesApidEndpoint.getById(id);
  }

  createResidentToNursingHome(nursingHomeId: number, command: ResidentCommand): Observable<Resident> {
    return this._residentCommandsApiEndpoint.create(nursingHomeId, command);
  }

  getResidentsByNursingHome(nursingHomeId: number): Observable<Resident[]> {
    return this._residentCommandsApiEndpoint.getAll(nursingHomeId);
  }

  createRoomToNursingHome(nursingHomeId: number, command: RoomCommand): Observable<Room> {
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

  updateResident(residentId: number, residentCommand: ResidentCommand): Observable<Resident> {
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

  createRoom(nursingHomeId: number, roomCommand: RoomCommand): Observable<Room> {
    return this._roomCommandsApiEndpoint.create(nursingHomeId, roomCommand);
  }

  getMedications(residentId: number): Observable<Medication[]> {
    return this._medicationCommandsApiEndpoint.getAll(residentId);
  }

  createMedication(residentId: number, medicationCommand: MedicationCommand): Observable<Medication> {
    return this._medicationCommandsApiEndpoint.create(residentId, medicationCommand);
  }
}
