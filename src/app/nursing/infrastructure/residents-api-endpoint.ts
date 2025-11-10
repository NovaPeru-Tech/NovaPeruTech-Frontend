import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Resident } from '../domain/model/resident.entity';
import { ResidentsResource, ResidentsResponse } from './residents-response';
import { ResidentAssembler } from './resident-assembler';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

const residentsEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderResidentsEndpointPath}`;

/**
 * API endpoint handler for Resident operations.
 * Extends BaseApiEndpoint to manage HTTP requests and data transformation.
 */
export class ResidentsApiEndpoint extends BaseApiEndpoint<Resident, ResidentsResource, ResidentsResponse, ResidentAssembler> {
  /**
   * Initializes the Resident API endpoint with its base URL and assembler.
   * @param http - Angular HttpClient used for API requests.
   */
  constructor(http: HttpClient) {
    super(http, residentsEndpointUrl, new ResidentAssembler());
  }
}
