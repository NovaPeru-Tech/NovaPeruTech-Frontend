import { ResidentCommandResource } from './resident-commands-response';
import { ResidentCommand } from '../domain/model/resident.command';

export class ResidentCommandAssembler {
  toResourceFromEntity(command: ResidentCommand): ResidentCommandResource {
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

      legalRepresentativeFirstName: command.legalRepresentativeFirstName,
      legalRepresentativeLastName: command.legalRepresentativeLastName,
      legalRepresentativePhoneNumber: command.legalRepresentativePhoneNumber,

      emergencyContactFirstName: command.emergencyContactFirstName,
      emergencyContactLastName: command.emergencyContactLastName,
      emergencyContactPhoneNumber: command.emergencyContactPhoneNumber
    } as ResidentCommandResource;
  }
}
