export class Profile {
  private _id: number;
  private _emailAddress: string;
  private _street: string;
  private _number: string;
  private _city: string;
  private _postalCode: string;
  private _country: string;
  private _photo: string;
  private _phoneNumber: string;

  constructor(profile: {
    id: number;
    emailAddress: string;
    street: string;
    number: string;
    city: string;
    postalCode: string;
    country: string;
    photo: string;
    phoneNumber: string;
  }) {
    this._id = profile.id;
    this._emailAddress = profile.emailAddress;
    this._street = profile.street;
    this._number = profile.number;
    this._city = profile.city;
    this._postalCode = profile.postalCode;
    this._country = profile.country;
    this._photo = profile.photo;
    this._phoneNumber = profile.phoneNumber;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get emailAddress(): string {
    return this._emailAddress;
  }

  set emailAddress(value: string) {
    this._emailAddress = value;
  }

  get street(): string {
    return this._street;
  }

  set street(value: string) {
    this._street = value;
  }

  get number(): string {
    return this._number;
  }

  set number(value: string) {
    this._number = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  get postalCode(): string {
    return this._postalCode;
  }

  set postalCode(value: string) {
    this._postalCode = value;
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }

  get photo(): string {
    return this._photo;
  }

  set photo(value: string) {
    this._photo = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }
}
