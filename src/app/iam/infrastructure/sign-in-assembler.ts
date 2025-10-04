import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {SignInResource, SignInResponse} from './sign-in-response';
import {SignIn} from '../domain/model/sign-in.entity';
/*
*  |
*
* */
export class SignInAssembler implements BaseAssembler<SignIn,SignInResource,SignInResponse>{
  toEntitiesFromResponse(response: SignInResponse): SignIn[] {
    return response.signIn.map(signIn=>this.toEntityFromResource(signIn));
  }

  toEntityFromResponse(response: SignInResponse): SignIn {
    const first = response.signIn && response.signIn.length ? response.signIn[0] : null;
    if (!first) {
      throw new Error('Empty SignInResponse');
    }
    return this.toEntityFromResource(first);
  }


  toEntityFromResource(resource: SignInResource): SignIn {
    return new SignIn({ id:resource.id,email:resource.email,password:''});
  }

  toResourceFromEntity(entity: SignIn): SignInResource {
return {
  id:entity.id,
  email:entity.email,
  password:entity.password,
}as SignInResource;
  }


}
