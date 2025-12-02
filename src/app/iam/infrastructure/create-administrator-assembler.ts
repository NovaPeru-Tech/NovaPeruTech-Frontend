import {CreateAdministratorRequest} from './create-administrator-request';
import {CreateAdministratorCommand} from '../domain/model/create-administrator.command';
import {AdministratorResource, AdministratorsResponse} from './create-administrator-response';

export class CreateAdministratorAssembler {
  toResourceFromResponse(response: AdministratorsResponse): AdministratorResource {
    return {
      id: response.id,
      username: response.username
    } as AdministratorResource;
  }

  toRequestFromCommand(command: CreateAdministratorCommand): CreateAdministratorRequest {
    return {
      username: command.username,
      password: command.password
    } as CreateAdministratorRequest;
  }
}
