import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {Medication} from '../domain/medication.entity';
import {MedicationResource, MedicationResponse} from './medication-response';
import {MedicationAssembler} from './medication-assembler';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
const inventoryUrl= `${environment.platformProviderApiBaseUrl}${environment.platformProviderMedicationEndPoint}`;
export class MedicationApiEndpoint  extends BaseApiEndpoint<Medication, MedicationResource, MedicationResponse, MedicationAssembler>{
  constructor(http:HttpClient) {
    super(http,inventoryUrl,new MedicationAssembler());

  }

}
