import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface StaffMembersResource extends BaseResource{
  id: number,
  state: string,
  name: string,
  lastname: string,
  dni: string,

  birthDate: string,

  nationality?: string,
  phoneNumber: string,
  email: string,
  image: string,
  address: string,

  contractDate: string,
  contractEndDate?: string,
  terminationDate?: string,

  post: string,
  typeOfContract: string,
  workShift: string,
  certifications: string[],
  emergencyContactName: string;
  emergencyContactPhone: string;
}

export interface StaffMembersResponse extends BaseResponse{
  staffMember:StaffMembersResource[];
}
