export class CreateStaffMemberCommand {
  private _dni: string;
  private _firstName: string
  private _lastName: string
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

  private _emergencyContactFirstName: string;
  private _emergencyContactLastName: string;
  private _emergencyContactPhoneNumber: string;

  constructor(command: {
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

    emergencyContactFirstName: string;
    emergencyContactLastName: string;
    emergencyContactPhoneNumber: string;
  }) {
    this._dni = command.dni;
    this._firstName = command.firstName;
    this._lastName = command.lastName;
    this._birthDate = command.birthDate;
    this._age = command.age;
    this._emailAddress = command.emailAddress;
    this._street = command.street;
    this._number = command.number;
    this._city = command.city;
    this._postalCode = command.postalCode;
    this._country = command.country;
    this._photo = command.photo;
    this._phoneNumber = command.phoneNumber;

    this._emergencyContactFirstName = command.emergencyContactFirstName;
    this._emergencyContactLastName = command.emergencyContactLastName;
    this._emergencyContactPhoneNumber = command.emergencyContactPhoneNumber;
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
