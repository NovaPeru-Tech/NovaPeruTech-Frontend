import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a user entity in the identity and access management domain.
 */
export class User implements BaseEntity{
  private _id: number;
  private _username: string;
  private _roles: string[];

  /**
   * Creates a new User instance.
   * @param user - The user data object containing id and username.
   */
  constructor(user:{id: number, username: string, roles: string[]}) {
    this._id = user.id;
    this._username = user.username;
    this._roles = user.roles;
  }

  /**
   * Gets the user's unique identifier.
   * @returns The user's ID.
   */
  get id(): number {
    return this._id;
  }

  /**
   * Sets the user's unique identifier.
   * @param value - The new ID value.
   */
  set id(value: number) {
    this._id = value;
  }

  /**
   * Gets the user's username.
   * @returns The user's username.
   */
  get username(): string {
    return this._username;
  }

  /**
   * Sets the user's username.
   * @param value - The new username value.
   */
  set username(value: string) {
    this._username = value;
  }

  get roles(): string[] {
    return this._roles;
  }

  set roles(value: string[]) {
    this._roles = value;
  }
}
