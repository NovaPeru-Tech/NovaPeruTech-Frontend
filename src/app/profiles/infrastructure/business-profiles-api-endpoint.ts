import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { BusinessProfile } from '../domain/model/business-profile.entity';
import { BusinessProfileResource, BusinessProfilesResponse } from './business-profiles-response';
import { BusinessProfileAssembler } from './business-profile-assembler';
import { HttpClient } from '@angular/common/http';

const businessProfilesEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderBusinessProfilesEndpointPath}`

export class BusinessProfilesApiEndpoint extends BaseApiEndpoint<BusinessProfile, BusinessProfileResource, BusinessProfilesResponse, BusinessProfileAssembler> {
  constructor(http: HttpClient) {
    super(http, businessProfilesEndpointUrl, new BusinessProfileAssembler());
  }
}
