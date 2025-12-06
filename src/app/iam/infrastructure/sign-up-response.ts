import {BaseResource} from '../../shared/infrastructure/base-response';

/**
 * Resource interface for sign-up response.
 */
export interface SignUpResource extends BaseResource {
  /**
   * The unique identifier of the user.
   */
  id: number;

  /**
   * The username of the user.
   */
  username: string;
}

/**
 * Response interface for sign-up API.
 */
export interface SignUpResponse extends BaseResource, SignUpResource {}
