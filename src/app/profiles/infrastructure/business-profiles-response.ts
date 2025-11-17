import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface BusinessProfileResource extends BaseResource {
  id: number;
  businessName: string;
  ruc: string;
  emailAddress: string;
  street: string;
  number: string;
  city: string;
  postalCode: string;
  country: string;
  photo: string;
  phoneNumber: string;
}

export interface BusinessProfilesResponse extends BaseResponse {
  businessProfiles: BusinessProfileResource[];
}
