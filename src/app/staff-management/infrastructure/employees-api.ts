import { Injectable } from '@angular/core';
import {StaffApiEndpoint} from './staff-api-endpoint';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {HttpClient} from '@angular/common/http';
import {Staff} from '../domain/model/staff.entity';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesApi  extends BaseApi{
  private readonly _staffEndpoint:StaffApiEndpoint;

  constructor(http:HttpClient) {
    super();
    this._staffEndpoint=new StaffApiEndpoint(http);
  }
  createEmployee(staff:Staff):Observable<Staff>{
return this._staffEndpoint.create(staff);
  }
  DeleteEmployee(id:number):Observable<void>{
    return this._staffEndpoint.delete(id);
  }
  updateEmployee(staff:Staff):Observable<Staff>{
    return this._staffEndpoint.update(staff,staff.id);
  }
 getEmployees(){
    return this._staffEndpoint.getAll();
 }

}
