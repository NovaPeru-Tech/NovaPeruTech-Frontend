import {ResidentCommandResource} from './nursing-home-residents-response';
import {ResidentCommand} from '../domain/model/resident.command';

export class ResidentCommandAssembler {
  toEntityFromResource(resource: ResidentCommandResource): ResidentCommand {
    return new ResidentCommand({
      dni: resource.dni,
      firstName: resource.firstName,
      lastName: resource.lastName,
      birthDate: resource.birthDate,
      age: resource.age,
      emailAddress: resource.emailAddress,
      street: resource.street,
      number: resource.number,
      city: resource.city,
      postalCode: resource.postalCode,
      country: resource.country,
      photo: resource.photo,
      phoneNumber: resource.phoneNumber,

      legalRepresentativeFirstName: resource.legalRepresentativeFirstName,
      legalRepresentativeLastName: resource.legalRepresentativeLastName,
      legalRepresentativePhoneNumber: resource.legalRepresentativePhoneNumber,

      emergencyContactFirstName: resource.emergencyContactFirstName,
      emergencyContactLastName: resource.emergencyContactLastName,
      emergencyContactPhoneNumber: resource.emergencyContactPhoneNumber
    })
  }

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
