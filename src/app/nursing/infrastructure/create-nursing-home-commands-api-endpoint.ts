import { environment } from '../../../environments/environment';
import { ErrorHandlingEnabledBaseType } from '../../shared/infrastructure/error-handling-enabled-base-type';
import { CreateNursingHomeCommandAssembler } from './create-nursing-home-command-assembler';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { NursingHome } from '../domain/model/nursing-home.entity';
import { CreateNursingHomeCommand } from '../domain/model/create-nursing-home.command';
import { NursingHomeAssembler } from './nursing-home-assembler';

const administratorNursingHomesEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderAdministratorNursingHomesEndpointPath}`

export class CreateNursingHomeCommandsApiEndpoint extends ErrorHandlingEnabledBaseType {
  private readonly createNursingHomeCommandAssembler = new CreateNursingHomeCommandAssembler();
  private readonly nursingHomeAssembler = new NursingHomeAssembler();

  constructor(private http: HttpClient) {
    super();
  }

  /** POST: /api/v1/administrators/{administratorId}/nursing-homes */
  create(administratorId: number, createNursingHomeCommand: CreateNursingHomeCommand): Observable<NursingHome> {
    const resource = this.createNursingHomeCommandAssembler.toResourceFromEntity(createNursingHomeCommand);
    const url = administratorNursingHomesEndpointUrl.replace('{administratorId}', administratorId.toString());
    return this.http.post<NursingHome>(url, resource).pipe(
      map(createdNursingHome => this.nursingHomeAssembler.toEntityFromResource(createdNursingHome)),
      catchError(this.handleError('Failed to create nursing home'))
    );
  }

  /** GET: /api/v1/administrators/{administratorId}/nursing-homes */
  getByAdministratorId(administratorId: number): Observable<NursingHome> {
    const url = administratorNursingHomesEndpointUrl.replace('{administratorId}', administratorId.toString());
    return this.http.get<NursingHome>(url).pipe(
      map(nursingHome => this.nursingHomeAssembler.toEntityFromResource(nursingHome)),
      catchError(this.handleError(`Failed to fetch nursing home for administrator with id ${administratorId}`))
    );
  }
}
