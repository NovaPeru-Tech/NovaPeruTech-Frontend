import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Room } from '../domain/model/room.entity';
import { RoomResource, RoomsResponse } from './rooms-response';

export class RoomAssembler implements BaseAssembler<Room, RoomResource, RoomsResponse> {
  toEntitiesFromResponse(response: RoomsResponse): Room[] {
    return response.rooms.map(room => this.toEntityFromResource(room));
  }

  toEntityFromResource(resource: RoomResource): Room {
    return new Room({id: resource.id, number: resource.number, capacity: resource.capacity,
      occupied: resource.occupied, type: resource.type, status: resource.status });
  }

  toResourceFromEntity(entity: Room): RoomResource {
    return {
      id: entity.id,
      number: entity.number,
      capacity: entity.capacity,
      occupied: entity.occupied,
      type: entity.type,
      status: entity.status
    } as RoomResource;
  }
}
