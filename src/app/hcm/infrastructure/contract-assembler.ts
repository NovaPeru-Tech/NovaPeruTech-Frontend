import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Contract } from '../domain/model/contract.entity';
import { ContractResource, ContractsResponse } from './contracts-response';

export class ContractAssembler implements BaseAssembler<Contract, ContractResource, ContractsResponse> {
  toEntitiesFromResponse(response: ContractsResponse): Contract[] {
    return response.contract.map(contract => this.toEntityFromResource(contract));
  }

  toEntityFromResource(resource: ContractResource): Contract {
    return new Contract({
      id: resource.id,
      staffMemberId: resource.staffMemberId,

      startDate: resource.startDate,
      endDate: resource.endDate,

      typeOfContract: resource.typeOfContract,
      staffRole: resource.staffRole,
      workShift: resource.workShift,
      status: resource.status
    });
  }

  toResourceFromEntity(entity: Contract): ContractResource {
    return {
      id: entity.id,
      staffMemberId: entity.staffMemberId,

      startDate: entity.startDate,
      endDate: entity.endDate,

      typeOfContract: entity.typeOfContract,
      staffRole: entity.staffRole,
      workShift: entity.workShift,
      status: entity.status
    } as ContractResource;
  }
}
