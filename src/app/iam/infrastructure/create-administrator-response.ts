import {BaseResource} from '../../shared/infrastructure/base-response';

export interface AdministratorResource extends BaseResource {
  id: number;

  username: string;
}

export interface AdministratorsResponse extends BaseResource, AdministratorResource {}
