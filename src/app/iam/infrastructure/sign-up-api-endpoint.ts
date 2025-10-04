import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {SignUp} from '../domain/model/sign-up.entity';
import {SignUpResource, SignUpResponse} from './sign-up-response';
import {SignUpAssembler} from './sign-up-assembler';
import {map, Observable} from 'rxjs';

const singUpEndpoint=`${environment.platformProviderApiBaseUrl}${environment.platformProviderSignUpEndpointPath}`;
export class SignUpApiEndpoint  extends  BaseApiEndpoint<SignUp,SignUpResource, SignUpResponse, SignUpAssembler>{
  constructor(http:HttpClient) {
    super(http,singUpEndpoint,new SignUpAssembler())
  }
    register(signUp: SignUp): Observable<SignUp> {
    const resource = this.assembler.toResourceFromEntity(signUp);
      console.log('Register - resource to send:', resource);

      return this.http.post<SignUpResource>(this.endpointUrl, resource, { observe: 'response' }).pipe(
      map(resp => {
        if (resp.status === 201 || resp.status === 200) {
          return this.assembler.toEntityFromResource(resp.body as SignUpResource);

        }
        if (resp.status === 204) {
          return new SignUp({ id: 0, firstName: signUp.firstName, lastName: signUp.lastName, email: signUp.email, password: '',role:signUp.rol });
        }
        throw new Error('Unexpected response from signup');
      })
    );
  }

}
