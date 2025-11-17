import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessProfilesApiEndpoint } from './business-profiles-api-endpoint';
import { PersonProfilesApiEndpoint } from './person-profiles-api-endpoint';
import {BusinessProfile} from '../domain/model/business-profile.entity';
import {PersonProfile} from '../domain/model/person-profile.entity';

@Injectable({ providedIn: 'root' })
export class ProfilesApi extends BaseApi {
  private readonly _businessProfilesApiEndpoint: BusinessProfilesApiEndpoint;
  private readonly _personProfilesApiEndpoint: PersonProfilesApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this._businessProfilesApiEndpoint = new BusinessProfilesApiEndpoint(http);
    this._personProfilesApiEndpoint = new PersonProfilesApiEndpoint(http);
  }

  getBusinessProfiles(): Observable<BusinessProfile[]> {
    return this._businessProfilesApiEndpoint.getAll();
  }

  getBusinessProfile(id: number): Observable<BusinessProfile> {
    return this._businessProfilesApiEndpoint.getById(id);
  }

  createBusinessProfile(businessProfile: BusinessProfile): Observable<BusinessProfile> {
    return this._businessProfilesApiEndpoint.create(businessProfile);
  }

  updateBusinessProfile(businessProfile: BusinessProfile): Observable<BusinessProfile> {
    return this._businessProfilesApiEndpoint.update(businessProfile, businessProfile.id);
  }

  deleteBusinessProfile(id: number): Observable<void> {
    return this._businessProfilesApiEndpoint.delete(id);
  }

  getPersonProfiles(): Observable<PersonProfile[]> {
    return this._personProfilesApiEndpoint.getAll();
  }

  getPersonProfile(id: number): Observable<PersonProfile> {
    return this._personProfilesApiEndpoint.getById(id);
  }

  createPersonProfile(personProfile: PersonProfile): Observable<PersonProfile> {
    return this._personProfilesApiEndpoint.create(personProfile);
  }

  updatePersonProfile(personProfile: PersonProfile): Observable<PersonProfile> {
    return this._personProfilesApiEndpoint.update(personProfile, personProfile.id);
  }

  deletePersonProfile(id: number): Observable<void> {
    return this._personProfilesApiEndpoint.delete(id);
  }
}
