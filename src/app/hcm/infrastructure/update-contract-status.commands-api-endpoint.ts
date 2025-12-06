import { environment } from '../../../environments/environment';
import { ErrorHandlingEnabledBaseType } from '../../shared/infrastructure/error-handling-enabled-base-type';
import { ContractAssembler } from './contract-assembler';
import { UpdateContractStatusCommandAssembler } from './update-contract-status.command-assembler';
import { HttpClient } from '@angular/common/http';
import { UpdateContractStatusCommand } from '../domain/model/update-contract-status.command';
import { catchError, map, Observable } from 'rxjs';
import { Contract } from '../domain/model/contract.entity';

const staffMemberContractStatusEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderStaffMemberContractStatusEndpointPath}`

export class UpdateContractStatusCommandsApiEndpoint extends ErrorHandlingEnabledBaseType {
  private readonly contractAssembler = new ContractAssembler();
  private readonly updateContractStatusAssembler = new UpdateContractStatusCommandAssembler();

  constructor(private http: HttpClient) {
    super();
  }

  updateContractStatus(staffMemberId: number, contractId: number, updateContractStatusCommand: UpdateContractStatusCommand): Observable<Contract> {
    const resource = this.updateContractStatusAssembler.toResourceFromEntity(updateContractStatusCommand);
    const url = staffMemberContractStatusEndpointUrl.replace('{staffMemberId}', staffMemberId.toString()).replace('{contractId}', contractId.toString());
    return this.http.patch<Contract>(url, resource).pipe(
      map(updatedContractStatus => this.contractAssembler.toEntityFromResource(updatedContractStatus)),
      catchError(this.handleError('Failed to update contract status'))
    );
  }
}
