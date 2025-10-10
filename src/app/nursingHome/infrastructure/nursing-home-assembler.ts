import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {NursingHome} from '../domain/model/nursing-home.entity';
import {NursingHomeResource, NursingHomeResponse} from './nursing-home-response';

export class NursingHomeAssembler implements BaseAssembler<NursingHome, NursingHomeResource, NursingHomeResponse>{
  toEntitiesFromResponse(response: NursingHomeResponse): NursingHome[] {
    return response.nursingHome.map(nursingHome=>this.toEntityFromResource(nursingHome));
  }

  /*
* @purpose: Assembler class to convert between NursingHome entity and NursingHomeResource
* @description: This class implements methods to transform data from the API resource format to the domain entity format and vice versa.
* */

  toEntityFromResource(resource: NursingHomeResource): NursingHome {
    return new NursingHome({
      id:resource.id,
      name:resource.name,
      ruc:resource.ruc,
      phoneNumber:resource.phoneNUmber,
      address:resource.address,
      description:resource.description,
      adminId:resource.adminId,
    });
  }

  /*
* @purpose: Convert NursingHome entity to NursingHomeResource
* @description: This method takes a NursingHome entity and maps its properties to a NursingHomeResource object suitable for API communication.
* */

  toResourceFromEntity(entity: NursingHome): NursingHomeResource {
    return {
      id:entity.id,
      name:entity.name,
      ruc:entity.ruc,
      phoneNUmber:entity.phoneNumber,
      address:entity.address,
      description:entity.description,
      adminId:entity.adminId
    } as NursingHomeResource;
  }


}
