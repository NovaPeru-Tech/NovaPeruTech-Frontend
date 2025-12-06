import {Component, EventEmitter, inject, Output} from '@angular/core';
import {Router} from '@angular/router';
import {IamStore} from '../../../application/iam.store';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-authentication-section',
  imports: [
    MatButton
  ],
  templateUrl: './authentication-section.html',
  styleUrl: './authentication-section.css'
})
export class AuthenticationSection {
  private router = inject(Router);
  protected store = inject(IamStore);

  performSignIn(): void {
    this.router.navigate(['/iam/sign-in']).then();
  }

  performSignUpUser(): void {
    this.router.navigate(['/iam/sign-up'], {
      queryParams: { role: 'user' }
    }).then();
  }

  performSignUpAdmin(): void {
    this.router.navigate(['/iam/sign-up'], {
      queryParams: { role: 'admin' }
    }).then();
  }

  performSignOut(): void {
    this.store.signOut(this.router);
  }
}

