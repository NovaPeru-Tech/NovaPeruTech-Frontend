import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Resident detailed information including legal representative and emergency contact data.
 */
export interface ResidentsResource extends BaseResource {
  id: number; // Unique resident ID
  personProfileId: number; // Person profile ID

  legalRepresentativeFirstName: string; // Legal representative first name
  legalRepresentativeLastName: string; // Legal representative last name
  legalRepresentativePhoneNumber: string; // Legal representative phone number

  emergencyContactFirstName: string; // Emergency contact first name
  emergencyContactLastName: string; // Emergency contact last name
  emergencyContactPhoneNumber: string; // Emergency contact phone number
}

/**
 * API response containing a list of residents.
 */
export interface ResidentsResponse extends BaseResponse {
  resident: ResidentsResource[]; // Resident list
}
