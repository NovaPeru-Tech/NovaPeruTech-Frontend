import { Injectable } from '@angular/core';
import {NursingHome} from '../domain/model/nursing-home.entity';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {NursingHomeApiEndpoint} from './nursing-home-api-endpoint';
import {BaseApi} from '../../shared/infrastructure/base-api';

/*
* @purpose: Service to interact with the Nursing Home API
* @description: This service provides methods to create, update, and retrieve nursing home data by communicating with the Nursing Home API endpoint.
* */

@Injectable({
  providedIn: 'root'
})
export class NursingHomeApi  extends BaseApi{
  private readonly _nursingHomesApidEndpoint:NursingHomeApiEndpoint;
  constructor(http:HttpClient) {
    super();
    this._nursingHomesApidEndpoint=new NursingHomeApiEndpoint(http);
  }
  createNursingHome(nursingHome:NursingHome):Observable<NursingHome>{
    return this._nursingHomesApidEndpoint.create(nursingHome);
  }
  updateNursingHome(nursingHome:NursingHome):Observable<NursingHome>{
    return this._nursingHomesApidEndpoint.update(nursingHome,nursingHome.id);
  }
  getNursingHome(id:number):Observable<any>{
    return this._nursingHomesApidEndpoint.getById(id);
  }
}
