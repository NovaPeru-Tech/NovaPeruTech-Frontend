import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Resident detailed information including personal, medical, and contact data.
 */
export interface ResidentsResource extends BaseResource {
  id: number; // Unique resident ID
  state: string; // Current status
  name: string; // First name
  lastname: string; // Last name
  dni: string; // National ID
  birthDate: string; // Date of birth
  phoneNumber: string; // Phone number
  email: string; // Email address
  bloodType: string; // Blood type
  room: string; // Assigned room
  image: string; // Profile image

  allergies?: string; // Known allergies
  chronicDiseases: string[]; // Chronic conditions
  currentMedications?: string; // Current medication
  specialDiet?: string; // Special diet

  mobilityLevel: string; // Mobility level
  dependencyLevel: string; // Dependency level
  needsBathingAssistance: boolean; // Needs help bathing
  needsFeedingAssistance: boolean; // Needs help eating
  needsDressingAssistance: boolean; // Needs help dressing

  emergencyContactName: string; // Main emergency contact
  emergencyPhone: string; // Emergency phone
  contactRelation: string; // Relation to contact
  secondaryContact?: string; // Secondary contact
  secondaryPhone?: string; // Secondary phone

  admissionDate: string; // Admission date
  attendingPhysician: string; // Assigned physician
  medicalInsurance?: string; // Medical insurance
  socialSecurityNumber?: string; // Social security number

  legalGuardian?: string; // Legal guardian
  guardianPhone?: string; // Guardian phone
}

/**
 * API response containing a list of residents.
 */
export interface ResidentsResponse extends BaseResponse {
  resident: ResidentsResource[]; // Resident list
}
