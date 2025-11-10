import { Profile } from './profile.entity';

export class PersonProfile extends Profile {
  private _dni: string;
  private _firstName: string;
  private _lastName: string;
  private _birthDate: Date;
  private _age: number;

  constructor(personProfile: {
    id: number;
    dni: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
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
      id: personProfile.id,
      emailAddress: personProfile.emailAddress,
      street: personProfile.street,
      number: personProfile.number,
      city: personProfile.city,
      postalCode: personProfile.postalCode,
      country: personProfile.country,
      photo: personProfile.photo,
      phoneNumber: personProfile.phoneNumber
    });

    this._dni = personProfile.dni;
    this._firstName = personProfile.firstName;
    this._lastName = personProfile.lastName;
    this._birthDate = personProfile.birthDate;
    this._age = this.calculateAge(personProfile.birthDate);
  }

  private calculateAge(birthDate: Date): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
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
}
