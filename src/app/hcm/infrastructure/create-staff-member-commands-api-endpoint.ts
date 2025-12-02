import { environment } from '../../../environments/environment';
import { StaffMemberAssembler } from './staff-member-assembler';
import { HttpClient } from '@angular/common/http';
import { StaffMember } from '../domain/model/staff-member.entity';
import { catchError, map, Observable } from 'rxjs';
import { StaffResource } from './staff-response';
import { CreateStaffMemberCommand } from '../domain/model/create-staff-member.command';
import { CreateStaffMemberCommandAssembler } from './create-staff-member-command-assembler';
import { ErrorHandlingEnabledBaseType } from '../../shared/infrastructure/error-handling-enabled-base-type';

const nursingHomeStaffEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderNursingHomeStaffEndpointPath}`;
const staffEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderStaffEndpointPath}`;

export class CreateStaffMemberCommandsApiEndpoint extends ErrorHandlingEnabledBaseType {
  private readonly staffMemberAssembler = new StaffMemberAssembler();
  private readonly staffMemberCommandAssembler = new CreateStaffMemberCommandAssembler();

  constructor(private http: HttpClient) {
    super();
  }

  /** GET: /api/v1/nursing-homes/{nursingHomeId}/staff */
  getAll(nursingHomeId: number): Observable<StaffMember[]> {
    const url = nursingHomeStaffEndpointUrl.replace('{nursingHomeId}', nursingHomeId.toString());
    return this.http.get<StaffResource[]>(url).pipe(
      map(response => {
        if(Array.isArray(response)) {
          return response.map(resource => this.staffMemberAssembler.toEntityFromResource(resource));
        }
        return this.staffMemberAssembler.toEntitiesFromResponse(response);
      }),
      catchError(this.handleError('Failed to fetch staff'))
    );
  }

  /** POST: /api/v1/nursing-homes/{nursingHomeId}/staff */
  create(nursingHomeId: number, staffMemberCommand: CreateStaffMemberCommand): Observable<StaffMember> {
    const resource = this.staffMemberCommandAssembler.toResourceFromEntity(staffMemberCommand);
    const url = nursingHomeStaffEndpointUrl.replace('{nursingHomeId}', nursingHomeId.toString());
    return this.http.post<StaffMember>(url, resource).pipe(
      map(createdStaffMember  => this.staffMemberAssembler.toEntityFromResource(createdStaffMember)),
      catchError(this.handleError('Failed to create staff member'))
    );
  }

  /** PUT: /api/v1/staff/{staffMemberId} */
  update(staffMemberId: number, staffMemberCommand: CreateStaffMemberCommand): Observable<StaffMember> {
    const resource = this.staffMemberCommandAssembler.toResourceFromEntity(staffMemberCommand);
    const url = staffEndpointUrl + `/${staffMemberId}`
    return this.http.put<StaffMember>(url, resource).pipe(
      map(updatedStaffMember => this.staffMemberAssembler.toEntityFromResource(updatedStaffMember)),
      catchError(this.handleError('Failed to update staff member'))
    )
  }
}
