import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {NursingHome} from '../domain/model/nursing-home.entity';
import {NursingHomeResource, NursingHomeResponse} from './nursing-home-response';
import {NursingHomeAssembler} from './nursing-home-assembler';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
const nursingHomesEndPointUrl=`${environment.platformProviderApiBaseUrl}${environment.platformProviderRegisterNursingHomeEndPoint}`

/*
* @purpose: Class to handle API interactions for Nursing Homes
* @description: This class extends the BaseApiEndpoint to provide specific implementations for creating, updating, and retrieving nursing home data from the designated API endpoint.
* */

export class NursingHomeApiEndpoint  extends  BaseApiEndpoint<NursingHome,NursingHomeResource, NursingHomeResponse,NursingHomeAssembler>{
  constructor( http:HttpClient) {
    super( http,nursingHomesEndPointUrl,new NursingHomeAssembler());
  }
}
