import {VitalSignResource, VitalSignsResponse} from './vital-signs-response';
import {VitalSign} from '../domain/model/vital-sign.entity';

export class VitalSignAssembler {
  toEntitiesFromResponse(response: VitalSignsResponse): VitalSign[] {
    return response.vitalSign.map(vitalSign => this.toEntityFromResource(vitalSign));
  }

  toEntityFromResource(resource: VitalSignResource): VitalSign {
    return new VitalSign({
      id: resource.id,
      residentId: resource.residentId,
      measurementId: resource.measurementId,
      severityLevel: resource.severityLevel
    });
  }

  toResourceFromEntity(entity: VitalSign): VitalSignResource {
    return {
      id: entity.id,
      residentId: entity.residentId,
      measurementId: entity.measurementId,
      severityLevel: entity.severityLevel
    }
  }
}
