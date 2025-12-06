import {environment} from '../../../environments/environment';
import {ErrorHandlingEnabledBaseType} from '../../shared/infrastructure/error-handling-enabled-base-type';
import {VitalSignAssembler} from './vital-sign-assembler';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import {VitalSign} from '../domain/model/vital-sign.entity';
import {VitalSignResource} from './vital-signs-response';

const residentVitalSignsEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderResidentVitalSigsEndpointPath}`

export class VitalSignsApiEndpoint extends ErrorHandlingEnabledBaseType {
  private readonly vitalSignAssembler = new VitalSignAssembler();

  constructor(private http: HttpClient) {
    super();
  }

  getAll(residentId: number): Observable<VitalSign[]> {
    const url = residentVitalSignsEndpointUrl.replace('{residentId}', residentId.toString());
    return this.http.get<VitalSignResource[]>(url).pipe(
      map(response => {
        if(Array.isArray(response)) {
          return response.map(resource => this.vitalSignAssembler.toEntityFromResource(resource));
        }
        return this.vitalSignAssembler.toEntitiesFromResponse(response);
      }),
      catchError(this.handleError('Failed to fetch vital signs'))
    )
  }
}
