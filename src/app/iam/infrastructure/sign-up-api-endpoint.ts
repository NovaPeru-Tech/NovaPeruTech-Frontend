import {environment} from '../../../environments/environment';
import {ErrorHandlingEnabledBaseType} from '../../shared/infrastructure/error-handling-enabled-base-type';
import {HttpClient} from '@angular/common/http';
import {SignUpAssembler} from './sign-up-assembler';
import {SignUpCommand} from '../domain/model/sign-up.command';
import {catchError, map, Observable} from 'rxjs';
import {SignUpResource} from './sign-up-response';

const signUpApiEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderSignUpEndpointPath}`;

/**
 * API endpoint for handling user sign-up operations.
 */
export class SignUpApiEndpoint extends ErrorHandlingEnabledBaseType {
  /**
   * Creates a new SignUpApiEndpoint instance.
   * @param http - The HTTP client for making requests.
   * @param assembler - The assembler for converting between domain and API models.
   */
  constructor(private http: HttpClient, private assembler: SignUpAssembler) {
    super();
  }

  /**
   * Signs up a new user using the provided sign-up command.
   * @param signUpCommand - The command containing sign-up credentials.
   * @returns An observable of the sign-up resource.
   */
  signUp(signUpCommand: SignUpCommand): Observable<SignUpResource> {
    const signUpRequest = this.assembler.toRequestFromCommand(signUpCommand);
    return this.http.post<SignUpResource>(signUpApiEndpointUrl, signUpRequest).pipe(
      map(response => this.assembler.toResourceFromResponse(response)),
      catchError(this.handleError('Failed to sign-up'))
    );
  }
}
