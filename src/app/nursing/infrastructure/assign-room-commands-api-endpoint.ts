import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { ErrorHandlingEnabledBaseType } from '../../shared/infrastructure/error-handling-enabled-base-type';
import { AssignRoomCommandAssembler } from './assign-room-command-assembler';
import { AssignRoomCommand } from '../domain/model/assign-room.command';
import { ResidentAssembler } from './resident-assembler';
import { Resident } from '../domain/model/resident.entity';

const residentRoomsEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderResidentRoomsEndpointPath}`;

export class AssignRoomCommandsApiEndpoint extends ErrorHandlingEnabledBaseType {
  private readonly residentAssembler = new ResidentAssembler();
  private readonly assignRoomCommandAssembler = new AssignRoomCommandAssembler();

  constructor(private http: HttpClient) {
    super();
  }

  assignRoom(nursingHomeId: number, residentId: number, assignRoomCommand: AssignRoomCommand): Observable<Resident> {
    const resource = this.assignRoomCommandAssembler.toResourceFromEntity(assignRoomCommand);
    const url = residentRoomsEndpointUrl.replace('{nursingHomeId}', nursingHomeId.toString()).replace('{residentId}', residentId.toString());
    return this.http.post<Resident>(url, resource).pipe(
      map(assignedRoom => this.residentAssembler.toEntityFromResource(assignedRoom)),
      catchError(this.handleError('Failed to assign room to resident'))
    );
  }
}
