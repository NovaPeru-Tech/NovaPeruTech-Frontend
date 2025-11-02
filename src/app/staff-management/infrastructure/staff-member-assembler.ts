import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { StaffMember } from '../domain/model/staff-member.entity';
import { StaffMembersResource, StaffMembersResponse } from './staff-members-response';

export class StaffMemberAssembler implements BaseAssembler<StaffMember, StaffMembersResource, StaffMembersResponse> {
  toEntitiesFromResponse(response: StaffMembersResponse): StaffMember[] {
    return response.staffMember.map(staff => this.toEntityFromResource(staff));
  }

  toEntityFromResource(resource: StaffMembersResource): StaffMember {
    return new StaffMember({
      id: resource.id,
      state: resource.state,
      name: resource.name,
      lastname: resource.lastname,
      dni: resource.dni,

      birthDate: new Date(resource.birthDate),
      nationality: resource.nationality,
      phoneNumber: resource.phoneNumber,
      email: resource.email,
      address: resource.address,
      image: resource.image,

      contractDate: new Date(resource.contractDate),
      contractEndDate: resource.contractEndDate ? new Date(resource.contractEndDate) : undefined,
      terminationDate: resource.terminationDate ? new Date(resource.terminationDate) : undefined,
      post: resource.post,
      typeOfContract: resource.typeOfContract,
      workShift: resource.workShift,
      certifications: resource.certifications,
      emergencyContactName: resource.emergencyContactName,
      emergencyContactPhone: resource.emergencyContactPhone
    });
  }

  toResourceFromEntity(entity: StaffMember): StaffMembersResource {
    return {
      id: entity.id,
      state: entity.state,
      name: entity.name,
      lastname: entity.lastname,
      dni: entity.dni,

      birthDate: entity.birthDate.toString(),
      nationality: entity.nationality,
      phoneNumber: entity.phoneNumber,
      email: entity.email,
      address: entity.address,
      image: entity.image,


      contractDate: entity.contractDate.toISOString(),
      contractEndDate: entity.contractEndDate ? entity.contractEndDate.toISOString() : undefined,
      terminationDate: entity.terminationDate ? entity.terminationDate.toISOString() : undefined,

      post: entity.post,
      typeOfContract: entity.typeOfContract,
      workShift: entity.workShift,
      certifications: entity.certifications,
      emergencyContactName: entity.emergencyContactName,
      emergencyContactPhone: entity.emergencyContactPhone
    } as StaffMembersResource;
  }
}
