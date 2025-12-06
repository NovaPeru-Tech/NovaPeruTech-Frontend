import { StaffMemberCommandResource } from './create-staff-member-commands-response';
import { CreateStaffMemberCommand } from '../domain/model/create-staff-member.command';

export class CreateStaffMemberCommandAssembler {
  toResourceFromEntity(command: CreateStaffMemberCommand): StaffMemberCommandResource {
    return {
      dni: command.dni,
      firstName: command.firstName,
      lastName: command.lastName,
      birthDate: command.birthDate,
      age: command.age,
      emailAddress: command.emailAddress,
      street: command.street,
      number: command.number,
      city: command.city,
      postalCode: command.postalCode,
      country:  command.country,
      photo: command.photo,
      phoneNumber: command.phoneNumber,

      emergencyContactFirstName: command.emergencyContactFirstName,
      emergencyContactLastName: command.emergencyContactLastName,
      emergencyContactPhoneNumber: command.emergencyContactPhoneNumber
    } as StaffMemberCommandResource;
  }
}
