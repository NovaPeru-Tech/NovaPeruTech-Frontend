import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface PersonProfileResource extends BaseResource {
  id: number;
  fullName: string;
  dni: string;
  birthDate: Date;
  age: number;
  photo: string;
  phoneNumber: string;
  emailAddress: string;
  streetAddress: string;
}

export interface PersonProfilesResponse extends BaseResponse {
  personProfiles: PersonProfileResource[];
}
