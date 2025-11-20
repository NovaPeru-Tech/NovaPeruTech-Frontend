import {BaseEntity} from '../domain/model/base-entity';
import {BaseResource, BaseResponse} from './base-response';
import {BaseAssembler} from './base-assembler';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import {ErrorHandlingEnabledBaseType} from './error-handling-enabled-base-type';

/**
 * Abstract base class for API endpoints handling CRUD operations.
 * Provides common methods for fetching, creating, updating, and deleting entities.
 * @template TEntity - The entity type extending BaseEntity.
 * @template TResource - The resource type extending BaseResource.
 * @template TResponse - The response type extending BaseResponse.
 * @template TAssembler - The assembler type extending BaseAssembler.
 */
export abstract class BaseApiEndpoint<
  TEntity extends BaseEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse,
  TAssembler extends BaseAssembler<TEntity, TResource, TResponse>>
  extends ErrorHandlingEnabledBaseType
{
  /**
   * Creates a new BaseApiEndpoint instance.
   * @param http - The HTTP client for making requests.
   * @param endpointUrl - The base URL for the API endpoint.
   * @param assembler - The assembler for converting between entities and resources.
   */
  protected constructor(protected http: HttpClient, protected endpointUrl: string, protected assembler: TAssembler) {
    super();
  }

  /**
   * Retrieves all entities from the API.
   * @returns An observable for an array of entities.
   */
  getAll() {
    return this.http.get<TResponse | TResource[]>(this.endpointUrl).pipe(
      map(response => {
        console.log(response);
        if (Array.isArray(response)) {
          return response.map(resource => this.assembler.toEntityFromResource(resource));
        }
        return this.assembler.toEntitiesFromResponse(response as TResponse);
      }),
      catchError(this.handleError('Failed to fetch entities'))
    );
  }

  /**
   * Retrieves an entity by its ID.
   * @param id - The ID of the entity to retrieve.
   * @returns An observable of the entity.
   */
  getById(id: number): Observable<TEntity> {
    return this.http.get<TResource>(`${this.endpointUrl}/${id}`).pipe(
      map(resource => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError(`Failed to fetch entity with id ${id}`))
    );
  }

  /**
   * Creates a new entity.
   * @param entity - The entity to create.
   * @returns An observable of the created entity.
   */
  create(entity: TEntity): Observable<TEntity> {
    const resource = this.assembler.toResourceFromEntity(entity);
    return this.http.post<TResource>(this.endpointUrl, resource).pipe(
      map(createdResource => this.assembler.toEntityFromResource(createdResource)),
      catchError(this.handleError('Failed to create entity'))
    );
  }

  /**
   * Updates an existing entity.
   * @param entity - The entity to update.
   * @param id - The ID of the entity to update.
   * @returns An observable of the updated entity.
   */
  update(entity: TEntity, id: number): Observable<TEntity> {
    const resource = this.assembler.toResourceFromEntity(entity);
    return this.http.put<TResource>(`${this.endpointUrl}/${id}`, resource).pipe(
      map(updatedResource => this.assembler.toEntityFromResource(updatedResource)),
      catchError(this.handleError(`Failed to update entity with id ${id}`))
    );
  }

  /**
   * Deletes an entity by its ID.
   * @param id - The ID of the entity to delete.
   * @returns An observable that completes when the deletion is done.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpointUrl}/${id}`).pipe(
      catchError(this.handleError(`Failed to delete entity with id ${id}`))
    );
  }
}
