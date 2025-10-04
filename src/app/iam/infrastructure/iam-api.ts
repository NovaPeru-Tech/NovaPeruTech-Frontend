import { Injectable } from '@angular/core';
import {SignInApiEndpoint} from './sign-in-api-endpoint';
import {SignUpApiEndpoint} from './sign-up-api-endpoint';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {Observable} from 'rxjs';
import {SignIn} from '../domain/model/sign-in.entity';
import {SignUp} from '../domain/model/sign-up.entity';


@Injectable({
  providedIn: 'root'
})
export class IamApi extends BaseApi{
  private readonly _signInApiEndpoint:SignInApiEndpoint;
  private readonly _signUpApiEndpoint:SignUpApiEndpoint;
  constructor(http:HttpClient) {
    super();
    this._signInApiEndpoint=new SignInApiEndpoint(http);
    this._signUpApiEndpoint=new SignUpApiEndpoint(http);
  }

  createSignIn(sign:SignIn):Observable<SignIn>{
    return this._signInApiEndpoint.login(sign);
}

CreateSignUp(signUp:SignUp){
return this._signUpApiEndpoint.register(signUp);
}
}
