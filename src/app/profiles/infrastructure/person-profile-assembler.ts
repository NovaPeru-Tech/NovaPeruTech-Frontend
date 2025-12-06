import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { PersonProfile } from '../domain/model/person-profile.entity';
import { PersonProfileResource, PersonProfilesResponse } from './person-profiles-response';

export class PersonProfileAssembler implements BaseAssembler<PersonProfile, PersonProfileResource, PersonProfilesResponse> {
  toEntitiesFromResponse(response: PersonProfilesResponse): PersonProfile[] {
    return response.personProfiles.map(personProfile => this.toEntityFromResource(personProfile));
  }

  toEntityFromResource(resource: PersonProfileResource): PersonProfile {
    return new PersonProfile({
      id: resource.id,
      dni: resource.dni,
      fullName: resource.fullName,
      birthDate: resource.birthDate,
      age: resource.age,
      photo:resource.photo,
      phoneNumber: resource.phoneNumber,
      emailAddress: resource.emailAddress,
      streetAddress: resource.streetAddress
    });
  }

  toResourceFromEntity(entity: PersonProfile): PersonProfileResource {
    return {
      id: entity.id,
      dni: entity.dni,
      fullName: entity.fullName,
      birthDate: entity.birthDate,
      age: entity.age,
      photo: entity.photo,
      phoneNumber: entity.phoneNumber,
      emailAddress: entity.emailAddress,
      streetAddress: entity.streetAddress
    } as PersonProfileResource;
  }
}
