import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription-plan-family',
  templateUrl: './subscription-plan-family.html',
  styleUrls: ['./subscription-plan-family.css']
})
export class SubscriptionPlanFamily {

  constructor(private router: Router) {}

  choosePlan(type: string) {
    // type = 'monthly' o 'annual'
    this.router.navigate(['/payments/checkout', 'family', type === 'monthly' ? 'monthly' : 'annual']);
  }
}
