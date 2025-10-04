import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {SignUp} from '../domain/model/sign-up.entity';
import {SignUpResource, SignUpResponse} from './sign-up-response';


export class SignUpAssembler implements BaseAssembler<SignUp, SignUpResource, SignUpResponse>{
    toEntityFromResource(resource: SignUpResource): SignUp {
        return new SignUp({id:resource.id,lastName:resource.lastName,firstName:resource.firstName,email:resource.email,password:resource.password, role:resource.role});
    }

    toResourceFromEntity(entity: SignUp): SignUpResource {
     return {
       id:entity.id,
       firstName:entity.firstName,
       lastName:entity.lastName,
       email:entity.email,
       password:entity.password,
       role:entity.rol
     } as SignUpResource;
    }
    toEntitiesFromResponse(response: SignUpResponse): SignUp[] {
    return response.SignUp.map(signUp => this.toEntityFromResource(signUp));
    }


}
