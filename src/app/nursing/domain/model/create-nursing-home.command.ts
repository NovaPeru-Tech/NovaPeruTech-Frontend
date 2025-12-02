export class CreateNursingHomeCommand {
  private _businessName: string;
  private _emailAddress: string;
  private _phoneNumber: string;
  private _street: string;
  private _number: string;
  private _city: string;
  private _postalCode: string;
  private _country: string;
  private _photo: string;
  private _ruc: string;

  constructor(createNursingHomeCommand: {
    businessName: string;
    lastName: string;
    emailAddress: string;
    street: string;
    number: string;
    city: string;
    postalCode: string;
    country: string;
    photo: string;
    phoneNumber: string;
    ruc: string;
  }) {
    this._businessName = createNursingHomeCommand.businessName;
    this._emailAddress = createNursingHomeCommand.emailAddress;
    this._street = createNursingHomeCommand.street;
    this._number = createNursingHomeCommand.number;
    this._city = createNursingHomeCommand.city;
    this._postalCode = createNursingHomeCommand.postalCode;
    this._country = createNursingHomeCommand.country;
    this._photo = createNursingHomeCommand.photo;
    this._phoneNumber = createNursingHomeCommand.phoneNumber;
    this._ruc = createNursingHomeCommand.ruc;
  }

  get businessName(): string {
    return this._businessName;
  }

  set businessName(value: string) {
    this._businessName = value;
  }

  get emailAddress(): string {
    return this._emailAddress;
  }

  set emailAddress(value: string) {
    this._emailAddress = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
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

  get ruc(): string {
    return this._ruc;
  }

  set ruc(value: string) {
    this._ruc = value;
  }
}
