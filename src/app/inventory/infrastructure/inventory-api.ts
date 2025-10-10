import { Injectable } from '@angular/core';
import {MedicationApiEndpoint} from './medication-api-endpoint';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {Medication} from '../domain/medication.entity';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryApi extends BaseApi {
  private  readonly _MedicationApiEndpoint:MedicationApiEndpoint;

  constructor(http:HttpClient) {
    super();
    this._MedicationApiEndpoint= new MedicationApiEndpoint(http);

  }
createMedication(medication:Medication):Observable<Medication>{
    return this._MedicationApiEndpoint.create(medication);
}
updateMedication(medication:Medication):Observable<Medication>{
    return this._MedicationApiEndpoint.update(medication,medication.id);
}
DeleteMedications(id:number):Observable<void>{
    return this._MedicationApiEndpoint.delete(id);

}
getMedications(){
    return this._MedicationApiEndpoint.getAll()
}

}
