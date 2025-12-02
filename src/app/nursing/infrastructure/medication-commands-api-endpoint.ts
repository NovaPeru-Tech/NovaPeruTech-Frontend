import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ErrorHandlingEnabledBaseType } from '../../shared/infrastructure/error-handling-enabled-base-type';
import { MedicationAssembler } from './medication-assembler';
import { MedicationCommandAssembler } from './medication-command-assembler';
import { Medication } from '../domain/model/medication.entity';
import { MedicationResource } from './medications-response';
import { CreateMedicationCommand } from '../domain/model/create-medication.command';

const medicationCommandsEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderResidentMedicationsEndpointPath}`;

export class MedicationCommandsApiEndpoint extends ErrorHandlingEnabledBaseType{
  private readonly medicationAssembler = new MedicationAssembler();
  private readonly medicationCommandAssembler = new MedicationCommandAssembler();

  constructor(private http: HttpClient) {
    super();
  }

  /** GET: /api/v1/residents/{residentId}/medications */
  getAll(residentId: number): Observable<Medication[]> {
    const url = medicationCommandsEndpointUrl.replace('{residentId}', residentId.toString());
    return this.http.get<MedicationResource[]>(url).pipe(
      map(response => {
        if(Array.isArray(response)) {
          return response.map(resource => this.medicationAssembler.toEntityFromResource(resource));
        }
        return this.medicationAssembler.toEntitiesFromResponse(response);
      }),
      catchError(this.handleError('Failed to fetch medications'))
    );
  }

  /** POST: /api/v1/residents/{residentId}/medications */
  create(residentId: number, createMedicationCommand: CreateMedicationCommand): Observable<Medication> {
    const resource = this.medicationCommandAssembler.toResourceFromEntity(createMedicationCommand);
    const url = medicationCommandsEndpointUrl.replace('{residentId}', residentId.toString());
      return this.http.post<Medication>(url, resource).pipe(
      map(createdMedication => this.medicationAssembler.toEntityFromResource(createdMedication)),
      catchError(this.handleError('Failed to create medication'))
    );
  }
}
