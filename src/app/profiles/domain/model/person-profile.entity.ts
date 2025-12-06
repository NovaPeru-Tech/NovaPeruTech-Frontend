import { Profile } from './profile.entity';

export class PersonProfile extends Profile {
  private _fullName: string;
  private _dni: string;
  private _birthDate: Date;
  private _age: number;

  constructor(personProfile: {
    id: number;
    fullName: string;
    dni: string;
    birthDate: Date;
    age: number;
    photo: string;
    phoneNumber: string;
    emailAddress: string;
    streetAddress: string;
  }) {
    super({
      id: personProfile.id,
      photo: personProfile.photo,
      phoneNumber: personProfile.phoneNumber,
      emailAddress: personProfile.emailAddress,
      streetAddress: personProfile.streetAddress
    });
    this._fullName = personProfile.fullName;
    this._dni = personProfile.dni;
    this._birthDate = personProfile.birthDate;
    this._age = personProfile.age;
  }

  get dni(): string {
    return this._dni;
  }

  set dni(value: string) {
    this._dni = value;
  }

  get birthDate(): Date {
    return this._birthDate;
  }

  set birthDate(value: Date) {
    this._birthDate = value;
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    this._age = value;
  }

  get fullName(): string {
    return this._fullName;
  }

  set fullName(value: string) {
    this._fullName = value;
  }
}
