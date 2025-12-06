import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface DeviceResource extends BaseResource {
  id: number;
  deviceId: string;
  residentId: number;
  assignedBy: string;
  assignedAt: string;
  status: string;
}

export interface DevicesResponse extends BaseResponse {
  device: DeviceResource[];
}
