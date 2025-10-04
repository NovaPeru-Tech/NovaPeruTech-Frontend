import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

export interface SignInResource extends BaseResource {
  id:number;
  email: string;
  password:string,
}
export interface  SignInResponse extends BaseResponse {
 signIn:SignInResource[];
}
