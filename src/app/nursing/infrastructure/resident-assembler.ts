import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { ResidentsResource, ResidentsResponse } from './residents-response';
import { Resident } from '../domain/model/resident.entity';

/**
 * Handles the transformation between Resident entities and API resources/responses.
 */
export class ResidentAssembler implements BaseAssembler<Resident, ResidentsResource, ResidentsResponse> {

  /**
   * Converts a ResidentsResponse to a list of Resident entities.
   * @param response - API response containing resident data.
   * @returns List of Resident entities.
   */
  toEntitiesFromResponse(response: ResidentsResponse): Resident[] {
    return response.resident.map(resident => this.toEntityFromResource(resident));
  }

  /**
   * Converts a ResidentResource into a Resident entity.
   * @param resource - Resource object from API.
   * @returns Resident entity.
   */
  toEntityFromResource(resource: ResidentsResource): Resident {
    return new Resident({
      id: resource.id,
      state: resource.state,
      name: resource.name,
      lastname: resource.lastname,
      dni: resource.dni,
      birthDate: new Date(resource.birthDate),
      image: resource.image,

      room: resource.room,

      phoneNumber: resource.phoneNumber,
      email: resource.email,

      bloodType: resource.bloodType,
      allergies: resource.allergies,
      chronicDiseases: resource.chronicDiseases,
      currentMedications: resource.currentMedications,
      specialDiet: resource.specialDiet,

      mobilityLevel: resource.mobilityLevel,
      dependencyLevel: resource.dependencyLevel,
      needsBathingAssistance: resource.needsBathingAssistance,
      needsFeedingAssistance: resource.needsFeedingAssistance,
      needsDressingAssistance: resource.needsDressingAssistance,

      emergencyContactName: resource.emergencyContactName,
      emergencyPhone: resource.emergencyPhone,
      contactRelation: resource.contactRelation,
      secondaryContact: resource.secondaryContact,
      secondaryPhone: resource.secondaryPhone,

      admissionDate: new Date(resource.admissionDate),
      attendingPhysician: resource.attendingPhysician,
      medicalInsurance: resource.medicalInsurance,
      socialSecurityNumber: resource.socialSecurityNumber,
      legalGuardian: resource.legalGuardian,
      guardianPhone: resource.guardianPhone,
    });
  }

  /**
   * Converts a Resident entity into a ResidentResource for API use.
   * @param entity - Resident entity.
   * @returns Resident resource object.
   */
  toResourceFromEntity(entity: Resident): ResidentsResource {
    return {
      // Basic Information
      id: entity.id,
      state: entity.state,
      name: entity.name,
      lastname: entity.lastname,
      dni: entity.dni,
      birthDate: entity.birthDate.toISOString(),
      phoneNumber: entity.phoneNumber,
      email: entity.email,
      bloodType: entity.bloodType,
      room: entity.room,
      image: entity.image,

      allergies: entity.allergies,
      chronicDiseases: entity.chronicDiseases,
      currentMedications: entity.currentMedications,
      specialDiet: entity.specialDiet,

      mobilityLevel: entity.mobilityLevel,
      dependencyLevel: entity.dependencyLevel,
      needsBathingAssistance: entity.needsBathingAssistance,
      needsFeedingAssistance: entity.needsFeedingAssistance,
      needsDressingAssistance: entity.needsDressingAssistance,

      // Emergency Contacts
      emergencyContactName: entity.emergencyContactName,
      emergencyPhone: entity.emergencyPhone,
      contactRelation: entity.contactRelation,
      secondaryContact: entity.secondaryContact,
      secondaryPhone: entity.secondaryPhone,

      // Administrative Info
      admissionDate: entity.admissionDate.toISOString(),
      attendingPhysician: entity.attendingPhysician,
      medicalInsurance: entity.medicalInsurance,
      socialSecurityNumber: entity.socialSecurityNumber,

      // Legal Info
      legalGuardian: entity.legalGuardian,
      guardianPhone: entity.guardianPhone,
    } as ResidentsResource;
  }
}
