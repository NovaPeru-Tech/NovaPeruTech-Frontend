import { Injectable } from '@angular/core';
import {StaffMembersApiEndpoint} from './staff-members-api-endpoint';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {HttpClient} from '@angular/common/http';
import {StaffMember} from '../domain/model/staff-member.entity';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesApi  extends BaseApi{
  private readonly _staffEndpoint:StaffMembersApiEndpoint;

  constructor(http:HttpClient) {
    super();
    this._staffEndpoint=new StaffMembersApiEndpoint(http);
  }
  createEmployee(staff:StaffMember):Observable<StaffMember>{
return this._staffEndpoint.create(staff);
  }
  DeleteEmployee(id:number):Observable<void>{
    return this._staffEndpoint.delete(id);
  }
  updateEmployee(staff:StaffMember):Observable<StaffMember>{
    return this._staffEndpoint.update(staff,staff.id);
  }
 getEmployees(){
    return this._staffEndpoint.getAll();
 }

}
