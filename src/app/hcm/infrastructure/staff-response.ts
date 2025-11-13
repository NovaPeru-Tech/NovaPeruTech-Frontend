import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface StaffResource extends BaseResource{
  id: number; // Unique staff member ID
  personProfileId: number; // Person profile ID

  emergencyContactFirstName: string; // Emergency contact first name
  emergencyContactLastName: string; // Emergency contact last name
  emergencyContactPhoneNumber: string; // Emergency contact phone number

  status: string;
}

export interface StaffResponse extends BaseResponse{
  staffMember: StaffResource[];
}
