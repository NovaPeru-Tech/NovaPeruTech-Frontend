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

  getStaffTerminationsByMonth(nursingHomeId: number, year: number, month: number) {
    return this._metricsApiEndpoint.getStaffTerminationsByMonth(nursingHomeId, year, month);
  }

  getStaffHires(nursingHomeId: number, year: number) {
    return this._metricsApiEndpoint.getStaffHires(nursingHomeId, year);
  }

  getStaffHiresByMonth(nursingHomeId: number, year: number, month: number) {
    return this._metricsApiEndpoint.getStaffHiresByMonth(nursingHomeId, year, month);
  }

  getResidentsAdmissions(nursingHomeId: number, year: number) {
    return this._metricsApiEndpoint.getResidentsAdmissions(nursingHomeId, year);
  }

  getResidentsAdmissionsByMonth(nursingHomeId: number, year: number, month: number) {
    return this._metricsApiEndpoint.getResidentsAdmissionsByMonth(nursingHomeId, year, month);
  }

  getResidentsAdmissionsByDateRange(nursingHomeId: number, startDate: string, endDate: string) {
    return this._metricsApiEndpoint.getResidentsAdmissionsByDateRange(nursingHomeId, startDate, endDate);
  }

  getResidentsActive(nursingHomeId: number, year: number) {
    return this._metricsApiEndpoint.getResidentsActive(nursingHomeId, year);
  }
}
