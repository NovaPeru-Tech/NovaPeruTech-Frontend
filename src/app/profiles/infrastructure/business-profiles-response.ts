import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface BusinessProfileResource extends BaseResource {
  id: number;
  businessName: string;
  ruc: string;
  photo: string;
  phoneNumber: string;
  emailAddress: string;
  streetAddress: string;
}

export interface BusinessProfilesResponse extends BaseResponse {
  businessProfiles: BusinessProfileResource[];
}
