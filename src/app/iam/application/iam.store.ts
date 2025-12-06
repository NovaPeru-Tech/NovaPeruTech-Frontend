import { computed, Injectable, signal } from '@angular/core';
import { User } from '../domain/model/user.entity';
import { SignInCommand } from '../domain/model/sign-in.command';
import { Router } from '@angular/router';
import { IamApi } from '../infrastructure/iam-api';
import { SignUpCommand } from '../domain/model/sign-up.command';
import { CreateAdministratorCommand } from '../domain/model/create-administrator.command';

@Injectable({ providedIn: 'root' })
export class IamStore {
  private readonly _loadingSignal = signal<boolean>(false);
  private readonly _errorSignal = signal<string | null>(null);
  private readonly isSignedInSignal = signal<boolean>(false);
  private readonly currentUsernameSignal = signal<string | null>(null);
  private readonly currentUserIdSignal = signal<number | null>(null);
  private readonly usersSignal = signal<Array<User>>([]);

  readonly isSignedIn = this.isSignedInSignal.asReadonly();
  readonly loadingUsers = signal<boolean>(false);
  readonly currentUsername = this.currentUsernameSignal.asReadonly();
  readonly currentUserId = this.currentUserIdSignal.asReadonly();
  readonly currentToken = computed(() => this.isSignedIn() ? localStorage.getItem('token') : null);
  readonly users = this.usersSignal.asReadonly();
  readonly loading = this._loadingSignal.asReadonly();
  readonly error = this._errorSignal.asReadonly();
  readonly isLoadingUsers = this.loadingUsers.asReadonly();

  constructor(private iamApi: IamApi) {
    const savedToken = localStorage.getItem('token');
    const savedUserId = localStorage.getItem('userId');

    if (savedToken) {
      this.isSignedInSignal.set(true);
      this.currentUserIdSignal.set(savedUserId ? Number(savedUserId) : null);
    } else {
      this.isSignedInSignal.set(false);
      this.currentUsernameSignal.set(null);
      this.currentUserIdSignal.set(null);
    }
  }

  createAdministrator(createAdministratorCommand: CreateAdministratorCommand, router: Router) {
    this.iamApi.createAdministrator(createAdministratorCommand).subscribe({
      next: (administratorResource) => {
        console.log('Administrator created successfully:', administratorResource);
        router.navigate(['/iam/sign-in']).then();
      },
      error: (err) => {
        console.error('Administrator creation failed:', err);
        this.isSignedInSignal.set(false);
        this.currentUsernameSignal.set(null);
        this.currentUserIdSignal.set(null);
        router.navigate(['/iam/sign-up'], {
          queryParams: { role: 'admin' }
        }).then();
      }
    })
  }

  signIn(signInCommand: SignInCommand, router: Router) {
    console.log(signInCommand);
    this.iamApi.signIn(signInCommand).subscribe({
      next: (signInResource) => {
        // Esto ya lo tenías bien: guarda el token para el interceptor
        localStorage.setItem('token', signInResource.token);
        localStorage.setItem('userId', signInResource.id.toString());

        this.isSignedInSignal.set(true);
        this.currentUsernameSignal.set(signInResource.username);
        this.currentUserIdSignal.set(signInResource.id);

        if(signInResource.roles.includes("ROLE_ADMIN")) {
          router.navigate(['/nursing/nursing-homes/new']).then();
        } else {
          router.navigate(['/analytics/dashboard']).then();
        }
      },
      error: (err) => {
        console.error('Sign-in failed:', err);
        this.isSignedInSignal.set(false);
        this.currentUsernameSignal.set(null);
        this.currentUserIdSignal.set(null);
        router.navigate(['/iam/sign-in']).then();
      }
    });
  }

  signUp(signUpCommand: SignUpCommand, router: Router) {
    this.iamApi.signUp(signUpCommand).subscribe({
      next: (signUpResource) => {
        console.log('Sign-up successful:', signUpResource);
        router.navigate(['/iam/sign-in']).then();
      },
      error: (err) => {
        console.error('Sign-up failed:', err);
        this.isSignedInSignal.set(false);
        this.currentUsernameSignal.set(null);
        this.currentUserIdSignal.set(null);
        router.navigate(['/iam/sign-up']).then();
      }
    });
  }

  signOut(router: Router) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('nursingHomeId');
    this.isSignedInSignal.set(false);
    this.currentUsernameSignal.set(null);
    this.currentUserIdSignal.set(null);
    router.navigate(['/home']).then();
  }
}
