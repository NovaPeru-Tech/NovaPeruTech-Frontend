import { CreateMedicationCommand } from '../domain/model/create-medication.command';
import { MedicationCommandResource } from './medication-commands-response';

export class MedicationCommandAssembler {
  toResourceFromEntity(command: CreateMedicationCommand): MedicationCommandResource {
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
