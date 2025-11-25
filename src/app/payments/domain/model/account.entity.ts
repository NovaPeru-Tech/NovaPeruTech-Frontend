/*
 * @purpose: Represents an account entity within the Veyra Payments bounded context.
 * @description: Stores information about the account owner, which can be a Nursing Home
 *               Administrator or a Familiar of a resident. Includes encapsulated getters and setters.
 */

export class Account {

  private _id: number;
  private _email: string;
  private _fullName: string;
  private _role: 'Administrator' | 'Familiar';

  constructor(account: {
    id: number;
    email: string;
    fullName: string;
    role: 'Administrator' | 'Familiar';
  }) {
    this._id = account.id;
    this._email = account.email;
    this._fullName = account.fullName;
    this._role = account.role;
  }

  // Getters & Setters

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

  get fullName(): string {
    return this._fullName;
  }

  set fullName(value: string) {
    this._fullName = value;
  }

  get role(): 'Administrator' | 'Familiar' {
    return this._role;
  }

  set role(value: 'Administrator' | 'Familiar') {
    this._role = value;
  }
}
