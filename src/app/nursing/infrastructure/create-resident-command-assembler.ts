import { ResidentCommandResource } from './create-resident-commands-response';
import { CreateResidentCommand } from '../domain/model/create-resident.command';

export class CreateResidentCommandAssembler {
  toResourceFromEntity(command: CreateResidentCommand): ResidentCommandResource {
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
