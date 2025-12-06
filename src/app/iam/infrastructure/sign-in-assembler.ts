import {SignInResource, SignInResponse} from './sign-in-response';
import {SignInCommand} from '../domain/model/sign-in.command';
import {SignInRequest} from './sign-in.request';

/**
 * Assembler for converting between sign-in domain models and API request/response models.
 */
export class SignInAssembler {
  /**
   * Converts a sign-in response from the API to a sign-in resource.
   * @param response - The API response.
   * @returns The sign-in resource.
   */
  toResourceFromResponse(response: SignInResponse): SignInResource {
    return {
      id: response.id,
      username: response.username,
      roles: response.roles,
      token: response.token
    } as SignInResource;
  }

  /**
   * Converts a sign-in command to a sign-in request for the API.
   * @param command - The domain command.
   * @returns The API request.
   */
  toRequestFromCommand(command: SignInCommand) {
    return {
      username: command.username,
      password: command.password
    } as SignInRequest;
  }
}
