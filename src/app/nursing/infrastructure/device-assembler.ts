import {DeviceResource, DevicesResponse} from './devices-response';
import {Device} from '../domain/model/device.entity';

export class DeviceAssembler {
  toEntitiesFromResponse(response: DevicesResponse): Device[] {
    return response.device.map(device => this.toEntityFromResource(device));
  }

  toEntityFromResource(resource: DeviceResource): Device {
    return new Device({
      id: resource.id,
      residentId: resource.residentId,
      deviceId: resource.deviceId,
      assignedBy: resource.assignedBy,
      assignedAt: resource.assignedAt,
      status: resource.status,
    });
  }

  toResourceFromEntity(entity: Device): DeviceResource {
    return {
      id: entity.id,
      residentId: entity.residentId,
      deviceId: entity.deviceId,
      assignedBy: entity.assignedBy,
      assignedAt: entity.assignedAt,
      status: entity.status
    } as DeviceResource;
  }
}
