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
      firstName: resource.firstName,
      lastName: resource.lastName,
      birthDate: resource.birthDate,
      emailAddress: resource.emailAddress,
      street: resource.street,
      number: resource.number,
      city: resource.city,
      postalCode: resource.postalCode,
      country: resource.country,
      photo:resource.photo,
      phoneNumber: resource.phoneNumber
    });
  }

  toResourceFromEntity(entity: PersonProfile): PersonProfileResource {
    return {
      id: entity.id,
      dni: entity.dni,
      firstName: entity.firstName,
      lastName: entity.lastName,
      birthDate: entity.birthDate,
      emailAddress: entity.emailAddress,
      street: entity.street,
      number: entity.number,
      city: entity.city,
      postalCode: entity.postalCode,
      country: entity.country,
      photo: entity.photo,
      phoneNumber: entity.phoneNumber
    } as PersonProfileResource;
  }
}
