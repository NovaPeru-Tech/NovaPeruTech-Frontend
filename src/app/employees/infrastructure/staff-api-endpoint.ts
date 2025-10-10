import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {Staff} from '../domain/model/staff.entity';
import {StaffResource, StaffResponse} from './staff-response';
import {StaffAssembler} from './staff-assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const  employeeEndPointUrl=`${environment.platformProviderApiBaseUrl}${environment.platformProviderEmployeeEndPoint}`
export class StaffApiEndpoint extends BaseApiEndpoint<Staff, StaffResource,StaffResponse,StaffAssembler>{
  constructor(http:HttpClient) {
    super(http,employeeEndPointUrl ,new StaffAssembler());
  }
}
