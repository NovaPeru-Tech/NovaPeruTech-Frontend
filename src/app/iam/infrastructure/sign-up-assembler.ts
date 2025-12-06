import {SignUpResource, SignUpResponse} from './sign-up-response';
import {SignUpCommand} from '../domain/model/sign-up.command';
import {SignUpRequest} from './sign-up.request';

/**
 * Assembler for converting between sign-up domain models and API request/response models.
 */
export class SignUpAssembler {
  /**
   * Converts a sign-up response from the API to a sign-up resource.
   * @param response - The API response.
   * @returns The sign-up resource.
   */
  toResourceFromResponse(response: SignUpResponse): SignUpResource {
    return {
      id: response.id,
      username: response.username
    } as SignUpResource;
  }

  /**
   * Converts a sign-up command to a sign-up request for the API.
   * @param command - The domain command.
   * @returns The API request.
   */
  toRequestFromCommand(command: SignUpCommand): SignUpRequest {
    return {
      username: command.username,
      password: command.password,
      roles: command.roles
    } as SignUpRequest;
  }
}
