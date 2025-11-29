import { MedicationCommand } from '../domain/model/medication.command';
import { MedicationCommandResource } from './medication-commands-response';

export class MedicationCommandAssembler {
  toResourceFromEntity(command: MedicationCommand): MedicationCommandResource {
    return {
      name: command.name,
      description: command.description,
      amount: command.amount,
      expirationDate: command.expirationDate,
      drugPresentation: command.drugPresentation,
      dosage: command.dosage
    } as MedicationCommandResource;
  }
}
