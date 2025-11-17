import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Contract } from '../domain/model/contract.entity';
import { ContractResource, ContractsResponse } from './contracts-response';
import { ContractAssembler } from './contract-assembler';
import { HttpClient } from '@angular/common/http';

const contractsEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderContractsEndpointPath}`

export class ContractsApiEndpoint extends BaseApiEndpoint<Contract, ContractResource, ContractsResponse, ContractAssembler> {
  constructor(http: HttpClient) {
    super(http, contractsEndpointUrl, new ContractAssembler());
  }
}
