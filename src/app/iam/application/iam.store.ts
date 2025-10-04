import { Injectable, signal } from '@angular/core';
import { SignIn } from '../domain/model/sign-in.entity';
import { SignUp } from '../domain/model/sign-up.entity';
import { IamApi } from '../infrastructure/iam-api';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IamStore {
  private readonly _signInSignal = signal<SignIn | null>(null);
  private readonly _signUpSignal = signal<SignUp | null>(null);
  private readonly _loadingSignal = signal<boolean>(false);
  private readonly _errorSignal = signal<string | null>(null);

  readonly signIn = this._signInSignal.asReadonly();
  readonly signUp = this._signUpSignal.asReadonly();
  readonly loading = this._loadingSignal.asReadonly();
  readonly error = this._errorSignal.asReadonly();

  constructor(private iamApi: IamApi) {}

  createSignUp(signUp: SignUp) {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);

    this.iamApi.CreateSignUp(signUp).pipe(retry(1)).subscribe({
      next: registeredUser => {
        if (registeredUser) {
          this._signUpSignal.set(registeredUser);
        } else {
          this._signUpSignal.set(null);
          this._errorSignal.set('Error al registrar usuario');
        }
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Error al registrar usuario'));
        this._loadingSignal.set(false);
      }
    });
  }


  createSignIn(signIn: SignIn) {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);

    this.iamApi.createSignIn(signIn).pipe(retry(2)).subscribe({
      next: loggedUser => {
        if (loggedUser) {
          this._signInSignal.set(loggedUser);
        } else {
          this._signInSignal.set(null);
          this._errorSignal.set('Correo o contraseña incorrecta');
        }
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Error al iniciar sesión'));
        this._loadingSignal.set(false);
      }
    });
  }


  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message || fallback;
    }
    if (typeof error === 'string') {
      return error;
    }
    return fallback;
  }

}
