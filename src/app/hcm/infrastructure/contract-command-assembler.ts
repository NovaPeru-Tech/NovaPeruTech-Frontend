import { ContractCommand } from '../domain/model/contract.command';
import { ContractCommandResource } from './contract-commands-response';

export class ContractCommandAssembler {
  toResourceFromEntity(command: ContractCommand): ContractCommandResource {
    return {
      startDate: command.startDate,
      endDate: command.endDate,

      typeOfContract: command.typeOfContract,
      staffRole: command.staffRole,
      workShift: command.workShift
    } as ContractCommandResource;
  }
}
