import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { BusinessProfile } from '../domain/model/business-profile.entity';
import { BusinessProfileResource, BusinessProfilesResponse } from './business-profiles-response';

export class BusinessProfileAssembler implements BaseAssembler<BusinessProfile, BusinessProfileResource, BusinessProfilesResponse> {
  toEntitiesFromResponse(response: BusinessProfilesResponse): BusinessProfile[] {
    return response.businessProfiles.map(businessProfile => this.toEntityFromResource(businessProfile));
  }

  toEntityFromResource(resource: BusinessProfileResource): BusinessProfile {
    return new BusinessProfile({
      id: resource.id,
      businessName: resource.businessName,
      ruc: resource.ruc,
      photo:resource.photo,
      phoneNumber: resource.phoneNumber,
      emailAddress: resource.emailAddress,
      streetAddress: resource.streetAddress
    });
  }

  toResourceFromEntity(entity: BusinessProfile): BusinessProfileResource {
    return {
      id: entity.id,
      businessName: entity.businessName,
      ruc: entity.ruc,
      photo: entity.photo,
      phoneNumber: entity.phoneNumber,
      emailAddress: entity.emailAddress,
      streetAddress: entity.streetAddress
    } as BusinessProfileResource;
  }
}
