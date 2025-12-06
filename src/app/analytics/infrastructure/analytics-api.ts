import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { MetricsApiEndpoint } from './metrics-api-endpoint';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsApi extends BaseApi {
  private readonly _metricsApiEndpoint: MetricsApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this._metricsApiEndpoint = new MetricsApiEndpoint(http);
  }

  getStaffTerminations(nursingHomeId: number, year: number) {
    return this._metricsApiEndpoint.getStaffTerminations(nursingHomeId, year);
  }

  getStaffHires(nursingHomeId: number, year: number) {
    return this._metricsApiEndpoint.getStaffHires(nursingHomeId, year);
  }

  getResidentsAdmissions(nursingHomeId: number, year: number) {
    return this._metricsApiEndpoint.getResidentsAdmissions(nursingHomeId, year);
  }
}
