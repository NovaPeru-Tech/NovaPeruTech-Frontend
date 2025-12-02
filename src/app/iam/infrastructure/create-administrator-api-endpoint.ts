import {environment} from '../../../environments/environment';
import {ErrorHandlingEnabledBaseType} from '../../shared/infrastructure/error-handling-enabled-base-type';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import {CreateAdministratorAssembler} from './create-administrator-assembler';
import {CreateAdministratorCommand} from '../domain/model/create-administrator.command';
import {AdministratorResource} from './create-administrator-response';

const administratorsApiEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderAdministratorsEndpointPath}`;

export class CreateAdministratorApiEndpoint extends ErrorHandlingEnabledBaseType {
  constructor(private http: HttpClient, private assembler: CreateAdministratorAssembler) {
    super();
  }

  createAdministrator(createAdministratorCommand: CreateAdministratorCommand): Observable<AdministratorResource> {
    const administratorRequest = this.assembler.toRequestFromCommand(createAdministratorCommand);
    return this.http.post<AdministratorResource>(administratorsApiEndpointUrl, administratorRequest).pipe(
      map(response => this.assembler.toResourceFromResponse(response)),
      catchError(this.handleError('Failed to create administrator'))
    );
  }
}
