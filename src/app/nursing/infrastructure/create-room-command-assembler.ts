import { CreateRoomCommand } from '../domain/model/create-room.command';
import { RoomCommandResource } from './create-room-commands-response';

export class CreateRoomCommandAssembler {
  toResourceFromEntity(command: CreateRoomCommand): RoomCommandResource {
    return {
      capacity: command.capacity,
      type: command.type,
      roomNumber: command.roomNumber
    } as RoomCommandResource;
  }
}
