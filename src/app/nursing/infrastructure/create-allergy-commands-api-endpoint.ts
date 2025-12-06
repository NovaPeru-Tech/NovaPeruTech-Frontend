import { environment } from '../../../environments/environment';
import { ErrorHandlingEnabledBaseType } from '../../shared/infrastructure/error-handling-enabled-base-type';
import { AllergyAssembler } from './allergy-assembler';
import { CreateAllergyCommandAssembler } from './create-allergy-command-assembler';
import { HttpClient } from '@angular/common/http';
import { CreateAllergyCommand } from '../domain/model/create-allergy.command';
import { catchError, map, Observable } from 'rxjs';
import { Allergy } from '../domain/model/allergy.entity';

const residentAllergiesEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderResidentAllergiesEndpointPath}`

export class CreateAllergyCommandsApiEndpoint extends ErrorHandlingEnabledBaseType {
  private readonly allergyAssembler = new AllergyAssembler();
  private readonly createAllergyCommandAssembler = new CreateAllergyCommandAssembler();

  constructor(private http: HttpClient) {
    super();
  }

  create(residentId: number, createAllergyCommand: CreateAllergyCommand): Observable<Allergy> {
    const resource = this.createAllergyCommandAssembler.toResourceFromEntity(createAllergyCommand);
    const url = residentAllergiesEndpointUrl.replace('{residentId}', residentId.toString());
    return this.http.post<Allergy>(url, resource).pipe(
      map(createdAllergy => this.allergyAssembler.toEntityFromResource(createdAllergy)),
      catchError(this.handleError('Failed to create allergy'))
    )
  }
}
