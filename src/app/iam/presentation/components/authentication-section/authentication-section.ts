import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
@Component({
  selector: 'app-authentication-section',
  standalone: true,
  imports: [
    MatIconModule,
    MatButton,
    TranslatePipe,
  ],
  templateUrl: './authentication-section.html',
  styleUrl: './authentication-section.css'
})
export class AuthenticationSection {
  constructor(
    private router: Router,
  ) {

  }


  onSignIn() {
    void this.router.navigate(['auth/sign-in']);
  }

  onRegisterAdmin() {
    void this.router.navigate(['auth/sign-up/administrator']);
  }

  onRegisterFamily() {
    void this.router.navigate(['auth/sign-up/familiar']);
  }
}
