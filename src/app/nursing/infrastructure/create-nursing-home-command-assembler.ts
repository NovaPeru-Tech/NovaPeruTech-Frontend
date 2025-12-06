import { CreateNursingHomeCommand } from '../domain/model/create-nursing-home.command';
import { CreateNursingHomeCommandResource } from './create-nursing-home-commands-response';

export class CreateNursingHomeCommandAssembler {
  toResourceFromEntity(command: CreateNursingHomeCommand): CreateNursingHomeCommandResource {
    return {
      businessName: command.businessName,
      emailAddress: command.emailAddress,
      phoneNumber: command.phoneNumber,
      street: command.street,
      number: command.number,
      city: command.city,
      postalCode: command.postalCode,
      country: command.country,
      photo: command.photo,
      ruc: command.ruc
    } as CreateNursingHomeCommandResource;
  }
}
