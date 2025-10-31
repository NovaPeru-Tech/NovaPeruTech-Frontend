import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { HttpClient } from '@angular/common/http';
import { ResidentsApiEndpoint } from './residents-api-endpoint';
import { Resident } from '../domain/model/resident.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Service class to handle Resident API operations.
 * Provides CRUD methods for managing residents through HTTP requests.
 */
export class ResidentsApi extends BaseApi {
  private readonly _residentsApiEndPoint: ResidentsApiEndpoint;

  /**
   * Initializes the Resident API service with the required HTTP client.
   * @param http - Angular HttpClient used to perform API requests.
   */
  constructor(http: HttpClient) {
    super();
    this._residentsApiEndPoint = new ResidentsApiEndpoint(http);
  }

  /**
   * Creates a new resident.
   * @param resident - Resident entity to be created.
   * @returns Observable with the created resident.
   */
  createResident(resident: Resident): Observable<Resident> {
    return this._residentsApiEndPoint.create(resident);
  }

  /**
   * Updates an existing resident.
   * @param Resident - Resident entity with updated information.
   * @returns Observable with the updated resident.
   */
  updateResident(Resident: Resident): Observable<Resident> {
    return this._residentsApiEndPoint.update(Resident, Resident.id);
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
}
