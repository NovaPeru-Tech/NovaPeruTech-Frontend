import { environment } from '../../../environments/environment';
import { ErrorHandlingEnabledBaseType } from '../../shared/infrastructure/error-handling-enabled-base-type';
import { MetricAssembler } from './metric-assembler';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Metric } from '../domain/model/metric.entity';
import { MetricResource } from './metrics-response';

const analyticsStaffTerminationsEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderAnalyticsStaffTerminationsEndpointPath}`;
const analyticsStaffTerminationsByMonthEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderAnalyticsStaffTerminationsByMonthEndpointPath}`;
const analyticsStaffHiresEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderAnalyticsStaffHiresEndpointPath}`;
const analyticsStaffHiresByMonthEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderAnalyticsStaffHiresByMonthEndpointPath}`;
const analyticsResidentsAdmissionsEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderAnalyticsResidentsAdmissionsEndpointPath}`;
const analyticsResidentsAdmissionsByMonthEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderAnalyticsResidentsAdmissionsByMonthEndpointPath}`;
const analyticsResidentsAdmissionsByDateRangeEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderAnalyticsResidentsAdmissionsByDateRangeEndpointPath}`;
const analyticsResidentsActiveEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderAnalyticsResidentsActiveEndpointPath}`;

export class MetricsApiEndpoint extends ErrorHandlingEnabledBaseType {
  private readonly assembler = new MetricAssembler();

  constructor(private http: HttpClient) {
    super();
  }

  getStaffTerminations(nursingHomeId: number, year: number): Observable<Metric> {
    const url = analyticsStaffTerminationsEndpointUrl.replace('{nursingHomeId}', nursingHomeId.toString());
    const params = { year: year }

    console.log('Request URL:', url);
    console.log('Request params:', params);

    return this.http.get(url, { params, observe: 'response' }).pipe(
      map((response: any) => {
        console.log('Full HTTP Response:', response);
        console.log('Response body:', response.body);
        console.log('Response status:', response.status);

        return this.assembler.toEntityFromResource(response.body);
      }),
      catchError((error) => {
        console.error('HTTP Error:', error);
        console.error('Error status:', error.status);
        console.error('Error body:', error.error);
        return this.handleError(`Failed to fetch data for staff terminations for nursing home ID ${nursingHomeId} and year ${year}`)(error);
      })
    );
  }

  getStaffTerminationsByMonth(nursingHomeId: number, year: number, month: number): Observable<Metric> {
    const url = analyticsStaffTerminationsByMonthEndpointUrl.replace('{nursingHomeId}', nursingHomeId.toString());
    const params = { year: year, month: month }
    return this.http.get<MetricResource>(url, { params }).pipe(
      map(resource => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError(`Failed to fetch data for staff terminations by month for nursing home ID ${nursingHomeId}, year ${year}, and month ${month}`))
    );
  }

  getStaffHires(nursingHomeId: number, year: number): Observable<Metric> {
    const url = analyticsStaffHiresEndpointUrl.replace('{nursingHomeId}', nursingHomeId.toString());
    const params = {year: year}
    return this.http.get<MetricResource>(url, {params}).pipe(
      map(resource => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError(`Failed to fetch data for staff hires for nursing home ID ${nursingHomeId} and year ${year}`))
    );
  }

  getStaffHiresByMonth(nursingHomeId: number, year: number, month: number): Observable<Metric> {
    const url = analyticsStaffHiresByMonthEndpointUrl.replace('{nursingHomeId}', nursingHomeId.toString());
    const params = {year: year, month: month}
    return this.http.get<MetricResource>(url, {params}).pipe(
      map(resource => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError(`Failed to fetch data for staff hires by month for nursing home ID ${nursingHomeId}, year ${year}, and month ${month}`))
    );
  }

  getResidentsAdmissions(nursingHomeId: number, year: number): Observable<Metric> {
    const url = analyticsResidentsAdmissionsEndpointUrl.replace('{nursingHomeId}', nursingHomeId.toString());
    const params = {year: year}
    return this.http.get<MetricResource>(url, {params}).pipe(
      map(resource => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError(`Failed to fetch data for residents admissions for nursing home ID ${nursingHomeId} and year ${year}`))
    );
  }

  getResidentsAdmissionsByMonth(nursingHomeId: number, year: number, month: number): Observable<Metric> {
    const url = analyticsResidentsAdmissionsByMonthEndpointUrl.replace('{nursingHomeId}', nursingHomeId.toString());
    const params = {year: year, month: month}
    return this.http.get<MetricResource>(url, {params}).pipe(
      map(resource => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError(`Failed to fetch data for residents admissions by month for nursing home ID ${nursingHomeId}, year ${year}, and month ${month}`))
    );
  }

  getResidentsAdmissionsByDateRange(nursingHomeId: number, startDate: string, endDate: string): Observable<Metric> {
    const url = analyticsResidentsAdmissionsByDateRangeEndpointUrl.replace('{nursingHomeId}', nursingHomeId.toString());
    const params = {startDate: startDate, endDate: endDate}
    return this.http.get<MetricResource>(url, {params}).pipe(
      map(resource => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError(`Failed to fetch data for residents admissions by date range for nursing home ID ${nursingHomeId}, start date ${startDate}, and end date ${endDate}`))
    );
  }

  getResidentsActive(nursingHomeId: number, year: number): Observable<Metric> {
    const url = analyticsResidentsActiveEndpointUrl.replace('{nursingHomeId}', nursingHomeId.toString());
    const params = {year: year}
    return this.http.get<MetricResource>(url, {params}).pipe(
      map(resource => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError(`Failed to fetch data for active residents for nursing home ID ${nursingHomeId} and year ${year}`))
    );
  }
}
