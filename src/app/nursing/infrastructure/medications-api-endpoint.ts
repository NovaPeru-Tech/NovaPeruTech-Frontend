import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Medication } from '../domain/model/medication.entity';
import { MedicationResource, MedicationsResponse } from './medications-response';
import { MedicationAssembler } from './medication-assembler';
import { HttpClient } from '@angular/common/http';

const medicationsEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderMedicationsEndpointPath}`

export class MedicationsApiEndpoint extends BaseApiEndpoint<Medication, MedicationResource, MedicationsResponse, MedicationAssembler> {
  constructor(http: HttpClient) {
    super(http, medicationsEndpointUrl, new MedicationAssembler());
  }
}
