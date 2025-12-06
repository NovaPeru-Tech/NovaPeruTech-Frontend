/**
 * Command to sign up a new user with a username and password.
 */
export class CreateAdministratorCommand {
  private _username: string;
  private _password: string;

  /**
   * Creates a new SignUpCommand instance.
   * @param resource - The sign-up data containing username and password.
   */
  constructor(resource: {username: string, password: string}) {
    this._username = resource.username;
    this._password = resource.password;
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
}
