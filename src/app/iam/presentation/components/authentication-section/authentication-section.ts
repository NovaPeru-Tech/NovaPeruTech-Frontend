import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
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
  constructor(
    private router: Router,
  ) {

  }

  onRegisterAdmin() {
    void this.router.navigate(['auth/sign-up/administrator']);
  }

  onRegisterFamily() {
    void this.router.navigate(['auth/sign-up/familiar']);
  }
}
