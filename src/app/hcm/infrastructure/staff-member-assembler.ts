import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { StaffMember } from '../domain/model/staff-member.entity';
import { StaffResource, StaffResponse } from './staff-response';

export class StaffMemberAssembler implements BaseAssembler<StaffMember, StaffResource, StaffResponse> {
  toEntitiesFromResponse(response: StaffResponse): StaffMember[] {
    return response.staffMember.map(staff => this.toEntityFromResource(staff));
  }

  toEntityFromResource(resource: StaffResource): StaffMember {
    return new StaffMember({
      id: resource.id,
      personProfileId: resource.personProfileId,

      emergencyContactFirstName: resource.emergencyContactFirstName,
      emergencyContactLastName: resource.emergencyContactLastName,
      emergencyContactPhoneNumber: resource.emergencyContactPhoneNumber,

      status: resource.status
    });
  }

  toResourceFromEntity(entity: StaffMember): StaffResource {
    return {
      id: entity.id,
      personProfileId: entity.personProfileId,

      emergencyContactFirstName: entity.emergencyContactFirstName,
      emergencyContactLastName: entity.emergencyContactLastName,
      emergencyContactPhoneNumber: entity.emergencyContactPhoneNumber,

      status: entity.status
    } as StaffResource;
  }
}
