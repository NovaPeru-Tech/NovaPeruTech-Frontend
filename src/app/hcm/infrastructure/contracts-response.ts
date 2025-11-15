import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface ContractResource extends BaseResource {
  id: number;
  staffMemberId: number;

  startDate: Date;
  endDate: Date;

  typeOfContract: string;
  staffRole: string;
  workShift: string;
  status: string;
}

export interface ContractsResponse extends BaseResponse {
  contract: ContractResource[];
}
