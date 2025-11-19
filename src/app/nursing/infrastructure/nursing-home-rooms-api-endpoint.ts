import { environment } from '../../../environments/environment';
import { RoomAssembler } from './room-assembler';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Room } from '../domain/model/room.entity';
import { CreateRoomCommand } from '../domain/commands/create-room-command';
import { RoomResource } from './rooms-response';

const nursingHomeRoomsEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderNursingHomeRoomsEndpointPath}`;

export class NursingHomeRoomsApiEndpoint {
  private readonly assembler = new RoomAssembler();

  constructor(private http: HttpClient) {}

  /** GET: /api/v1/nursing-homes/{nursingHomeId}/rooms */
  getAll(nursingHomeId: number): Observable<Room[]> {
    const url = nursingHomeRoomsEndpointUrl.replace('{nursingHomeId}', nursingHomeId.toString());
    return this.http.get<RoomResource[]>(encodeURI(url)).pipe(
      map(list => list.map(r => this.assembler.toEntityFromResource(r)))
    );
  }

  /** POST: /api/v1/nursing-homes/{nursingHomeId}/rooms */
  create(nursingHomeId: number, command: CreateRoomCommand): Observable<Room> {
    const url = nursingHomeRoomsEndpointUrl.replace('{nursingHomeId}', nursingHomeId.toString());
    return this.http.post<RoomResource>(encodeURI(url), command).pipe(
      map(r => this.assembler.toEntityFromResource(r))
    );
  }
}
