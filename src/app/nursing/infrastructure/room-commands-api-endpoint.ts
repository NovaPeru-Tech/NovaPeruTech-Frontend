import { environment } from '../../../environments/environment';
import { RoomAssembler } from './room-assembler';
import { HttpClient } from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import { Room } from '../domain/model/room.entity';
import { RoomCommand } from '../domain/model/room.command';
import { RoomResource } from './rooms-response';
import { RoomCommandAssembler } from './room-command-assembler';
import { ErrorHandlingEnabledBaseType } from '../../shared/infrastructure/error-handling-enabled-base-type';
import {resource} from '@angular/core';

const nursingHomeRoomsEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderNursingHomeRoomsEndpointPath}`;

export class RoomCommandsApiEndpoint extends ErrorHandlingEnabledBaseType {
  private readonly roomAssembler = new RoomAssembler();
  private readonly roomCommandAssembler = new RoomCommandAssembler();

  constructor(private http: HttpClient) {
    super();
  }

  /** GET: /api/v1/nursing-homes/{nursingHomeId}/rooms */
  getAll(nursingHomeId: number): Observable<Room[]> {
    const url = nursingHomeRoomsEndpointUrl.replace('{nursingHomeId}', nursingHomeId.toString());
    return this.http.get<RoomResource[]>(url).pipe(
      map(response => {
        if(Array.isArray(response)) {
          return response.map(resource => this.roomAssembler.toEntityFromResource(resource));
        }
        return this.roomAssembler.toEntitiesFromResponse(response);
      }),
      catchError(this.handleError('Failed to fetch nursing home rooms'))
    );
  }

  /** POST: /api/v1/nursing-homes/{nursingHomeId}/rooms */
  create(nursingHomeId: number, roomCommand: RoomCommand): Observable<Room> {
    const resource = this.roomCommandAssembler.toResourceFromEntity(roomCommand);
    const url = nursingHomeRoomsEndpointUrl.replace('{nursingHomeId}', nursingHomeId.toString());
    return this.http.post<Room>(url, resource).pipe(
      map(createdRoom => this.roomAssembler.toEntityFromResource(createdRoom)),
      catchError(this.handleError('Failed to create nursing home rooms'))
    );
  }
}
