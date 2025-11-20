import { Injectable, signal } from '@angular/core';
import { IamApi } from '../infrastructure/iam-api';
import { SignInCommand } from '../domain/model/sign-in.command';
import { SignUpCommand } from '../domain/model/sign-up.command';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IamStore {
  private readonly _loadingSignal = signal<boolean>(false);
  private readonly _errorSignal = signal<string | null>(null);
  private readonly _userSignal = signal<any | null>(null);

  readonly loading = this._loadingSignal.asReadonly();
  readonly error = this._errorSignal.asReadonly();
  readonly user = this._userSignal.asReadonly();

  constructor(private iamApi: IamApi) {}

  signIn(command: SignInCommand) {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);

    this.iamApi.signIn(command).pipe(retry(2)).subscribe({
      next: (resource) => {
        this._userSignal.set(resource);
        this._loadingSignal.set(false);
      },
      error: (err) => {
        this._errorSignal.set(this.formatError(err, 'Failed to sign-in'));
        this._loadingSignal.set(false);
      }
    });
  }

  signUp(command: SignUpCommand) {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);

    this.iamApi.signUp(command).pipe(retry(2)).subscribe({
      next: (resource) => {
        this._userSignal.set(resource);
        this._loadingSignal.set(false);
      },
      error: (err) => {
        this._errorSignal.set(this.formatError(err, 'Failed to sign-up'));
        this._loadingSignal.set(false);
      }
    });
  }

  signOut() {
    this._userSignal.set(null);
  }

  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found')
        ? `${fallback}: Not Found`
        : error.message;
    }
    return fallback;
  }
}
