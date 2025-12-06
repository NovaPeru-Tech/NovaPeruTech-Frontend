import { environment } from '../../../environments/environment';
import { ErrorHandlingEnabledBaseType } from '../../shared/infrastructure/error-handling-enabled-base-type';
import { AllergyAssembler } from './allergy-assembler';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Allergy } from '../domain/model/allergy.entity';
import { AllergyResource } from './allergies-response';

const residentAllergiesEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderResidentAllergiesEndpointPath}`

export class AllergiesApiEndpoint extends ErrorHandlingEnabledBaseType {
  private readonly allergyAssembler = new AllergyAssembler();

  constructor(private http: HttpClient) {
    super();
  }

  getAll(residentId: number): Observable<Allergy[]> {
    const url = residentAllergiesEndpointUrl.replace('{residentId}', residentId.toString());
    return this.http.get<AllergyResource[]>(url).pipe(
      map(response => {
        if(Array.isArray(response)) {
          return response.map(resource => this.allergyAssembler.toEntityFromResource(resource));
        }
        return this.allergyAssembler.toEntitiesFromResponse(response);
      }),
      catchError(this.handleError('Failed to fetch allergies'))
    )
  }
}
