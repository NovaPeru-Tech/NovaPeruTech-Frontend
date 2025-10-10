/*
* this class represents a user sign-up entity with properties for id, last name, first name, email, and password.
* It includes a constructor for initializing these properties and provides getter and setter methods for each property.
*
* @purpose: Entity for user sign-up data.
*
*
* */
export class SignUp {
 private _id: number;
 private _lastName: string;
  private _firstName: string
 private _email: string;
private _password: string;
private _rol:'administrator'|'family';
  constructor(signUp:{id: number, lastName: string, firstName: string, email: string, password: string, role: 'administrator' | 'family'}) {
    this._id = signUp.id;
    this._lastName = signUp.lastName;
    this._firstName = signUp.firstName;
    this._email = signUp.email;
    this._password = signUp.password;
    this._rol=signUp.role;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get rol(): "administrator" | "family" {
    return this._rol;
  }

  set rol(value: "administrator" | "family") {
    this._rol = value;
  }

}
