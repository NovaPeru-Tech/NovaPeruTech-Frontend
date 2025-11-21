import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { Resident } from '../domain/model/resident.entity';
import { ResidentAssembler } from './resident-assembler';
import { environment } from '../../../environments/environment';
import { ResidentsResource } from './residents-response';
import { ResidentCommand } from '../domain/model/resident.command';
import { ErrorHandlingEnabledBaseType } from '../../shared/infrastructure/error-handling-enabled-base-type';
import { ResidentCommandAssembler } from './nursing-home-resident-assembler';

const nursingHomeResidentsEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderNursingHomeResidentsEndpointPath}`;
const residentsEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderResidentsEndpointPath}`

export class NursingHomeResidentsApiEndpoint extends ErrorHandlingEnabledBaseType{
  private readonly residentAssembler = new ResidentAssembler();
  private readonly residentCommandAssembler = new ResidentCommandAssembler();

  constructor(private http: HttpClient) {
    super();
  }

  /** GET: /api/v1/nursing-homes/{nursingHomeId}/residents */
  getAll(nursingHomeId: number): Observable<Resident[]> {
    const url = nursingHomeResidentsEndpointUrl.replace('{nursingHomeId}', nursingHomeId.toString());
    return this.http.get<ResidentsResource[]>(url).pipe(
      map(response => {
        if(Array.isArray(response)) {
          return response.map(resource => this.residentAssembler.toEntityFromResource(resource));
        }
        return this.residentAssembler.toEntitiesFromResponse(response);
      }),
      catchError(this.handleError('Failed to fetch nursing home residents'))
    );
  }

  /** POST: /api/v1/nursing-homes/{nursingHomeId}/residents */
  create(nursingHomeId: number, command: ResidentCommand): Observable<Resident> {
    const resource = this.residentCommandAssembler.toResourceFromEntity(command);
    const url = nursingHomeResidentsEndpointUrl.replace('{nursingHomeId}', nursingHomeId.toString());
    return this.http.post<Resident>(url, resource).pipe(
      map(createdResident => this.residentAssembler.toEntityFromResource(createdResident)),
      catchError(this.handleError('Failed to create nursing home resident'))
    );
  }

  /** PUT: /api/v1/residents/{residentId} */
  update(residentId: number, command: ResidentCommand): Observable<Resident> {
    const resource = this.residentCommandAssembler.toResourceFromEntity(command);
    const url = residentsEndpointUrl + `/${residentId}`
    return this.http.put<Resident>(url, resource).pipe(
      map(updatedResident => this.residentAssembler.toEntityFromResource(updatedResident)),
      catchError(this.handleError('Failed to update nursing home resident'))
    );
  }

  /** GET: /api/v1/nursing-homes/{nursingHomeId}/residents?state=active */
  getByActiveState(nursingHomeId: number): Observable<Resident[]> {
    const url = nursingHomeResidentsEndpointUrl.replace('{nursingHomeId}', nursingHomeId.toString()) + '?state=active';
    return this.http.get<ResidentsResource[]>(url).pipe(
      map(response => {
        if(Array.isArray(response)) {
          return response.map(resource => this.residentAssembler.toEntityFromResource(resource));
        }
        return this.residentAssembler.toEntitiesFromResponse(response);
      }),
      catchError(this.handleError('Failed to fetch active nursing home residents'))
    );
  }
}
