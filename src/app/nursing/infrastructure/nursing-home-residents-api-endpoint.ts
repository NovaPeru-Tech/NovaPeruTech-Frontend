import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Resident } from '../domain/model/resident.entity';
import { ResidentAssembler } from './resident-assembler';
import { environment } from '../../../environments/environment';
import { ResidentsResource } from './residents-response';
import { CreateResidentCommand } from '../domain/commands/create-resident-command';

const nursingHomeResidentsEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderNursingHomeResidentsEndpointPath}`;
const residentsEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderResidentsEndpointPath}`

export class NursingHomeResidentsApiEndpoint {
  private readonly assembler = new ResidentAssembler();

  constructor(private http: HttpClient) {}

  /** GET: /api/v1/nursing-homes/{nursingHomeId}/residents */
  getAll(nursingHomeId: number): Observable<Resident[]> {
    const url = nursingHomeResidentsEndpointUrl.replace('{nursingHomeId}', nursingHomeId.toString());
    return this.http.get<ResidentsResource[]>(encodeURI(url)).pipe(
      map(list => list.map(r => this.assembler.toEntityFromResource(r)))
    );
  }

  /** POST: /api/v1/nursing-homes/{nursingHomeId}/residents */
  create(nursingHomeId: number, command: CreateResidentCommand): Observable<Resident> {
    const url = nursingHomeResidentsEndpointUrl.replace('{nursingHomeId}', nursingHomeId.toString());
    return this.http.post<ResidentsResource>(encodeURI(url), command).pipe(
      map(r => this.assembler.toEntityFromResource(r))
    );
  }

  /** PUT: /api/v1/residents/{residentId} */
  update(residentId: number, command: CreateResidentCommand): Observable<Resident> {
    const url = residentsEndpointUrl + `/${residentId}`
    return this.http.put<Resident>(encodeURI(url), command).pipe(
      map(r => this.assembler.toEntityFromResource(r))
    )
  }

  /** GET: /api/v1/nursing-homes/{nursingHomeId}/residents?state=active */
  getByActiveState(nursingHomeId: number): Observable<Resident[]> {
    const url = nursingHomeResidentsEndpointUrl.replace('{nursingHomeId}', nursingHomeId.toString()) + '?state=active';
    return this.http.get<ResidentsResource[]>(encodeURI(url)).pipe(
      map(list => list.map(r => this.assembler.toEntityFromResource(r)))
    );
  }
}
