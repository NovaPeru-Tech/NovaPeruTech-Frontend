import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {StaffMember} from '../domain/model/staff-member.entity';
import {StaffMembersResource, StaffMembersResponse} from './staff-members-response';
import {StaffAssembler} from './staff-assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const  employeeEndPointUrl=`${environment.platformProviderApiBaseUrl}${environment.platformProviderEmployeeEndPoint}`
export class StaffApiEndpoint extends BaseApiEndpoint<StaffMember, StaffMembersResource,StaffMembersResponse,StaffAssembler>{
  constructor(http:HttpClient) {
    super(http,employeeEndPointUrl ,new StaffAssembler());
  }
}
