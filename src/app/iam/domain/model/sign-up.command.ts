/**
 * Command to sign up a new user with a username and password.
 */
export class SignUpCommand {
  private _username: string;
  private _password: string;
  private _roles: string[];

  /**
   * Creates a new SignUpCommand instance.
   * @param resource - The sign-up data containing username and password.
   */
  constructor(resource: {username: string, password: string, roles?: string[]}) {
    this._username = resource.username;
    this._password = resource.password;
    this._roles = resource.roles || ['ROLE_USER'];
  }

  /**
   * Gets the username for sign-up.
   * @returns The username.
   */
  get username(): string {
    return this._username;
  }

  /**
   * Sets the username for sign-up.
   * @param value - The new username value.
   */
  set username(value: string) {
    this._username = value;
  }

  /**
   * Gets the password for sign-up.
   * @returns The password.
   */
  get password(): string {
    return this._password;
  }

  /**
   * Sets the password for sign-up.
   * @param value - The new password value.
   */
  set password(value: string) {
    this._password = value;
  }

  /**
   * Gets the roles for sign-up.
   * @returns The roles array.
   */
  get roles(): string[] {
    return this._roles;
  }

  /**
   * Sets the roles for sign-up.
   * @param value - The new roles array.
   */
  set roles(value: string[]) {
    this._roles = value;
  }
}
