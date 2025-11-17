import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Room } from '../domain/model/room.entity';
import { RoomResource, RoomsResponse } from './rooms-response';
import { RoomAssembler } from './room-assembler';
import { HttpClient } from '@angular/common/http';

const roomsEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderRoomsEndpointPath}`

export class RoomsApiEndpoint extends BaseApiEndpoint<Room, RoomResource, RoomsResponse, RoomAssembler> {
  constructor(http: HttpClient) {
    super(http, roomsEndpointUrl, new RoomAssembler());
  }
}
