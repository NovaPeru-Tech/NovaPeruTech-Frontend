import {HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

/**
 * Abstract base class providing error handling functionality for HTTP operations.
 */
export abstract class ErrorHandlingEnabledBaseType {

  /**
   * Handles HTTP errors and returns an observable that throws an error.
   * @param operation - The name of the operation that failed.
   * @returns A function that takes an HttpErrorResponse and returns an Observable that throws an error.
   */
  protected handleError(operation: string) {
    return (error: HttpErrorResponse): Observable<never> => {
      let errorMessage = operation;
      if (error.status === 404) {
        errorMessage = `Resource not found: ${operation}`;
      } else if (error.error instanceof ErrorEvent) {
        errorMessage = `${operation}: ${error.error.message}`;
      } else {
        errorMessage = `${operation}: ${error.statusText || 'Unexpected error'}`;
      }
      return throwError(() => new Error(errorMessage));
    }
  }
}
