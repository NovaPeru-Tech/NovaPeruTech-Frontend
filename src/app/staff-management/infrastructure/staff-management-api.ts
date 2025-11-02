import { Injectable } from '@angular/core';
import { StaffMembersApiEndpoint } from './staff-members-api-endpoint';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { HttpClient } from '@angular/common/http';
import { StaffMember } from '../domain/model/staff-member.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffManagementApi extends BaseApi {
  private readonly _staffMembersApiEndpoint: StaffMembersApiEndpoint;

  constructor(http:HttpClient) {
    super();
    this._staffMembersApiEndpoint = new StaffMembersApiEndpoint(http);
  }

  createStaffMember(staffMember:StaffMember):Observable<StaffMember> {
    return this._staffMembersApiEndpoint.create(staffMember);
  }

  deleteStaffMember(id:number):Observable<void> {
    return this._staffMembersApiEndpoint.delete(id);
  }

  updateStaffMember(staffMember:StaffMember):Observable<StaffMember> {
    return this._staffMembersApiEndpoint.update(staffMember,staffMember.id);
  }

  getStaffMembers() {
    return this._staffMembersApiEndpoint.getAll();
  }
}
