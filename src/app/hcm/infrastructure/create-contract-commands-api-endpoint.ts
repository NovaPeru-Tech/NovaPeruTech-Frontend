import { environment } from '../../../environments/environment';
import { ErrorHandlingEnabledBaseType } from '../../shared/infrastructure/error-handling-enabled-base-type';
import { ContractAssembler } from './contract-assembler';
import { CreateContractCommandAssembler } from './create-contract-command-assembler';
import { Contract } from '../domain/model/contract.entity';
import { catchError, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreateContractCommand } from '../domain/model/create-contract.command';

const staffMemberContractsEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderStaffMemberContractsEndpointPath}`;

export class CreateContractCommandsApiEndpoint extends ErrorHandlingEnabledBaseType {
  private readonly contractAssembler = new ContractAssembler();
  private readonly contractCommandAssembler = new CreateContractCommandAssembler();

  constructor(private http: HttpClient) {
    super();
  }

  /** GET: /api/v1/staff/{staffMemberId}/contracts */
  getAll(staffMemberId: number): Observable<Contract[]> {
    const url = staffMemberContractsEndpointUrl.replace('{staffMemberId}', staffMemberId.toString());
    return this.http.get<Contract[]>(url).pipe(
      map(response => {
        if(Array.isArray(response)) {
          return response.map(resource => this.contractAssembler.toEntityFromResource(resource));
        }
        return this.contractAssembler.toEntitiesFromResponse(response);
      }),
      catchError(this.handleError('Failed to fetch contracts'))
    );
  }

  /** POST: /api/v1/staff/{staffMemberId}/contracts */
  create(staffMemberId: number, contractCommand: CreateContractCommand): Observable<Contract> {
    const resource = this.contractCommandAssembler.toResourceFromEntity(contractCommand);
    const url = staffMemberContractsEndpointUrl.replace('{staffMemberId}', staffMemberId.toString());
    return this.http.post<Contract>(url, resource).pipe(
      map(createdContract  => this.contractAssembler.toEntityFromResource(createdContract)),
      catchError(this.handleError('Failed to create contract'))
    );
  }
}
