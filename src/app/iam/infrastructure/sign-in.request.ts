/**
 * Request interface for sign-in API.
 */
export interface SignInRequest {
  /**
   * The username for sign-in.
   */
  username: string;

  /**
   * The password for sign-in.
   */
  password: string;
}
