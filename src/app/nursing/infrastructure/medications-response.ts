import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface MedicationResource extends BaseResource {
  id: number;
  residentId: number;
  name: string;
  description: string;
  amount: number;
  expirationDate: Date;
  drugPresentation: string;
  dosage: string;
}

export interface MedicationsResponse extends BaseResponse {
  medication: MedicationResource[];
}
