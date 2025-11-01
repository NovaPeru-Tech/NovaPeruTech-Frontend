import {computed, Injectable, Signal, signal} from '@angular/core';
import {Staff} from '../domain/model/staff.entity';
import {EmployeesApi} from '../infrastructure/employees-api';
import {retry} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class EmployeesStore {
  private readonly _staffSignal= signal<Staff[]>([]);
  private readonly _loadingSignal=signal<boolean>(false);
  private readonly _errorSignal=signal<string|null>(null);
  readonly error=this._errorSignal.asReadonly();
  readonly loading=this._loadingSignal.asReadonly();
  readonly staffs=this._staffSignal.asReadonly();

  constructor(private EmployeeApi:EmployeesApi) {
this.loadStaff();
  }
  addStaff(Staff:Staff){
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.EmployeeApi.createEmployee(Staff).pipe(retry(2)).subscribe({
      next:createdStaff=>{
        this._staffSignal.update(staffs=>[...staffs,createdStaff]);
        this._loadingSignal.set(false);
      },
      error:err=>{
        this._errorSignal.set(this.formatError(err,'Failed to create staff'));
        this._loadingSignal.set(false);
      }
    });


  }
  getStaffById(id:number):Signal<Staff|undefined>{
    return computed(()=>id?this.staffs().find(s=>s.id===id):undefined);
  }
 deleteStaff(id:number):void{
    this._loadingSignal.set(false);
    this._errorSignal.set(null);
    this.EmployeeApi.DeleteEmployee(id).pipe(retry(2)).subscribe({
      next:()=>{
    this._staffSignal.update(staffs=>staffs.filter(s=>s.id!==id));
      },
      error:err=>{
        this._errorSignal.set(this.formatError(err,'Failed to delete staff'));
        this._loadingSignal.set(false);
      }
    })
  }
  updateStaff( staff:Staff){
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.EmployeeApi.updateEmployee(staff).pipe(retry(2)).subscribe({
      next:updateStaff=>{
        this._staffSignal.update(staffs=>staffs.map(s=>s.id==updateStaff.id?updateStaff:s));
        this._loadingSignal.set(false);
      },
      error:err=>{
        this._errorSignal.set(this.formatError(err,'Failed to update staff'));
        this._loadingSignal.set(false);
      }
    })
  }
  loadStaff(){
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.EmployeeApi.getEmployees().pipe(takeUntilDestroyed()).subscribe({
      next:staffs=>{
         this._staffSignal.set(staffs);
         this._loadingSignal.set(false);
    }
    })
  }
  formatError(error:any,fallback:string):string{
    if(error instanceof Error){
      return error.message.includes('Resource not found')?`${fallback}: Not Found` : error.message;
    }
    return fallback;
  }

}
