import {environment} from '../../../environments/environment';
import {ErrorHandlingEnabledBaseType} from '../../shared/infrastructure/error-handling-enabled-base-type';
import {DeviceAssembler} from './device-assembler';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import {Device} from '../domain/model/device.entity';
import {DeviceResource} from './devices-response';

const devicesEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderDevicesEndpointPath}`

export class DevicesApiEndpoint extends ErrorHandlingEnabledBaseType {
  private readonly deviceAssembler = new DeviceAssembler();

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Device[]> {
    return this.http.get<DeviceResource[]>(devicesEndpointUrl).pipe(
      map(response => {
        if(Array.isArray(response)) {
          return response.map(resource => this.deviceAssembler.toEntityFromResource(resource));
        }
        return this.deviceAssembler.toEntitiesFromResponse(response);
      }),
      catchError(this.handleError('Failed to fetch devices'))
    )
  }
}
