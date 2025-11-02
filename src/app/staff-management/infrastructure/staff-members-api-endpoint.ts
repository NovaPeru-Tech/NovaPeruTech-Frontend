import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { StaffMember } from '../domain/model/staff-member.entity';
import { StaffMembersResource, StaffMembersResponse } from './staff-members-response';
import { StaffMemberAssembler } from './staff-member-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const  staffMembersEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderEmployeeEndPoint}`

export class StaffMembersApiEndpoint extends BaseApiEndpoint<StaffMember, StaffMembersResource,StaffMembersResponse,StaffMemberAssembler> {
  constructor(http: HttpClient) {
    super(http, staffMembersEndpointUrl ,new StaffMemberAssembler());
  }
}
