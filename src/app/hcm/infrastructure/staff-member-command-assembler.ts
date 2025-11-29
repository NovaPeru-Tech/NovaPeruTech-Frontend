import { StaffMemberCommandResource } from './staff-member-commands-response';
import { StaffMemberCommand } from '../domain/model/staff-member.command';

export class StaffMemberCommandAssembler {
  toResourceFromEntity(command: StaffMemberCommand): StaffMemberCommandResource {
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
