import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface AllergyResource extends BaseResource {
  id: number;
  residentId: number;
  allergenName: string;
  reaction: string;
  severityLevel: string;
  typeOfAllergy: string;
}

export interface AllergiesResponse extends BaseResponse {
  allergy: AllergyResource[];
}

