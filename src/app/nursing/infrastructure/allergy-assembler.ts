import { Allergy } from '../domain/model/allergy.entity';
import { AllergiesResponse, AllergyResource } from './allergies-response';

export class AllergyAssembler {
  toEntitiesFromResponse(response: AllergiesResponse): Allergy[] {
    return response.allergy.map(allergy => this.toEntityFromResource(allergy));
  }

  toEntityFromResource(resource: AllergyResource): Allergy {
    return new Allergy({
      id: resource.id,
      residentId: resource.residentId,
      allergenName: resource.allergenName,
      reaction: resource.reaction,
      severityLevel: resource.severityLevel,
      typeOfAllergy: resource.typeOfAllergy
    });
  }

  toResourceFromEntity(entity: Allergy): AllergyResource {
    return {
      id: entity.id,
      residentId: entity.residentId,
      allergenName: entity.allergenName,
      reaction: entity.reaction,
      severityLevel: entity.severityLevel,
      typeOfAllergy: entity.typeOfAllergy
    } as AllergyResource;
  }
}
