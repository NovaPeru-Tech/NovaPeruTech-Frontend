import { CreateAllergyCommand } from '../domain/model/create-allergy.command';
import { CreateAllergyCommandResource } from './create-allergy-commands-response';

export class CreateAllergyCommandAssembler {
  toResourceFromEntity(command: CreateAllergyCommand): CreateAllergyCommandResource {
    return {
      allergenName: command.allergenName,
      reaction: command.reaction,
      severityLevel: command.severityLevel,
      typeOfAllergy: command.typeOfAllergy
    } as CreateAllergyCommandResource;
  }
}
