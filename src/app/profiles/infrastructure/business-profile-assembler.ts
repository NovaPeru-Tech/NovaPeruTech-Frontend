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
      emailAddress: resource.emailAddress,
      street: resource.street,
      number: resource.number,
      city: resource.city,
      postalCode: resource.postalCode,
      country: resource.country,
      photo:resource.photo,
      phoneNumber: resource.phoneNumber
    });
  }

  toResourceFromEntity(entity: BusinessProfile): BusinessProfileResource {
    return {
      id: entity.id,
      businessName: entity.businessName,
      ruc: entity.ruc,
      emailAddress: entity.emailAddress,
      street: entity.street,
      number: entity.number,
      city: entity.city,
      postalCode: entity.postalCode,
      country: entity.country,
      photo: entity.photo,
      phoneNumber: entity.phoneNumber
    } as BusinessProfileResource;
  }
}
