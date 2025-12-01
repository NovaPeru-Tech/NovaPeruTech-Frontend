import { environment } from '../../../environments/environment';
import { ErrorHandlingEnabledBaseType } from '../../shared/infrastructure/error-handling-enabled-base-type';
import { MetricAssembler } from './metric-assembler';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Metric } from '../domain/model/metric.entity';
import { MetricResource } from './metrics-response';

const analyticsStaffTerminationsEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderAnalyticsStaffTerminationsEndpointPath}`;
const analyticsStaffHiresEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderAnalyticsStaffHiresEndpointPath}`;
const analyticsResidentsAdmissionsEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderAnalyticsResidentsAdmissionsEndpointPath}`;

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

  getStaffHires(nursingHomeId: number, year: number): Observable<Metric> {
    const url = analyticsStaffHiresEndpointUrl.replace('{nursingHomeId}', nursingHomeId.toString());
    const params = {year: year}
    return this.http.get<MetricResource>(url, {params}).pipe(
      map(resource => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError(`Failed to fetch data for staff hires for nursing home ID ${nursingHomeId} and year ${year}`))
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
}
