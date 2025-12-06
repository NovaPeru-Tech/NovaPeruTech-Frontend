export class CreateResidentCommand {
  private _dni: string;
  private _firstName: string;
  private _lastName: string;
  private _birthDate: string;
  private _age: number;
  private _emailAddress: string;
  private _street: string;
  private _number: string;
  private _city: string;
  private _postalCode: string;
  private _country: string;
  private _photo: string;
  private _phoneNumber: string;

  private _legalRepresentativeFirstName: string;
  private _legalRepresentativeLastName: string;
  private _legalRepresentativePhoneNumber: string;

  private _emergencyContactFirstName: string;
  private _emergencyContactLastName: string;
  private _emergencyContactPhoneNumber: string;

  constructor(residentCommand: {
    dni: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    age: number;
    emailAddress: string;
    street: string;
    number: string;
    city: string;
    postalCode: string;
    country: string;
    photo: string;
    phoneNumber: string;

    legalRepresentativeFirstName: string;
    legalRepresentativeLastName: string;
    legalRepresentativePhoneNumber: string;

    emergencyContactFirstName: string;
    emergencyContactLastName: string;
    emergencyContactPhoneNumber: string;
  }) {
    this._dni = residentCommand.dni;
    this._firstName = residentCommand.firstName;
    this._lastName = residentCommand.lastName;
    this._birthDate = residentCommand.birthDate;
    this._age = residentCommand.age;
    this._emailAddress = residentCommand.emailAddress;
    this._street = residentCommand.street;
    this._number = residentCommand.number;
    this._city = residentCommand.city;
    this._postalCode = residentCommand.postalCode;
    this._country = residentCommand.country;
    this._photo = residentCommand.photo;
    this._phoneNumber = residentCommand.phoneNumber;

    this._legalRepresentativeFirstName =
      residentCommand.legalRepresentativeFirstName;
    this._legalRepresentativeLastName =
      residentCommand.legalRepresentativeLastName;
    this._legalRepresentativePhoneNumber =
      residentCommand.legalRepresentativePhoneNumber;

    this._emergencyContactFirstName =
      residentCommand.emergencyContactFirstName;
    this._emergencyContactLastName =
      residentCommand.emergencyContactLastName;
    this._emergencyContactPhoneNumber =
      residentCommand.emergencyContactPhoneNumber;
  }

  get dni(): string {
    return this._dni;
  }

  set dni(value: string) {
    this._dni = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get birthDate(): string {
    return this._birthDate;
  }

  set birthDate(value: string) {
    this._birthDate = value;
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    this._age = value;
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

  get legalRepresentativeFirstName(): string {
    return this._legalRepresentativeFirstName;
  }

  set legalRepresentativeFirstName(value: string) {
    this._legalRepresentativeFirstName = value;
  }

  get legalRepresentativeLastName(): string {
    return this._legalRepresentativeLastName;
  }

  set legalRepresentativeLastName(value: string) {
    this._legalRepresentativeLastName = value;
  }

  get legalRepresentativePhoneNumber(): string {
    return this._legalRepresentativePhoneNumber;
  }

  set legalRepresentativePhoneNumber(value: string) {
    this._legalRepresentativePhoneNumber = value;
  }

  get emergencyContactFirstName(): string {
    return this._emergencyContactFirstName;
  }

  set emergencyContactFirstName(value: string) {
    this._emergencyContactFirstName = value;
  }

  get emergencyContactLastName(): string {
    return this._emergencyContactLastName;
  }

  set emergencyContactLastName(value: string) {
    this._emergencyContactLastName = value;
  }

  get emergencyContactPhoneNumber(): string {
    return this._emergencyContactPhoneNumber;
  }

  set emergencyContactPhoneNumber(value: string) {
    this._emergencyContactPhoneNumber = value;
  }
}
