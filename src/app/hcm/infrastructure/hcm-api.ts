import { Injectable } from '@angular/core';
import { StaffApiEndpoint } from './staff-api-endpoint';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { HttpClient } from '@angular/common/http';
import { StaffMember } from '../domain/model/staff-member.entity';
import { Observable } from 'rxjs';
import { ContractsApiEndpoint } from './contracts-api-endpoint';
import { Contract } from '../domain/model/contract.entity';
import { StaffMemberCommandsApiEndpoint } from './staff-member-commands-api-endpoint';
import {StaffMemberCommand} from '../domain/model/staff-member.command';
import {ContractCommandsApiEndpoint} from './contract-commands-api-endpoint';
import {ContractCommand} from '../domain/model/contract.command';

@Injectable({
  providedIn: 'root'
})
export class HcmApi extends BaseApi {
  private readonly _staffApiEndpoint: StaffApiEndpoint;
  private readonly _contractsApiEndpoint: ContractsApiEndpoint;
  private readonly _staffMemberCommandsApiEndpoint: StaffMemberCommandsApiEndpoint;
  private readonly _contractCommandsApiEndpoint: ContractCommandsApiEndpoint;

  constructor(http:HttpClient) {
    super();
    this._staffApiEndpoint = new StaffApiEndpoint(http);
    this._contractsApiEndpoint = new ContractsApiEndpoint(http);
    this._staffMemberCommandsApiEndpoint = new StaffMemberCommandsApiEndpoint(http);
    this._contractCommandsApiEndpoint = new ContractCommandsApiEndpoint(http);
  }

  createStaffMember(nursingHomeId: number, staffMemberCommand: StaffMemberCommand): Observable<StaffMember> {
    return this._staffMemberCommandsApiEndpoint.create(nursingHomeId, staffMemberCommand);
  }

  deleteStaffMember(id: number): Observable<void> {
    return this._staffApiEndpoint.delete(id);
  }

  updateStaffMember(staffMemberId: number, staffMemberCommand: StaffMemberCommand): Observable<StaffMember> {
    return this._staffMemberCommandsApiEndpoint.update(staffMemberId, staffMemberCommand);
  }

  getStaffMembers(nursingHomeId: number) {
    return this._staffMemberCommandsApiEndpoint.getAll(nursingHomeId);
  }

  createContract(staffMemberId: number, contractCommand: ContractCommand): Observable<Contract> {
    return this._contractCommandsApiEndpoint.create(staffMemberId, contractCommand);
  }

  getContracts(staffMemberId: number): Observable<Contract[]> {
    return this._contractCommandsApiEndpoint.getAll(staffMemberId);
  }
}
