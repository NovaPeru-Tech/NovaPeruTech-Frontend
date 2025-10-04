import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

export interface SignUpResource extends BaseResource {
id: number;
firstName: string;
lastName: string;
email: string;
password: string;
  role: 'administrator' | 'family';
}
export interface  SignUpResponse extends BaseResponse {
  SignUp: SignUpResource[];
}
