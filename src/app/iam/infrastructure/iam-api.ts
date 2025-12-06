import { Injectable } from '@angular/core';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {SignUpApiEndpoint} from './sign-up-api-endpoint';
import {HttpClient} from '@angular/common/http';
import {SignUpAssembler} from './sign-up-assembler';
import {SignUpCommand} from '../domain/model/sign-up.command';
import {Observable} from 'rxjs';
import {SignUpResource} from './sign-up-response';
import {SignInCommand} from '../domain/model/sign-in.command';
import {SignInResource} from './sign-in-response';
import {SignInApiEndpoint} from './sign-in-api-endpoint';
import {SignInAssembler} from './sign-in-assembler';
import {CreateAdministratorApiEndpoint} from './create-administrator-api-endpoint';
import {CreateAdministratorAssembler} from './create-administrator-assembler';
import {AdministratorResource} from './create-administrator-response';
import {CreateAdministratorCommand} from '../domain/model/create-administrator.command';

/**
 * API service for identity and access management operations, including sign-up and sign-in.
 */
@Injectable({providedIn: 'root'})
export class IamApi extends BaseApi {
  private readonly signUpEndpoint: SignUpApiEndpoint;
  private readonly signInEndpoint: SignInApiEndpoint;
  private readonly administratorEndpoint: CreateAdministratorApiEndpoint;

  /**
   * Creates a new IamApi instance.
   * @param http - The HTTP client for making requests.
   */
  constructor(http: HttpClient) {
    super();
    this.signUpEndpoint = new SignUpApiEndpoint(http, new SignUpAssembler());
    this.signInEndpoint = new SignInApiEndpoint(http, new SignInAssembler());
    this.administratorEndpoint = new CreateAdministratorApiEndpoint(http, new CreateAdministratorAssembler());
  }

  /**
   * Signs up a new user.
   * @param signUpCommand - The sign-up command containing user credentials.
   * @returns An observable of the sign-up resource.
   */
  signUp(signUpCommand: SignUpCommand): Observable<SignUpResource> {
    return this.signUpEndpoint.signUp(signUpCommand);
  }

  /**
   * Signs in a user.
   * @param signInCommand - The sign-in command containing user credentials.
   * @returns An observable of the sign-in resource.
   */
  signIn(signInCommand: SignInCommand): Observable<SignInResource> {
    return this.signInEndpoint.signIn(signInCommand);
  }

  createAdministrator(createAdministratorCommand: CreateAdministratorCommand): Observable<AdministratorResource> {
    return this.administratorEndpoint.createAdministrator(createAdministratorCommand);
  }
}
