import {environment} from '../../../environments/environment';
import {ErrorHandlingEnabledBaseType} from '../../shared/infrastructure/error-handling-enabled-base-type';
import {HttpClient} from '@angular/common/http';
import {SignInAssembler} from './sign-in-assembler';
import {SignInCommand} from '../domain/model/sign-in.command';
import {catchError, map, Observable} from 'rxjs';
import {SignInResource, SignInResponse} from './sign-in-response';

const signInApiEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderSignInEndpointPath}`;

/**
 * API endpoint for handling user sign-in operations.
 */
export class SignInApiEndpoint extends ErrorHandlingEnabledBaseType {
  /**
   * Creates a new SignInApiEndpoint instance.
   * @param http - The HTTP client for making requests.
   * @param assembler - The assembler for converting between domain and API models.
   */
  constructor(private http: HttpClient, private assembler: SignInAssembler) {
    super();
  }

  /**
   * Signs in a user using the provided sign-in command.
   * @param signInCommand - The command containing sign-in credentials.
   * @returns An observable of the sign-in resource.
   */
  signIn(signInCommand: SignInCommand): Observable<SignInResource> {
    const signInRequest = this.assembler.toRequestFromCommand(signInCommand);
    return this.http.post<SignInResponse>(signInApiEndpointUrl, signInRequest).pipe(
      map(response => this.assembler.toResourceFromResponse(response)),
      catchError(this.handleError('Failed to sign-in'))
    )
  }
}
