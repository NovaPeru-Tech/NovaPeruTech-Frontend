import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { ResidentsResource, ResidentsResponse } from './residents-response';
import { Resident } from '../domain/model/resident.entity';

/**
 * Handles the transformation between Resident entities and API resources/responses.
 */
export class ResidentAssembler implements BaseAssembler<Resident, ResidentsResource, ResidentsResponse> {
  /**
   * Converts a ResidentsResponse to a list of Resident entities.
   * @param response - API response containing resident data.
   * @returns List of Resident entities.
   */
  toEntitiesFromResponse(response: ResidentsResponse): Resident[] {
    return response.resident.map(resident => this.toEntityFromResource(resident));
  }

  /**
   * Converts a ResidentResource into a Resident entity.
   * @param resource - Resource object from API.
   * @returns Resident entity.
   */
  toEntityFromResource(resource: ResidentsResource): Resident {
    return new Resident({
      id: resource.id,
      personProfileId: resource.personProfileId,

      legalRepresentativeFirstName: resource.legalRepresentativeFirstName,
      legalRepresentativeLastName: resource.legalRepresentativeLastName,
      legalRepresentativePhoneNumber: resource.legalRepresentativePhoneNumber,

      emergencyContactFirstName: resource.emergencyContactFirstName,
      emergencyContactLastName: resource.emergencyContactLastName,
      emergencyContactPhoneNumber: resource.emergencyContactPhoneNumber
    });
  }

  /**
   * Converts a Resident entity into a ResidentResource for API use.
   * @param entity - Resident entity.
   * @returns Resident resource object.
   */
  toResourceFromEntity(entity: Resident): ResidentsResource {
    return {
      id: entity.id,
      personProfileId: entity.personProfileId,

      legalRepresentativeFirstName: entity.legalRepresentativeFirstName,
      legalRepresentativeLastName: entity.legalRepresentativeLastName,
      legalRepresentativePhoneNumber: entity.legalRepresentativePhoneNumber,

      emergencyContactFirstName: entity.emergencyContactFirstName,
      emergencyContactLastName: entity.emergencyContactLastName,
      emergencyContactPhoneNumber: entity.emergencyContactPhoneNumber
    } as ResidentsResource;
  }
}
