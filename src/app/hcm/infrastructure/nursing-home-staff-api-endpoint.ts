import { environment } from '../../../environments/environment';
import { StaffMemberAssembler } from './staff-member-assembler';
import { HttpClient } from '@angular/common/http';
import { StaffMember } from '../domain/model/staff-member.entity';
import { CreateStaffMemberCommand } from '../domain/commands/create-staff-member-command';
import { map, Observable } from 'rxjs';
import { StaffResource } from './staff-response';

const nursingHomeStaffEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderNursingHomeStaffEndpointPath}`;
const staffEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderStaffEndpointPath}`;

export class NursingHomeStaffApiEndpoint {
  private readonly assembler = new StaffMemberAssembler();

  constructor(private http: HttpClient) {}

  /** GET: /api/v1/nursing-homes/{nursingHomeId}/staff */
  getAll(nursingHomeId: number): Observable<StaffMember[]> {
    const url = nursingHomeStaffEndpointUrl.replace('{nursingHomeId}', nursingHomeId.toString());
    return this.http.get<StaffResource[]>(encodeURI(url)).pipe(
      map(list => list.map(s => this.assembler.toEntityFromResource(s)))
    );
  }

  /** POST: /api/v1/nursing-homes/{nursingHomeId}/staff */
  create(nursingHomeId: number, command: CreateStaffMemberCommand): Observable<StaffMember> {
    const url = nursingHomeStaffEndpointUrl.replace('{nursingHomeId}', nursingHomeId.toString());
    return this.http.post<StaffResource>(encodeURI(url), command).pipe(
      map(s => this.assembler.toEntityFromResource(s))
    );
  }

  /** PUT: /api/v1/staff/{staffMemberId} */
  update(staffMemberId: number, command: CreateStaffMemberCommand): Observable<StaffMember> {
    const url = staffEndpointUrl + `/${staffMemberId}`
    return this.http.put<StaffMember>(encodeURI(url), command).pipe(
      map(r => this.assembler.toEntityFromResource(r))
    )
  }
}
