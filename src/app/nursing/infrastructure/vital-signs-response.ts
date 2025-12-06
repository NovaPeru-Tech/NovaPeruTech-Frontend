import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

export interface VitalSignResource extends BaseResource{
  id: number;
  residentId: number;
  measurementId: number;
  severityLevel: string;
}

export interface VitalSignsResponse extends BaseResponse {
  vitalSign: VitalSignResource[];
}
