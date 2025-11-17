import { Profile } from './profile.entity';

export class BusinessProfile extends Profile {
  private _businessName: string;
  private _ruc: string;

  constructor(businessProfile: {
    id: number;
    businessName: string;
    ruc: string;
    emailAddress: string;
    street: string;
    number: string;
    city: string;
    postalCode: string;
    country: string;
    photo: string;
    phoneNumber: string;
  }) {
    super({
      id: businessProfile.id,
      emailAddress: businessProfile.emailAddress,
      street: businessProfile.street,
      number: businessProfile.number,
      city: businessProfile.city,
      postalCode: businessProfile.postalCode,
      country: businessProfile.country,
      photo: businessProfile.photo,
      phoneNumber: businessProfile.phoneNumber
    });

    this._businessName = businessProfile.businessName;
    this._ruc = businessProfile.ruc;
  }

  get businessName(): string {
    return this._businessName;
  }

  set businessName(value: string) {
    this._businessName = value;
  }

  get ruc(): string {
    return this._ruc;
  }

  set ruc(value: string) {
    this._ruc = value;
  }
}
