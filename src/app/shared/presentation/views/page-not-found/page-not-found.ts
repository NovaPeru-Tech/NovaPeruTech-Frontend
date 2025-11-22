import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {MatButton} from '@angular/material/button';
import {Toolbar} from '../../components/toolbar/toolbar';

/**
 * Component for displaying a 404 page not found error.
 * Shows the invalid path and provides a button to navigate back to home.
 */
@Component({
  selector: 'app-page-not-found',
  imports: [
    TranslatePipe,
    MatButton,
    Toolbar
  ],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css'
})
export class PageNotFound implements OnInit {
  protected invalidPath: string = '';
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Extracts the invalid path from the route snapshot.
   */
  ngOnInit(): void {
    this.invalidPath = this.route.snapshot.url
      .map(url  => url.path)
      .join('/');
  }

  /**
   * Navigates to the home page.
   */
  protected navigateToHome(): void {
    this.router.navigate(['home']).then();
  }
}
