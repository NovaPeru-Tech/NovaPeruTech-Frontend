import { UpdateContractStatusCommand } from '../domain/model/update-contract-status.command';
import { UpdateContractStatusCommandResource } from './update-contract-status.commands-response';

export class UpdateContractStatusCommandAssembler {
  toResourceFromEntity(command: UpdateContractStatusCommand): UpdateContractStatusCommandResource {
    return {
      newStatus: command.newStatus
    } as UpdateContractStatusCommandResource;
  }
}
