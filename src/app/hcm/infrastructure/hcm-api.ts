import { Injectable } from '@angular/core';
import { StaffApiEndpoint } from './staff-api-endpoint';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { HttpClient } from '@angular/common/http';
import { StaffMember } from '../domain/model/staff-member.entity';
import { Observable } from 'rxjs';
import { ContractsApiEndpoint } from './contracts-api-endpoint';
import { Contract } from '../domain/model/contract.entity';
import { NursingHomeStaffApiEndpoint } from './nursing-home-staff-api-endpoint';
import { CreateStaffMemberCommand } from '../domain/commands/create-staff-member-command';

@Injectable({
  providedIn: 'root'
})
export class HcmApi extends BaseApi {
  private readonly _staffApiEndpoint: StaffApiEndpoint;
  private readonly _contractsApiEndpoint: ContractsApiEndpoint;
  private readonly _nursingHomeStaffApiEndpoint: NursingHomeStaffApiEndpoint;

  constructor(http:HttpClient) {
    super();
    this._staffApiEndpoint = new StaffApiEndpoint(http);
    this._contractsApiEndpoint = new ContractsApiEndpoint(http);
    this._nursingHomeStaffApiEndpoint = new NursingHomeStaffApiEndpoint(http);
  }

  createStaffMemberToNursingHome(nursingHomeId: number, command: CreateStaffMemberCommand): Observable<StaffMember> {
    return this._nursingHomeStaffApiEndpoint.create(nursingHomeId, command);
  }

  getStaffByNursingHome(nursingHomeId: number): Observable<StaffMember[]> {
    return this._nursingHomeStaffApiEndpoint.getAll(nursingHomeId);
  }

  createStaffMember(staffMember:StaffMember):Observable<StaffMember> {
    return this._staffApiEndpoint.create(staffMember);
  }

  deleteStaffMember(id:number):Observable<void> {
    return this._staffApiEndpoint.delete(id);
  }

  updateStaffMember(staffMemberId: number, command:CreateStaffMemberCommand): Observable<StaffMember> {
    return this._nursingHomeStaffApiEndpoint.update(staffMemberId, command);
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
