import { Component } from '@angular/core';

@Component({
  selector: 'app-subscription-plan-family',
  templateUrl: './subscription-plan-family.html',
  styleUrls: ['./subscription-plan-family.css']
})
export class SubscriptionPlanFamily {

  constructor() {}

  choosePlan(type: string) {
    console.log("Selected Family plan:", type);
  }
}
