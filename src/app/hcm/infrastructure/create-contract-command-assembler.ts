import { CreateContractCommand } from '../domain/model/create-contract.command';
import { ContractCommandResource } from './create-contract-commands-response';

export class CreateContractCommandAssembler {
  toResourceFromEntity(command: CreateContractCommand): ContractCommandResource {
    return {
      startDate: command.startDate,
      endDate: command.endDate,

      typeOfContract: command.typeOfContract,
      staffRole: command.staffRole,
      workShift: command.workShift
    } as ContractCommandResource;
  }
}
