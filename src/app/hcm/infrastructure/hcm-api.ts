import { Injectable } from '@angular/core';
import { StaffApiEndpoint } from './staff-api-endpoint';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { HttpClient } from '@angular/common/http';
import { StaffMember } from '../domain/model/staff-member.entity';
import { Observable } from 'rxjs';
import { ContractsApiEndpoint } from './contracts-api-endpoint';
import { Contract } from '../domain/model/contract.entity';

@Injectable({
  providedIn: 'root'
})
export class HcmApi extends BaseApi {
  private readonly _staffApiEndpoint: StaffApiEndpoint;
  private readonly _contractsApiEndpoint: ContractsApiEndpoint;

  constructor(http:HttpClient) {
    super();
    this._staffApiEndpoint = new StaffApiEndpoint(http);
    this._contractsApiEndpoint = new ContractsApiEndpoint(http);
  }

  createStaffMember(staffMember:StaffMember):Observable<StaffMember> {
    return this._staffApiEndpoint.create(staffMember);
  }

  deleteStaffMember(id:number):Observable<void> {
    return this._staffApiEndpoint.delete(id);
  }

  updateStaffMember(staffMember:StaffMember):Observable<StaffMember> {
    return this._staffApiEndpoint.update(staffMember,staffMember.id);
  }

  getStaffMembers() {
    return this._staffApiEndpoint.getAll();
  }

  createContract(contract: Contract):Observable<Contract> {
    return this._contractsApiEndpoint.create(contract);
  }

  getContracts() {
    return this._contractsApiEndpoint.getAll();
  }
}
