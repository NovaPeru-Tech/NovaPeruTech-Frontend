import {BaseResource} from '../../shared/infrastructure/base-response';

/**
 * Resource interface for sign-in response.
 */
export interface SignInResource extends BaseResource {
  /**
   * The unique identifier of the user.
   */
  id: number;

  /**
   * The username of the user.
   */
  username: string;

  roles: string[];

  /**
   * The authentication token.
   */
  token: string;
}

/**
 * Response interface for sign-in API.
 */
export interface SignInResponse extends BaseResource, SignInResource {}
