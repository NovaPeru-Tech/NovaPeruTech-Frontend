import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {SignIn} from '../domain/model/sign-in.entity';
import {SignInResource, SignInResponse} from './sign-in-response';
import {SignInAssembler} from './sign-in-assembler';
import {catchError, map, Observable, throwError} from 'rxjs';
const signInEndpointUrl=`${environment.platformProviderApiBaseUrl}${environment.platformProviderSignInEndpointPath}`;
export class SignInApiEndpoint extends BaseApiEndpoint<SignIn, SignInResource, SignInResponse, SignInAssembler>{
  constructor(http:HttpClient) {
    super(http,signInEndpointUrl,new SignInAssembler());
  }
  login(signIn: SignIn): Observable<SignIn> {
    const email = signIn.email ?? '';
    const password = signIn.password ?? '';

    if (!email.trim() || !password) {
      return throwError(() => new Error('Email y password son requeridos'));
    }

    const url = `${this.endpointUrl}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    return this.http.get<SignInResource[]>(url, { observe: 'body' }).pipe(
      map(users => {
        if (!users || users.length === 0) {
          throw new Error('Credenciales incorrectas');
        }
        // convertimos el primer recurso a entidad (assembler quita password)
        return this.assembler.toEntityFromResource(users[0]);
      }),
      catchError(err => throwError(() => err instanceof Error ? err : new Error('Error en SignIn')))
    );
  }

}
