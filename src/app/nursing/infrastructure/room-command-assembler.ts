import { CreateRoomCommand } from '../domain/model/create-room.command';
import { RoomCommandResource } from './room-commands-response';

export class RoomCommandAssembler {
  toResourceFromEntity(command: CreateRoomCommand): RoomCommandResource {
    return {
      capacity: command.capacity,
      type: command.type,
      roomNumber: command.roomNumber
    } as RoomCommandResource;
  }
}
