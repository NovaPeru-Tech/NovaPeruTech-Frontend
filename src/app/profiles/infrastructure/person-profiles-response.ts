import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface PersonProfileResource extends BaseResource {
  id: number;
  dni: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  age: number;
  emailAddress: string;
  street: string;
  number: string;
  city: string;
  postalCode: string;
  country: string;
  photo: string;
  phoneNumber: string;
}

export interface PersonProfilesResponse extends BaseResponse {
  personProfiles: PersonProfileResource[];
}
