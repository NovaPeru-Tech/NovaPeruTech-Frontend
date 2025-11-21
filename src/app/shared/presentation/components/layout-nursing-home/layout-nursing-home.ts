import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import {
  AuthenticationSection
} from '../../../../iam/presentation/components/authentication-section/authentication-section';

@Component({
  selector: 'app-layout-nursing-home',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    TranslatePipe,
    LanguageSwitcher
  ],
  templateUrl: './layout-nursing-home.html',
  styleUrls: ['./layout-nursing-home.css']
})
export class LayoutNursingHome {
  @ViewChild(MatSidenav) drawer!: MatSidenav;
  sidenavMode: 'side' | 'over' = 'side';
  sidenavOpened = true;

  options = [
    { label: 'nav.home',      icon: 'home',         link: '/home',                      color: '#5FC2BA'},
    { label: 'nav.activity',  icon: 'assignment',   link: '/activities/list',           color: '#5FC2BA'},
    { label: 'nav.resident',  icon: 'person',       link: '/residents/list',            color: '#5FC2BA'},
    { label: 'nav.staff',     icon: 'group',        link: '/staff/list',                color: '#5FC2BA'},
    { label: 'nav.room',      icon: 'meeting_room', link: '/rooms/list',                color: '#5FC2BA'}
  ];

  constructor(private router: Router, private observer: BreakpointObserver) {
    this.observer.observe(['(max-width: 768px)']).subscribe(result => {
      if (result.matches) {
        this.sidenavMode = 'over';
        this.sidenavOpened = false;
      } else {
        this.sidenavMode = 'side';
        this.sidenavOpened = true;
      }
    });
  }

  navigateTo(link: string) {
    this.router.navigate([link]).then();
    if (this.sidenavMode === 'over') {
      this.drawer.toggle().then();
    }
  }

  isActive(link: string): boolean {
    return this.router.url.includes(link);
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}
