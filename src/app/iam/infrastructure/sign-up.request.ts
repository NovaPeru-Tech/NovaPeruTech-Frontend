/**
 * Request interface for sign-up API.
 */
export interface SignUpRequest {
  /**
   * The username for sign-up.
   */
  username: string;

  /**
   * The password for sign-up.
   */
  password: string;

  /**
   * The roles to assign to the user.
   */
  roles: string[];
}
