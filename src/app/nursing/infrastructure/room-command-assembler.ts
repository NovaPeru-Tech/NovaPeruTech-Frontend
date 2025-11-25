import { RoomCommand } from '../domain/model/room.command';
import { RoomCommandResource } from './room-commands-response';

export class RoomCommandAssembler {
  toResourceFromEntity(command: RoomCommand): RoomCommandResource {
    return {
      capacity: command.capacity,
      type: command.type,
      roomNumber: command.roomNumber
    } as RoomCommandResource;
  }
}
