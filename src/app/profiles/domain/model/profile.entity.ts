export class Profile {
  private _id: number;
  private _photo: string;
  private _phoneNumber: string;
  private _emailAddress: string;
  private _streetAddress: string;

  constructor(profile: {
    id: number;
    photo: string;
    phoneNumber: string;
    emailAddress: string;
    streetAddress: string;
  }) {
    this._id = profile.id;
    this._photo = profile.photo;
    this._phoneNumber = profile.phoneNumber;
    this._emailAddress = profile.emailAddress;
    this._streetAddress = profile.streetAddress;
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

  get streetAddress(): string {
    return this._streetAddress;
  }

  set streetAddress(value: string) {
    this._streetAddress = value;
  }
}
