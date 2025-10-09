import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Residents } from '../domain/model/residents.entity';
import { ResidentResource, ResidentResponse } from './resident-response';
import { ResidentAssembler } from './resident-assembler';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

const ResidentEndPoint = `${environment.platformProviderApiBaseUrl}${environment.platformProviderResidentPath}`;

/**
 * API endpoint handler for Resident operations.
 * Extends BaseApiEndpoint to manage HTTP requests and data transformation.
 */
export class ResidentApiEndpoint extends BaseApiEndpoint<Residents, ResidentResource, ResidentResponse, ResidentAssembler> {

  /**
   * Initializes the Resident API endpoint with its base URL and assembler.
   * @param http - Angular HttpClient used for API requests.
   */
  constructor(http: HttpClient) {
    super(http, ResidentEndPoint, new ResidentAssembler());
  }
}
