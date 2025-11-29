import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription-plan-nursing',
  templateUrl: './subscription-plan-nursing.html',
  styleUrls: ['./subscription-plan-nursing.css']
})
export class SubscriptionPlanNursing {

  constructor(private router: Router) {}

  choosePlan(type: string) {
    this.router.navigate(['/payments/checkout', 'nursing-home', type === 'monthly' ? 'monthly' : 'annual']);
  }
}
