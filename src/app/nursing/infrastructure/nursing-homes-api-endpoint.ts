import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { NursingHome } from '../domain/model/nursing-home.entity';
import { NursingHomeResource, NursingHomesResponse } from './nursing-homes-response';
import { NursingHomeAssembler } from './nursing-home-assembler';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

const nursingHomesEndpointUrl=`${environment.platformProviderApiBaseUrl}${environment.platformProviderNursingHomesEndpointPath}`

/*
* @purpose: Class to handle API interactions for Nursing Homes
* @description: This class extends the BaseApiEndpoint to provide specific implementations for creating, updating, and retrieving nursing home data from the designated API endpoint.
* */

export class NursingHomesApiEndpoint extends BaseApiEndpoint<NursingHome, NursingHomeResource, NursingHomesResponse, NursingHomeAssembler> {
  constructor(http: HttpClient) {
    super(http, nursingHomesEndpointUrl, new NursingHomeAssembler());
  }
}
