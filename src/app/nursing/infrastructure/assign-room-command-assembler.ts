import { AssignRoomCommand } from '../domain/model/assign-room.command';
import { AssignRoomCommandResource } from './assign-room-commands-response';

export class AssignRoomCommandAssembler {
  toResourceFromEntity(command: AssignRoomCommand): AssignRoomCommandResource {
    return {
      roomNumber: command.roomNumber
    } as AssignRoomCommandResource;
  }
}
