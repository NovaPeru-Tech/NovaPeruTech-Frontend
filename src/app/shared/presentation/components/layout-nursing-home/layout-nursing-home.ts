import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout-nursing-home',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './layout-nursing-home.html',
  styleUrls: ['./layout-nursing-home.css']
})
export class LayoutNursingHome {
  isCollapsed = signal(false);

  options = [
    {
      label: 'Home',
      icon: 'home',
      link: '/nursing-home',
      color: '#5FC2BA'
    },
    {
      label: 'Inventory',
      icon: 'inventory_2',
      link: 'inventory/medication/list',
      color: '#5FC2BA'
    },
    {
      label: 'Activities',
      icon: 'assignment',
      link: '/activities/list',
      color: '#5FC2BA'
    },
    {
      label: 'Residents',
      icon: 'person',
      link: '/resident/list',
      color: '#5FC2BA'
    },
    {
      label: 'Employees',
      icon: 'group',
      link: '/employee/list',
      color: '#5FC2BA'
    }
  ];

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isCollapsed.update(value => !value);
  }

  navigateTo(link: string) {
    this.router.navigate([link]);
  }

  isActive(link: string): boolean {
    return this.router.url.includes(link);
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}
