import { Profile } from './profile.entity';

export class BusinessProfile extends Profile {
  private _businessName: string;
  private _ruc: string;

  constructor(businessProfile: {
    id: number;
    businessName: string;
    ruc: string;
    photo: string;
    phoneNumber: string;
    emailAddress: string;
    streetAddress: string;
  }) {
    super({
      id: businessProfile.id,
      photo: businessProfile.photo,
      phoneNumber: businessProfile.phoneNumber,
      emailAddress: businessProfile.emailAddress,
      streetAddress: businessProfile.streetAddress
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
