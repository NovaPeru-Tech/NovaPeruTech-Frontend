import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface RoomResource extends BaseResource {
  id: number;
  roomNumber: string;
  nursingHomeId: number;
  capacity: number;
  occupied: number;
  type: string;
  status: string;
}

export interface RoomsResponse extends BaseResponse {
  rooms: RoomResource[];
}
