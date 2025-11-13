import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { PersonProfile } from '../domain/model/person-profile.entity';
import { PersonProfileResource, PersonProfilesResponse } from './person-profiles-response';
import { PersonProfileAssembler } from './person-profile-assembler';
import { HttpClient } from '@angular/common/http';

const personProfilesEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderPersonProfilesEndpointPath}`

export class PersonProfilesApiEndpoint extends BaseApiEndpoint<PersonProfile, PersonProfileResource, PersonProfilesResponse, PersonProfileAssembler> {
  constructor(http: HttpClient) {
    super(http, personProfilesEndpointUrl, new PersonProfileAssembler());
  }
}
