import {Injectable, signal} from '@angular/core';
import {NursingHome} from '../domain/model/nursing-home.entity';
import {NursingHomeApi} from '../infrastructure/nursing-home-api';
import {retry} from 'rxjs';

/*
* @purpose: Manage the state of nursing homes in the application
* @description: This service uses Angular's signal to manage the state of nursing homes, loading status, and error messages.
* */

@Injectable({
  providedIn: 'root'
})
export class NursingHomeStore {
  private readonly _nursingHomesSignal= signal<NursingHome[]>([]);
  private readonly _loadingSignal=signal<boolean>(false);
  private readonly _errorSignal=signal<string|null>(null);
  readonly loading=this._loadingSignal.asReadonly();
  readonly error = this._errorSignal.asReadonly();
  readonly nursingHomes=this._nursingHomesSignal.asReadonly();
  constructor(private nursingHomeApi:NursingHomeApi) {

  }

  /*
* @purpose: Add a new nursing home
* @description: This method sets the loading state to true, clears any previous errors, and calls the API to create a new nursing home. On success, it updates the nursing homes signal and sets loading to false. On error, it sets an appropriate error message and sets loading to false.
* */

  addNursingHome(nursingHome:NursingHome){
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
    this.nursingHomeApi.createNursingHome(nursingHome).pipe(retry(2)).subscribe({
      next:createdNursingHome=>{
        this._nursingHomesSignal.update(nursingHome=>[...nursingHome,createdNursingHome]);
        this._loadingSignal.set(false);

      },
      error:err=>{
        this._errorSignal.set(this.formatError(err,'failed to create '));
        this._loadingSignal.set(false);
      }
    });
  }

  /*
* @purpose: Format error messages
* @description: This private method takes an error object and a fallback string. If the error is an instance of Error, it checks if the message includes 'Resource not found' and returns a formatted message. Otherwise, it returns the fallback string.
* */

  private formatError(error:any,fallback:string):string{
    if(error instanceof Error){
      return error.message.includes('Resource not found ')?`${fallback}:Not Found`:error.message;

    }
    return fallback;
  }
}
