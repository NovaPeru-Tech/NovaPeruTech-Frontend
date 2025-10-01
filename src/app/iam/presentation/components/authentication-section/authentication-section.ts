import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
/**import { AuthenticationService } from '../../services/authentication.service';*/
@Component({
  selector: 'app-authentication-section',
  standalone: true,
  imports: [
    MatIconModule,
    MatButton,
  ],
  templateUrl: './authentication-section.html',
  styleUrl: './authentication-section.css'
})
export class AuthenticationSection {
  currentEmail: string = '';
  isSignedIn: boolean = false;
  constructor(
    private router: Router,
    /*private authenticationService: AuthenticationService*/
  ) {
    /*this.authenticationService.currentEmail.subscribe(
      (email:string) => this.currentEmail = email
    );*/
    /*this.authenticationService.isSignedIn.subscribe(
      (isSignedIn:boolean) => this.isSignedIn = isSignedIn
    );*/
  }
  onSignIn() {
    // Navigate to the sign-in page.
    this.router.navigate(['/sign-in']).then();
  }
  onRegisterAdmin() {
    // Navigate to the admin registration page.
    this.router.navigate(['/register-administrator']).then();
  }
  onRegisterFamily() {
    // Navigate to the family registration page.
    this.router.navigate(['/register-family-member']).then();
  }
}
